import { useNavigate } from "react-router";
import { loginWallpaper, logoBlack } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiscord,
    faTwitch,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const env = import.meta.env;

function Login() {
    const navigate = useNavigate();

    const discordRedirectUrl = `${env.VITE_DISCORD_REDIRECT_URL}`;

    return (
        <div className="min-h-screen bg-neutral-950 bg-cover bg-center flex" style={{ backgroundImage: `url(${loginWallpaper})` }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
            <div className="relative z-10 flex min-h-full flex-1 flex-col justify-center py-12 p-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        onClick={() => navigate("/")}
                        alt="FURIA Logo"
                        src={logoBlack}
                        className="mx-auto h-24 w-auto cursor-pointer"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Entre em sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-gray-200 px-6 py-12 shadow-sm rounded-lg sm:px-12">
                        <div className="space-y-6">
                            <div className="relative">
                                <div className="relative flex justify-center">
                                    <span className="px-6 text-gray-900 text-xl font-medium">Escolha seu método de login</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <a
                                    href={discordRedirectUrl}
                                    className="flex w-full items-center justify-center gap-3 rounded-md p-3 shadow-xs transition-colors bg-[#5865F2] hover:bg-[#4752C4]"
                                >
                                    <FontAwesomeIcon icon={faDiscord} className="text-white text-sm font-semibold" />
                                    <span className="text-sm font-semibold text-white">Discord</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md p-3 text-sm font-semibold text-white shadow-xs transition-colors bg-[#9146FF] hover:bg-[#7d3be6]"
                                >
                                    <FontAwesomeIcon icon={faTwitch} className="text-white text-sm font-semibold" />
                                    <span className="text-sm font-semibold text-white">Twitch</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md p-3 text-sm font-semibold text-white shadow-xs transition-colors bg-black hover:bg-gray-900"
                                >
                                    <FontAwesomeIcon icon={faXTwitter} className="text-white text-sm font-semibold" />
                                    <span className="text-sm font-semibold text-white">Twitter</span>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;