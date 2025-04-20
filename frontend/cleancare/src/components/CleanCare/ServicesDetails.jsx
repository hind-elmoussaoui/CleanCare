import { useParams } from "react-router-dom";
import { ChevronRight, Clock, CheckCircle, Star, Home, Briefcase, Calendar } from "lucide-react";
import Image1 from "../../assets/me.jpg";
import Image2 from "../../assets/kampus.jpg";
import Image3 from "../../assets/fem.jpg";
import Image4 from "../../assets/pexels.jpg";
import Image5 from "../../assets/pexels-cottonbro-4108789.jpg";
import Image6 from "../../assets/no.jpg";
import { Link } from 'react-router-dom';

const servicesData = {
  "menage-domicile": {
    image: Image1,
    title: "Ménage à domicile",
    description: "Service professionnel de nettoyage résidentiel pour un espace de vie impeccable.",
    details: [
      "Nettoyage complet de toutes les pièces",
      "Dépoussiérage des surfaces et meubles",
      "Aspiration et lavage des sols",
      "Nettoyage approfondi des sanitaires",
      "Nettoyage de la cuisine (électroménager inclus)",
      "Changement de literie (optionnel)"
    ],
    pricing: [
      { option: "Studio (<50m²)", price: "200-250 MAD" },
      { option: "Appartement (50-100m²)", price: "300-400 MAD" },
      { option: "Villa (>100m²)", price: "500-700 MAD" },
      { option: "Nettoyage des vitres", price: "+100-150 MAD" }
    ],
    schedule: "Lundi au Samedi - 8h à 18h",
    benefits: [
      "Produits écologiques utilisés",
      "Personnel formé et vérifié",
      "Matériel professionnel"
    ]
  },
  "garde-enfants": {
    image: Image2,
    title: "Garde d'enfants",
    description: "Service de garde d'enfants qualifié avec activités éducatives adaptées.",
    details: [
      "Garde à domicile ou sorties surveillées",
      "Activités ludiques et éducatives",
      "Aide aux devoirs scolaires",
      "Préparation des repas équilibrés",
      "Soins d'hygiène et coucher",
      "Sorties pédagogiques (parcs, musées)"
    ],
    pricing: [
      { option: "Garde occasionnelle", price: "50-70 MAD/heure" },
      { option: "Garde régulière (20h+/semaine)", price: "40-60 MAD/heure" },
      { option: "Garde de nuit (20h-8h)", price: "300-400 MAD/nuit" },
      { option: "Week-end complet", price: "800-1000 MAD" }
    ],
    schedule: "7j/7 - 7h à 22h",
    benefits: [
      "Nounous diplômées en puériculture",
      "Expérience vérifiée avec références",
      "Initiation aux langues étrangères"
    ]
  },
  "menage-bureaux": {
    image: Image3,
    title: "Nettoyage de bureaux",
    description: "Service professionnel pour des espaces de travail propres et hygiéniques.",
    details: [
      "Nettoyage quotidien des surfaces de travail",
      "Désinfection des zones communes",
      "Vidage des corbeilles et tri sélectif",
      "Nettoyage des sanitaires et cuisines",
      "Entretien des sols (aspiration/lavage)",
      "Nettoyage des vitres et fenêtres"
    ],
    pricing: [
      { option: "Petit bureau (<100m²)", price: "400-600 MAD/semaine" },
      { option: "Espace moyen (100-300m²)", price: "800-1200 MAD/semaine" },
      { option: "Grande entreprise (>300m²)", price: "Sur devis" },
      { option: "Nettoyage après travaux", price: "15-20 MAD/m²" }
    ],
    schedule: "Du lundi au vendredi - 18h à 22h ou weekends",
    benefits: [
      "Travail en dehors des heures de bureau",
      "Produits professionnels sans allergènes",
      "Personnel formé aux normes sanitaires"
    ]
  },
  "garde-nuit": {
    image: Image4,
    title: "Garde de nuit",
    description: "Service spécialisé de garde nocturne pour enfants en bas âge.",
    details: [
      "Surveillance continue pendant le sommeil",
      "Biberons et changes nocturnes",
      "Bercement en cas de réveil",
      "Surveillance médicale si nécessaire",
      "Préparation du petit déjeuner",
      "Service discret et professionnel"
    ],
    pricing: [
      { option: "Garde occasionnelle (20h-8h)", price: "300-400 MAD/nuit" },
      { option: "Forfait 5 nuits", price: "1400-1800 MAD" },
      { option: "Forfait mensuel (20 nuits)", price: "5000-6000 MAD" },
      { option: "Nuit weekend", price: "+100 MAD" }
    ],
    schedule: "Tous les soirs - 20h à 8h",
    benefits: [
      "Personnel formé aux urgences pédiatriques",
      "Disponibilité immédiate",
      "Rapport détaillé chaque matin"
    ]
  },
  "menage-profondeur": {
    image: Image5,
    title: "Ménage en profondeur",
    description: "Nettoyage intensif pour un résultat impeccable dans chaque recoin.",
    details: [
      "Nettoyage des murs et plafonds",
      "Détartrage des sanitaires",
      "Nettoyage des appareils électroménagers",
      "Dégradation des vitres et miroirs",
      "Nettoyage des stores et rideaux",
      "Désinfection complète des surfaces"
    ],
    pricing: [
      { option: "Studio (<50m²)", price: "600-800 MAD" },
      { option: "Appartement (50-100m²)", price: "900-1200 MAD" },
      { option: "Villa (>100m²)", price: "1500-2000 MAD" },
      { option: "Nettoyage de moquette", price: "20-30 MAD/m²" }
    ],
    schedule: "Sur rendez-vous - 8h à 18h",
    benefits: [
      "Équipement professionnel haute pression",
      "Produits écologiques puissants",
      "Résultats garantis"
    ]
  },
  "baby-sitting-weekend": {
    image: Image6,
    title: "Baby-sitting week-end",
    description: "Service spécialisé de garde d'enfants les weekends et jours fériés.",
    details: [
      "Garde journée complète ou soirée",
      "Activités créatives et sorties",
      "Repas et goûters inclus",
      "Baignade et soins d'hygiène",
      "Coucher et lecture d'histoires",
      "Service flexible et adapté"
    ],
    pricing: [
      { option: "Demi-journée (5h)", price: "250-350 MAD" },
      { option: "Journée complète (8-12h)", price: "400-600 MAD" },
      { option: "Soirée (18h-00h)", price: "300-450 MAD" },
      { option: "Forfait week-end complet", price: "1000-1500 MAD" }
    ],
    schedule: "Samedi et dimanche - 8h à minuit",
    benefits: [
      "Activités pédagogiques incluses",
      "Transport possible sur demande",
      "Garde multiple (frères/sœurs)"
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  if (!service) {
    return <div className="text-center py-20 text-xl">Service non trouvé</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#ed117f]">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link to="/service" className="ml-1 text-sm font-medium text-gray-700 hover:text-[#ed117f] md:ml-2">
                Services
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-[#ed117f] md:ml-2">
                {service.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 max-h-1/2">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.title}</h1>
            <div className="w-16 h-1 bg-[#ed117f] mb-4"></div>
            <p className="text-gray-600 text-lg mb-6">{service.description}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 (87 avis)</span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Détails du service</h2>
            <ul className="space-y-2 mb-8">
              {service.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-[#ed117f] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Nos avantages</h2>
            <ul className="space-y-2 mb-8">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-[#0463a3] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Briefcase className="text-[#ed117f] mr-2" />
            Tarifs
          </h2>
          <div className="space-y-4">
            {service.pricing.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                <span className="text-gray-700">{item.option}</span>
                <span className="font-semibold text-lg text-[#0463a3]">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">* Prix indicatifs - devis personnalisé disponible</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="text-[#ed117f] mr-2" />
            Horaires et disponibilité
          </h2>
          <div className="flex items-start mb-4">
            <Calendar className="text-gray-500 mr-3 mt-1" />
            <div>
              <p className="font-medium text-gray-800">Disponibilités :</p>
              <p className="text-gray-600">{service.schedule}</p>
            </div>
          </div>
          <div className="bg-[#f8f9fa] p-4 rounded-lg">
            <p className="text-gray-700 mb-2">Service disponible dans :</p>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#ed117f] mr-2" />
                <span>tous les ville de Maroc</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#a4bde7] bg-opacity-20 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="bg-[#ed117f] text-white rounded-full w-10 h-10 flex items-center justify-center mb-3 font-bold">1</div>
            <h3 className="font-semibold text-gray-800 mb-2">Demande de service</h3>
            <p className="text-gray-600">Contactez-nous par téléphone ou via notre formulaire en ligne</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="bg-[#ed117f] text-white rounded-full w-10 h-10 flex items-center justify-center mb-3 font-bold">2</div>
            <h3 className="font-semibold text-gray-800 mb-2">Planification</h3>
            <p className="text-gray-600">Nous convenons d'un créneau horaire qui vous arrange</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="bg-[#ed117f] text-white rounded-full w-10 h-10 flex items-center justify-center mb-3 font-bold">3</div>
            <h3 className="font-semibold text-gray-800 mb-2">Intervention</h3>
            <p className="text-gray-600">Notre professionnel intervient à votre domicile selon vos besoins</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Questions fréquentes</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold text-gray-800">Comment se déroule la réservation ?</h3>
            <p className="text-gray-600 mt-2">Vous pouvez réserver directement en ligne ou par téléphone au +212 6 12 34 56 78. Un acompte de 20% sera demandé pour confirmer la réservation.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold text-gray-800">Quels modes de paiement acceptez-vous ?</h3>
            <p className="text-gray-600 mt-2">Nous acceptons les paiements en espèces (MAD), par carte bancaire, ou virement. Les chèques ne sont pas acceptés.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold text-gray-800">Puis-je annuler ou modifier une réservation ?</h3>
            <p className="text-gray-600 mt-2">Toute annellation doit être effectuée au moins 24h à l'avance pour un remboursement intégral. En cas d'annulation tardive, l'acompte sera retenu.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Les produits de nettoyage sont-ils fournis ?</h3>
            <p className="text-gray-600 mt-2">Oui, nous utilisons des produits professionnels écologiques. Si vous préférez utiliser vos propres produits, merci de nous en informer à l'avance.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/contact"
          className="inline-block bg-[#ed117f] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#d10c6a] transition-colors text-lg"
        >
          Réserver ce service
        </Link>
        <p className="text-gray-600 mt-4">Ou contactez-nous directement au <strong>+212 6 12 34 56 78</strong></p>
      </div>
    </div>
  );
}