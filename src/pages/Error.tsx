import { useNavigate } from "react-router";
import { loginWallpaper, logoBlack } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function Error() {
    const navigate = useNavigate();

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
                    <div className="flex flex-col items-center justify-center mt-6">
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            className="text-yellow-500 text-5xl mb-4 animate-pulse"
                        />
                        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                            Oops! Algo deu errado
                        </h2>
                        <p className="mt-2 text-center text-gray-300">
                            Parece que encontramos um problema. Por favor, tente novamente mais tarde.
                        </p>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-gray-200 px-6 py-8 shadow-sm rounded-lg sm:px-12">
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-gray-900 mb-6">
                                    Você pode tentar:
                                </p>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex w-full items-center justify-center gap-3 rounded-md p-3 shadow-xs transition-colors bg-yellow-600 hover:bg-yellow-700 text-white"
                                >
                                    <span className="text-sm font-semibold">Recarregar a página</span>
                                </button>

                                <button
                                    onClick={() => navigate("/")}
                                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-md p-3 shadow-xs transition-colors bg-gray-800 hover:bg-gray-900 text-white"
                                >
                                    <span className="text-sm font-semibold">Voltar para a página inicial</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-300">
                        <p>
                            Se o problema persistir, entre em contato com o suporte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;