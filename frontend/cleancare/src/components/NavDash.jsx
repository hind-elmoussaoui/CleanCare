
import React from 'react';
import { FaHome } from "react-icons/fa"; 

function NavDash() {
    return (
    <nav>
        <div className="flex justify-between items-center h-16">
            <div className="flex items-center mb-6">
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center text-gray-700 hover:text-gray-900">
                    <FaHome className="mr-2" />
                    </a>
                    <span className="text-gray-400">/</span>
                    <a href="/page" className="flex items-center text-gray-700 hover:text-gray-900">
                    Page
                    </a>
                    <span className="text-gray-400">/</span>
                    <a href="/page" className="flex items-center text-gray-700 hover:text-gray-900">
                    Page
                    </a>
                </div>
            </div>
            <div className="flex items-center">
                <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <a href="/signin" className="ml-4 text-gray-600 hover:text-gray-800">Sign In</a>
            </div>
        </div>
    </nav>
    );
}

export default NavDash;