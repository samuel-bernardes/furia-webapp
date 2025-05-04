import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiscord,
    faTwitch,
    faInstagram,
    faXTwitter,
    faYoutube,
    faSteam
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faPlus } from "@fortawesome/free-solid-svg-icons";
import useDoRequest from '../hooks/useDoRequest';
import { useEffect, useState } from 'react';
import { IUser } from '../services/endpoints/users/IUsers.interface';
import { useUserContext } from '../context/user/UserContext';

// Mapeamento de ícones para redes sociais
const platformIcons: { [key: string]: any } = {
    'Discord': faDiscord,
    'Instagram': faInstagram,
    'Twitter': faXTwitter,
    'YouTube': faYoutube,
    'Twitch': faTwitch,
    'Steam': faSteam,
    'Website': faGlobe
};

const env = import.meta.env;

export default function ProfilePage() {

    const GetUserDetails = useDoRequest((api) => api.UsersRequest.getUserDetails);
    const { user } = useUserContext();
    const [userDetails, setUserDetails] = useState<IUser | null>(null);

    async function getUserDetails() {
        if (!user) return;

        try {
            const response = await GetUserDetails.doRequest(user.id);
            if (response.data) {
                //@ts-ignore
                setUserDetails(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    }

    // Função para conectar rede social
    const handleConnectSocial = (platform: string) => {
        // Obter o token JWT do usuário logado
        const userToken = sessionStorage.getItem('token');// Ou de onde você armazena o token

        if (!userToken) {
            return '#';
        }

        // Configurações base para cada provedor
        const providers = {
            Twitch: {
                authUrl: 'https://id.twitch.tv/oauth2/authorize',
                clientId: env.VITE_TWITCH_CLIENT_ID,
                redirectUri: 'http://localhost:3333/connection/twitch',
                scopes: 'user:read:email'
            },
            Discord: {
                authUrl: 'https://discord.com/oauth2/authorize',
                clientId: env.VITE_DISCORD_CLIENT_ID, // Melhor usar env.VITE_DISCORD_CLIENT_ID
                redirectUri: 'http://localhost:3333/connection/discord',
                scopes: 'identify email openid'
            }
        };

        // Verifica se a plataforma é suportada
        //@ts-ignore
        if (!providers[platform]) {
            return '#';
        }

        //@ts-ignore
        const { authUrl, clientId, redirectUri, scopes } = providers[platform];

        // Cria um state seguro contendo o token JWT e um nonce
        const state = encodeURIComponent(JSON.stringify({
            token: userToken,
            nonce: Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15)
        }));

        // Gera a URL de autorização
        return `${authUrl}?` +
            `response_type=code&` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `scope=${encodeURIComponent(scopes)}&` +
            `state=${state}&` +
            `force_verify=false`;
    };

    useEffect(() => {
        getUserDetails();
    }, [user]);

    // Estado de loading
    if (GetUserDetails.loading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 relative isolate overflow-hidden flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-yellow-400">Carregando perfil...</p>
                </div>
            </div>
        );
    }

    // Estado de erro ou usuário não encontrado
    if (!userDetails) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 py-16 relative isolate overflow-hidden flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20">
                        <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-white">Perfil não encontrado</h3>
                    <p className="mt-1 text-gray-400">Não foi possível carregar os dados do usuário</p>
                    <div className="mt-6">
                        <button
                            onClick={getUserDetails}
                            className="inline-flex items-center rounded-md bg-yellow-500/10 px-3 py-2 text-sm font-medium text-yellow-400 hover:bg-yellow-500/20"
                        >
                            Tentar novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8 py-16 relative isolate overflow-hidden">
            {/* Background pattern similar ao componente FURIA */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-yellow-500/10"
            >
                <defs>
                    <pattern
                        x="50%"
                        y={-1}
                        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-yellow-500/60">
                    <path
                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect width="100%" height="100%" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" strokeWidth={0} />
            </svg>

            {/* Gradiente decorativo */}
            <div
                aria-hidden="true"
                className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#FFD700]/70 to-black/80 opacity-20"
                />
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Cabeçalho do Perfil */}
                <div className="flex flex-col items-center md:flex-row gap-8 mb-8 relative">
                    <img
                        src={userDetails.avatar}
                        alt={userDetails.name}
                        className="w-42 h-42 rounded-full object-cover border-2 border-yellow-500 shadow-lg"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-4xl font-bold mb-2 text-white">{userDetails.name}</h1>
                                <p className="text-gray-300 mb-1">{userDetails.email}</p>
                                {userDetails.phone && <p className="text-gray-300">{userDetails.phone}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Grid de Informações */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Coluna Esquerda - Dados Pessoais */}
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-yellow-400">Dados Pessoais</h2>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-gray-400">CPF</dt>
                                <dd className="text-gray-200">{userDetails.cpf || 'Não informado'}</dd>
                            </div>
                            {userDetails.address ? (
                                <div>
                                    <dt className="text-gray-400">Endereço</dt>
                                    <dd className="text-gray-300">
                                        {userDetails.address.street}, {userDetails.address.number}<br />
                                        {userDetails.address.city} - {userDetails.address.state}<br />
                                        CEP: {userDetails.address.zipCode}
                                    </dd>
                                </div>
                            ) : (
                                <div>
                                    <dt className="text-gray-400">Endereço</dt>
                                    <dd className="text-gray-300 italic">Não cadastrado</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Coluna Direita - Interesses */}
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Jogos Favoritos</h2>
                            <div className="flex flex-wrap gap-2">
                                {userDetails?.interests?.length > 0 ? (
                                    userDetails?.interests?.map((game, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-yellow-500/20 text-yellow-50 rounded-full text-sm border border-yellow-500"
                                        >
                                            {game}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-400 italic">Nenhum jogo cadastrado</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-indigo-500">Eventos de interesse</h2>
                            <div className="flex flex-wrap gap-2">
                                {userDetails?.eventInterests?.length > 0 ? (
                                    userDetails?.eventInterests?.map((event, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-indigo-500/20 text-indigo-50 rounded-full text-sm border border-indigo-500"
                                        >
                                            {event}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-400 italic">Nenhum evento de interesse</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Redes Sociais */}
                <div className="max-w-4xl mx-auto relative">

                    {/* Seção de Redes Sociais */}
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-yellow-400">Redes Conectadas</h2>
                            <button
                                className="flex items-center text-yellow-500 hover:text-yellow-300 transition-colors font-medium"
                                onClick={() => console.log("Abrir modal de conexão")}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Conectar Rede
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Redes conectadas */}
                            {userDetails?.socials?.length > 0 ? (
                                userDetails?.socials?.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 hover:border-yellow-500/50 group"
                                    >
                                        <FontAwesomeIcon
                                            icon={platformIcons[social.platform] || faGlobe}
                                            className="text-2xl mr-3 text-yellow-500 group-hover:text-yellow-400 transition-colors"
                                        />
                                        <span className="group-hover:text-white transition-colors">{social.platform}</span>
                                    </a>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-4">
                                    <p className="text-gray-400 italic">Nenhuma rede social conectada</p>
                                </div>
                            )}

                            {/* Redes não conectadas - estilo original */}
                            {['Instagram', 'Twitch', 'Twitter', 'Discord', 'YouTube', 'Steam'].map((platform) => {
                                // Verifica se a rede já está conectada
                                const isConnected = userDetails?.socials?.some(s => s.platform === platform);

                                return isConnected ? null : (
                                    <a
                                        key={platform}
                                        /* target="_blank" */
                                        href={handleConnectSocial(platform)}
                                        className="flex items-center p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-600/50 hover:border-yellow-500/30 group"
                                    >
                                        <FontAwesomeIcon
                                            icon={platformIcons[platform]}
                                            className="text-2xl mr-3 text-gray-400 group-hover:text-gray-300 transition-colors"
                                        />
                                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {platform}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}