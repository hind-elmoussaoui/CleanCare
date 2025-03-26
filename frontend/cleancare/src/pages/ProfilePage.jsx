import React from 'react';
import Sidebar from '../components/Sidebar';
import Image from '../assets/menage.jpg';

function ProfilePage() {
  return (
    <div className="flex">
        {/* Sidebar */}
        <Sidebar />

    <div className="p-4 max-xl:ml-80">
      <aside className="fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 translate-x-96">
        <div className="flex items-start justify-between px-6 pt-8 pb-6">
          <div>
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
              Dashboard Configurator
            </h5>
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-gray-600">
              See our dashboard options.
            </p>
          </div>
          
        </div>
        <div className="py-4 px-6">
          <div className="mb-12">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
              Sidenav Colors
            </h6>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 from-gray-100 to-gray-100  border-transparent"></span>
              <span className="h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 from-black to-black border-black"></span>
              <span className="h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 from-green-400 to-green-600 border-transparent"></span>
              <span className="h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 from-orange-400 to-orange-600 border-transparent"></span>
              <span className="h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 from-red-400 to-red-600 border-transparent"></span>
              <span className="h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 from-pink-400 to-pink-600 border-transparent"></span>
            </div>
          </div>
          {/* Ajoutez d'autres sections ici */}
        </div>
      </aside>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-6">
              <img
                src={Image}
                alt="Profile"
                className="w-18 h-18 rounded-lg shadow-lg"
              />
              <div>
                <h2 className="text-xl font-semibold">Hind Elmoussaoui</h2>
                <p className="text-gray-600">IT Specialist | Developer</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Informations du profil</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-4">
                  <span className="font-semibold">Email:</span>
                  <span>hindelmoussaoui40@gmail.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="font-semibold">Téléphone:</span>
                  <span>(212) 708 84 23 22</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="font-semibold">Localisation:</span>
                  <span>Maroc</span>
                </li>
              </ul>
            </div>
          </div>
          
    </div>
    </div>
  );
}

export default ProfilePage;