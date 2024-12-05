import React from 'react';

const Login = () => {
    return (
        <>
            <form className="p-3 w-fit flex flex-col text-gray-950 bg-indigo-600 rounded-md" action="submit">
                <h1 className='font-semibold text-lg'>Login</h1>
                <input className='rounded-sm px-2 mt-3' type="text" placeholder='Name' />
                <input className='rounded-sm px-2 mt-2' type="text" placeholder='Tag' />
            </form>
        </>
    );
};

export default Login;
