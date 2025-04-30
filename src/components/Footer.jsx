// src/components/Footer.jsx
import React from 'react';
import {
    Instagram,
    Github,
    Linkedin,
    Mail,
} from 'lucide-react';

const socialLinks = [
    { id: 1, icon: <Instagram size={20} />, link: 'https://www.instagram.com/gonzalo_de_la_fuente_/' },
    { id: 2, icon: <Github size={20} />, link: 'https://github.com/GonzaloDeLaFuente3' },
    { id: 3, icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/gonzalo-de-la-fuente-257745253/' },
    { id: 4, icon: <Mail size={20} />, link: 'mailto:gonchi3.gdlf@gmail.com' },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 mt-10 shadow-inner z-50">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">NodoGames</h3>
            <p className="text-sm">Alumno: Gonzalo De La Fuente</p>
            <p className="text-sm">Proyecto de Desarrollo Front End con React</p>
            <p className="text-xs mt-2 text-gray-500">© {new Date().getFullYear()} NodoGames. Todos los derechos reservados.</p>

            <div className="flex justify-center gap-4 mt-4">
            {socialLinks.map((social) => (
                <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                {social.icon}
                </a>
            ))}
            </div>
        </div>
        </footer>
    );
};

export default Footer;
