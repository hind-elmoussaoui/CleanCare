import React, { useState } from "react";
import SignUpClient from "./SignUpClient";
import SignUpProvider from "./SignUpProvider";
import Image from "../assets/joel.jpg";

function SignUp() {
    const [isClient, setIsClient] = useState(true);

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="absolute inset-0 mt-20">
                <img
                    src={Image}
                    alt="Background"
                    className="w-full h-96 object-cover bg-gray-900 opacity-70" // Utilisez h-full pour couvrir toute la hauteur
                />
            </div>

            <div className="flex gap-4 mb-6 z-20">
                <button onClick={() => setIsClient(true)} className={`py-2 px-10 text-lg rounded-lg transition duration-300 ${isClient ? "bg-[#4d9ddb] text-white" : "bg-gray-200 text-gray-700"}`}>Client</button>
                <button onClick={() => setIsClient(false)} className={`py-2 px-6 text-lg rounded-lg transition duration-300 ${!isClient ? "bg-[#4d9ddb] text-white" : "bg-gray-200 text-gray-700"}`}>Prestataire</button>
            </div>
            {isClient ? <SignUpClient /> : <SignUpProvider />}
        </div>
    );
}

export default SignUp;
