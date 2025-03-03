import React from 'react';

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fullName = user?.full_name || "User";

    return (
        <div className="w-full h-20 flex items-center justify-between bg-white shadow-md px-20">
            <div className="text-2xl font-bold text-blue-600 cursor-pointer">Jobby</div>
            <p>You are logged in as {fullName}!</p>
        </div>
    );
};

export default Header;
