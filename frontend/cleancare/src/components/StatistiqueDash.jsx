import React from 'react';

function StatistiqueDash() {
  return (
    <div>
      <div className="flex-1 p-8 bg-gray-100">
          <h1 className="text-3xl font-semibold mb-4">Dashboard Admin</h1>
          <p>Bienvenue dans le tableau de bord de Clean Care.</p>

          {/* Exemple de cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md">Statistique 1</div>
            <div className="bg-white p-6 rounded-lg shadow-md">Statistique 2</div>
            <div className="bg-white p-6 rounded-lg shadow-md">Statistique 3</div>
          </div>
        </div>
    </div>
  )
}

export default StatistiqueDash
