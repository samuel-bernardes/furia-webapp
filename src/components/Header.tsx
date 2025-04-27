import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { logoBlack } from '../assets'
import { href, useNavigate } from 'react-router'

const navigation = [
    { name: 'Quiz', href: 'quiz' },
    { name: 'Clipes', href: 'clipes' },
    { name: 'Sobre', href: 'sobre' },
]

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <header className="bg-slate-100">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex flex-1">
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <span key={item.name} onClick={() => navigate(`/${item.href}`)} className="text-sm/2 cursor-pointer font-semibold transition text-gray-900 hover:scale-120" >
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
                        className="h-12 w-auto transition hover:scale-120 hover:rotate-6"
                    />
                </div>
                <div className="flex flex-1 justify-end">
                    <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                        Entrar <span aria-hidden="true">&rarr;</span>
                    </a>
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
                            <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                                Entrar <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">
                        {navigation.map((item) => (
                            <span
                                key={item.name}
                                onClick={() => navigate(`/${item.href}`)}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Header;