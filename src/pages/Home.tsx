import { logoBlack } from "../assets";
import { Brands } from "../components";

function Home() {
    return (
        <div>
            <main>
                <div className="relative isolate overflow-hidde">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-yellow-500/10"
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
                        <svg x="50%" y={-1} className="overflow-visible fill-yellow-500">
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" width="100%" height="100%" strokeWidth={0} />
                    </svg>
                    <div
                        aria-hidden="true"
                        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                            className="aspect-1108/632 w-[69.25rem] bg-gradient-to-r from-[#FFD700]/70 to-black/80 opacity-40"
                        />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
                            <img
                                alt="FURIA Logo"
                                src={logoBlack}
                                className="h-24"
                            />
                            <div className="mt-24 sm:mt-32 lg:mt-16">
                                <a href="#" className="inline-flex space-x-6">
                                    <span className="rounded-full bg-yellow-200 px-3 py-1 text-sm/6 font-semibold text-gray-900 ring-1 ring-inset">
                                        NOVIDADES
                                    </span>
                                    <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-200">
                                        <span>Próximos Jogos</span>
                                        {/* <ChevronRightIcon aria-hidden="true" className="size-5 text-yellow-700" /> */}
                                    </span>
                                </a>
                            </div>
                            <h1 className="mt-10 text-5xl font-bold tracking-tight text-pretty text-white sm:text-7xl">
                                A FURIA do Brasil
                            </h1>
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                                Uma organização de esports que nasceu do desejo de representar o Brasil no CS e conquistou muito mais que isso: expandimos nossas ligas, disputamos os principais títulos, adotamos novos objetivos e ganhamos um propósito maior. Somos muito mais que o sucesso competitivo.
                                Somos um movimento sociocultural.
                            </p>
                            {/* <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-furia-yellow px-3.5 py-2.5 text-sm font-bold text-furia-black shadow-xs hover:bg-furia-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-furia-yellow transition-colors"
                                >
                                    ASSISTA AO VIVO
                                </a>
                                <a href="#" className="text-sm/6 font-semibold text-furia-yellow hover:text-white transition-colors">
                                    CONHEÇA O TIME <span aria-hidden="true">→</span>
                                </a>
                            </div> */}
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
                            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                <img
                                    alt="FURIA Team"
                                    src="https://furiagg.fbitsstatic.net/img/b/1be4afd5-a727-4555-81fd-e779a32578be.jpg?w=1920&v=no-change"
                                    width={2432}
                                    height={1442}
                                    className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-yellow-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="text-center text-2xl font-semibold text-gray-900">
                            Conheça nossos parceiros e patrocinadores
                        </h2>
                        <Brands />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;