import React from 'react';
import { 
  FiGithub, FiTwitter, FiLinkedin, FiMail,
  FiHeart, FiCode 
} from 'react-icons/fi';

function FooterDash() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-6">
        {/* Main Footer Content */}
        <div className="md:flex md:justify-between md:items-center">
          {/* Branding */}
          <div className="mb-6 md:mb-0">
            <span className="flex items-center text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              Cleaɳ<span className='text-pink-500'>Care</span>
              <span className="ml-2 text-pink-500">(✿◡‿◡)</span>
            </span>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Votre solution de nettoyage et garde d'enfant 
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Légale
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    CGU
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiMail className="mr-2 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    contact@cleacar.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <span>© 2025</span>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            CleaɳCare
            </a>
            <span>Tous droits réservés</span>
          </div>

          {/* Social Links */}
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <a href="https://github.com/hind-elmoussaoui"
            target="_blank"
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/el-moussaoui-hind-8375182b5"
            target="_blank"
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default FooterDash;