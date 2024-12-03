const puppeteer = require('puppeteer');

(async () => {
    // Define the URL and roles
    const url = 'https://rankedboost.com/league-of-legends/synergy/zyra/';
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const result = {};

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the URL and wait for the page to load
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Scrape data for each role
        for (const role of roles) {
            result[role] = await page.evaluate((role) => {
                // Use a more generic selector for champion images based on "alt" attribute
                const champions = document.querySelectorAll('img.synergy-main-icon-small');
                // Filter and get the alt text of the first 5 champions for the given role
                let filteredChampions = [];
                champions.forEach((champion) => {
                    if (champion.alt && !filteredChampions.includes(champion.alt)) {
                        filteredChampions.push(champion.alt);
                    }
                });
                return filteredChampions.slice(0, 5);
            }, role);
        }

        // Log the final result
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    } finally {
        // Close the browser
        await browser.close();
    }
})();
