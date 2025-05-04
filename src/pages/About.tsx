import { CsTeam } from "../assets";
import { jobOpenings, timeline } from "../mocks/aboutMocks";

function About() {
    return (
        <div className="bg-neutral-950 text-white">
            <main className="isolate">
                {/* Hero section */}
                <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-yellow-500/10 pt-14">
                    <div
                        aria-hidden="true"
                        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-neutral-950 shadow-xl shadow-yellow-500/10 ring-1 ring-yellow-500/20 sm:-mr-80 lg:-mr-96"
                    />
                    <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                            <h1 className="max-w-2xl text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl lg:col-span-2 xl:col-auto">
                                Nossa paixão por <span className="text-yellow-400">e-sports</span> move o Brasil
                            </h1>
                            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                                <p className="text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
                                    A FURIA é mais que uma organização de e-sports - somos uma família que acredita no potencial brasileiro
                                    de competir e vencer no cenário global. Combinamos talento, disciplina e inovação para escrever nossa história.
                                </p>
                            </div>
                            <img
                                alt="Equipe FURIA comemorando vitória"
                                src="https://f.i.uol.com.br/fotografia/2021/11/17/16371524326194f6b067bbf_1637152432_3x2_xl.jpg"
                                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36 border-2 border-yellow-500/30"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-neutral-950 sm:h-32" />
                </div>

                {/* Timeline section */}
                <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                        {timeline.map((item) => (
                            <div key={item.name} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 hover:border-yellow-500/50 transition-colors">
                                <time dateTime={item.dateTime} className="flex items-center text-sm/6 font-semibold text-yellow-400">
                                    <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
                                        <circle r={2} cx={2} cy={2} fill="currentColor" />
                                    </svg>
                                    {item.date}
                                    <div
                                        aria-hidden="true"
                                        className="absolute -ml-2 h-px w-screen -translate-x-full bg-yellow-500/20 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                                    />
                                </time>
                                <p className="mt-6 text-lg/8 font-bold tracking-tight text-white">{item.name}</p>
                                <p className="mt-1 text-base/7 text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Content section - Nossos times */}
                <div className="mt-32 overflow-hidden sm:mt-40">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Nossos <span className="text-yellow-400">times</span></h2>
                                <p className="mt-6 text-xl/8 text-gray-300">
                                    Cada equipe FURIA carrega nossa essência de garra, resiliência e busca pela excelência. Conheça as formações que representam o Brasil no mundo.
                                </p>
                                <p className="mt-6 text-base/7 text-gray-400">
                                    Do CS:GO ao Valorant, do League of Legends ao FURIA FC, nossos jogadores são selecionados não apenas por sua habilidade, mas por seu potencial de crescimento e capacidade de trabalhar em equipe.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                    <img
                                        alt="Time FURIA CS:GO"
                                        src={CsTeam}
                                        className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-neutral-800 object-cover border border-neutral-700"
                                    />
                                </div>
                                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                                    <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                        <img
                                            alt="Time FURIA Valorant"
                                            src="https://assets.gamearena.gg/wp-content/uploads/2025/01/23202839/FURIA-VALORANT-2025.jpg"
                                            className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-neutral-800 object-cover border border-neutral-700"
                                        />
                                    </div>
                                    <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                        <img
                                            alt="FURIA FC"
                                            src="https://pbs.twimg.com/media/GIGasOYXUAAue96.jpg:large"
                                            className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-neutral-800 object-cover border border-neutral-700"
                                        />
                                    </div>
                                    <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                        <img
                                            alt="Time FURIA LoL"
                                            src="https://noticias.maisesports.com.br/wp-content/uploads/2025/01/furia-lol-lta-sul-2025-1120x630.jpg"
                                            className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-neutral-800 object-cover border border-neutral-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section - Trabalhe conosco */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                        <div className="w-full lg:max-w-lg lg:flex-auto">
                            <h2 className="text-pretty text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Faça parte do <span className="text-yellow-400">time FURIA</span>
                            </h2>
                            <p className="mt-6 text-xl/8 text-gray-300">
                                Buscamos talentos tão apaixonados por e-sports quanto nós. Se você quer ajudar a construir o futuro dos jogos competitivos, venha conosco!
                            </p>
                            <img
                                alt="Gaming House FURIA"
                                src="https://media.licdn.com/dms/image/v2/D4D22AQG0kuNHrtBN_Q/feedshare-shrink_1280/B4DZRrKhg_HkAo-/0/1736964732371?e=1749081600&v=beta&t=7SYgQCA-gHh1AAptK4oVciLZ49sUTFTpJmn02wF4v-w"
                                className="mt-16 aspect-[6/5] w-full rounded-2xl bg-neutral-800 object-cover border border-neutral-700 lg:aspect-auto lg:h-[34.5rem]"
                            />
                        </div>
                        <div className="w-full lg:max-w-xl lg:flex-auto">
                            <h3 className="sr-only">Vagas disponíveis</h3>
                            <ul className="-my-8 divide-y divide-neutral-800">
                                {jobOpenings.map((opening) => (
                                    <li key={opening.id} className="py-8">
                                        <dl className="relative flex flex-wrap gap-x-3">
                                            <dt className="sr-only">Cargo</dt>
                                            <dd className="w-full flex-none text-lg font-semibold tracking-tight text-white">
                                                <a href={opening.href} className="hover:text-yellow-400 transition-colors">
                                                    {opening.role}
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                </a>
                                            </dd>
                                            <dt className="sr-only">Descrição</dt>
                                            <dd className="mt-2 w-full flex-none text-base/7 text-gray-400">{opening.description}</dd>
                                            <dt className="sr-only">Salário</dt>
                                            <dd className="mt-4 text-base/7 font-semibold text-yellow-400">{opening.salary}</dd>
                                            <dt className="sr-only">Localização</dt>
                                            <dd className="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                                                <svg viewBox="0 0 2 2" aria-hidden="true" className="size-0.5 flex-none fill-gray-600">
                                                    <circle r={1} cx={1} cy={1} />
                                                </svg>
                                                {opening.location}
                                            </dd>
                                        </dl>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex border-t border-neutral-800 pt-8">
                                <a href="https://www.linkedin.com/company/furiagg/" target="_blank" className="text-sm/6 font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                                    Ver todas as vagas <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About;