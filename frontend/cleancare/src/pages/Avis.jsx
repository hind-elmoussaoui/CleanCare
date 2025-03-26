import React from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Marie Dupont',
        role: 'Client Ménage',
        comment: 'Service impeccable et très professionnel. Je recommande vivement!',
        rating: 5,
    },
    {
        id: 2,
        name: 'Jean Martin',
        role: 'Client Nounou',
        comment: 'Très bon service de garde d\'enfants. Les nounous sont très attentionnées.',
        rating: 4,
    },
    {
        id: 3,
        name: 'Sophie Leroy',
        role: 'Client Ménage',
        comment: 'Toujours à l\'heure et très efficace. Je suis très satisfaite.',
        rating: 5,
    },
];

const AvisCard = ({ name, role, comment, rating }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
                    {name[0]}
                </div>
                <div className="ml-4">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p className="text-gray-600">{role}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-4">{comment}</p>
            <div className="flex items-center">
                {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        </div>
    );
};

const Avis = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Avis des Clients</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial) => (
                        <AvisCard key={testimonial.id} {...testimonial} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Avis;