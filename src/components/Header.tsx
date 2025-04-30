import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { logoBlack } from '../assets'
import { useNavigate } from 'react-router'
import { useUserContext } from '../context/user/UserContext'

const navigation = [
    { name: 'Quiz', href: 'quiz' },
    { name: 'Clipes', href: 'clipes' },
    { name: 'Sobre', href: 'sobre' },
]

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const { user, logout, loading } = useUserContext();

    const handleLogout = () => {
        logout();
        setIsProfileMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="bg-slate-100 relative">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex flex-1">
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <span
                                key={item.name}
                                onClick={() => navigate(`/${item.href}`)}
                                className="text-sm/2 cursor-pointer font-semibold transition text-gray-900 hover:text-yellow-500"
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Abrir menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                </div>
                <div className="-m-1.5 p-1.5 cursor-pointer">
                    <span className="sr-only">Furia</span>
                    <img
                        alt="logo-furia"
                        onClick={() => navigate("/")}
                        src={logoBlack}
                        className="h-12 w-auto transition hover:scale-105"
                    />
                </div>
                <div className="hidden lg:flex flex-1 justify-end">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                        </div>
                    ) : user ? (
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        Olá, {user?.name?.split(' ')[0]}
                                    </span>
                                    <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-semibold text-gray-900">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDownIcon
                                        className={`h-4 w-4 text-gray-900 transition-transform ${isProfileMenuOpen ? 'transform rotate-180' : ''}`}
                                    />
                                </div>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                navigate("/perfil");
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Perfil
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="group relative flex items-center justify-center overflow-hidden rounded-md bg-yellow-500 p-3 min-w-40 shadow-sm transition-all hover:bg-yellow-400 hover:shadow-md"
                        >
                            <span className="relative text-md font-semibold">
                                Entrar
                                <span
                                    className={`absolute left-0 block h-0.5 bg-gray-900 transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`}
                                    style={{ bottom: '-2px' }}
                                />
                            </span>
                        </button>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Fechar menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="-m-1.5 p-1.5 cursor-pointer">
                            <span className="sr-only">Furia</span>
                            <img
                                onClick={() => navigate("/")}
                                alt="logo-furia"
                                src={logoBlack}
                                className="h-12 w-auto"
                            />
                        </div>
                        <div className="flex flex-1 justify-end">
                            {/* Espaço vazio para manter o alinhamento */}
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        {navigation.map((item) => (
                            <span
                                key={item.name}
                                onClick={() => {
                                    navigate(`/${item.href}`);
                                    setMobileMenuOpen(false);
                                }}
                                className="-mx-3 block rounded-lg px-3 py-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </span>
                        ))}
                        {loading ? (
                            <div className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-3">
                                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ) : user ? (
                            <>
                                <div
                                    className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        navigate("/perfil");
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-semibold text-gray-900">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-base/7 font-semibold text-gray-900">
                                        Perfil
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="-mx-3 w-full text-left rounded-lg px-3 py-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate("/login");
                                    setMobileMenuOpen(false);
                                }}
                                className="-mx-3 w-58 rounded-lg bg-yellow-500 px-3 py-3 text-base/7 font-semibold text-gray-900 text-center hover:bg-yellow-400"
                            >
                                <span className='text-md font-semibold'>
                                    Entrar
                                </span>
                            </button>
                        )}
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Header;