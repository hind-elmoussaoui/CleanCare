import React from "react";
import {FaFacebook, FaTwitter, FaWhatsapp, FaInstagram} from 'react-icons/fa';

function Footer(){
    return (
    <footer className="bg-[#a4bde7] text-white text-center py-5 px-0 text-sm">
        <div className="mb-2.5 flex justify-center">
            <a href="#https://Facebook.com/cleanCare" className="text-white my-0 mx-2.5 text-[20px] no-underline"><FaFacebook/></a>
            <a href="#https://Twitter.com/cleanCare" className="text-white my-0 mx-2.5 text-[20px] no-underline"><FaTwitter/></a>
            <a href="#https://Whatsapp.com/cleanCare" className="text-white my-0 mx-2.5 text-[20px] no-underline"><FaWhatsapp/></a>
            <a href="#https://Instagram.com/cleanCare" className="text-white my-0 mx-2.5 text-[20px] no-underline"><FaInstagram/></a>
        </div>
        <div className="mb-2.5">
            <a href="#Mentions" className="text-white my-0 mx-4 no-underline">Mentions légales</a>
            <a href="#Politique" className="text-white my-0 mx-4 no-underline">Politique en matière de cookies</a>
            <a href="#Politique" className="text-white my-0 mx-4 no-underline">Politique de confidentialité</a>
            <a href="#Conditions" className="text-white my-0 mx-4 no-underline">Conditions d'utilisation</a>
        </div>
        <p>© 2025 CleanCare. Tous droits réservés.</p>
    </footer>
    );
};

export default Footer;