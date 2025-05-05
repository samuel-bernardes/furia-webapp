import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiscord,
    faTwitch,
    faInstagram,
    faXTwitter,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from 'react-router';

const navigation = {
    main: [
        { name: 'Sobre', href: '/sobre' },
        { name: 'Clipes', href: '/clipes' },
        { name: 'Quiz', href: '/quiz' },
    ],
    social: [
        {
            name: 'Discord',
            href: 'https://discord.gg/furia',
            icon: <FontAwesomeIcon icon={faDiscord} />,
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/furiagg/',
            icon: <FontAwesomeIcon icon={faInstagram} />,
        },
        {
            name: 'X (Twitter)',
            href: 'https://twitter.com/furia',
            icon: <FontAwesomeIcon icon={faXTwitter} />,
        },
        {
            name: 'YouTube',
            href: 'https://www.youtube.com/@FURIAgg',
            icon: <FontAwesomeIcon icon={faYoutube} />,
        },
        {
            name: 'Twitch',
            href: 'https://www.twitch.tv/furiatv',
            icon: <FontAwesomeIcon icon={faTwitch} />
        },
    ],
}

function Footer() {

    const navigate = useNavigate();

    return (
        <footer className="bg-neutral-950">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
                    {navigation.main.map((item) => (
                        <span
                            className='cursor-pointer'
                            key={item.name}
                            onClick={() => navigate(item.href)}
                        >
                            <span className="text-gray-400 hover:text-white transition-colors duration-200">
                                {item.name}
                            </span>
                        </span>
                    ))}
                </nav>
                <div className="mt-16 flex justify-center gap-x-8">
                    {navigation.social.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.name}
                        >
                            <span className="text-2xl text-gray-400 hover:text-white transition-colors duration-200">{item.icon}</span>
                        </a>
                    ))}
                </div>
                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    &copy; {new Date().getFullYear()} FURIA, Inc. Todos os direitos reservados.
                </p>
                <p className="mt-4 text-center text-xs/6 text-gray-400">
                    Desenvolvido por: Samuel Bernardes
                </p>
            </div>
        </footer>
    )
}

export default Footer;