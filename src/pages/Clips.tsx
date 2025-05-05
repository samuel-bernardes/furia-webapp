import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrophy, faLaughSquint, faFire } from '@fortawesome/free-solid-svg-icons';
import { allClips, ClipCategories } from '../mocks/clips';

function Clips() {
    const [activeCategory, setActiveCategory] = useState(ClipCategories.ALL);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClips = allClips.filter(clip => {
        const matchesCategory = activeCategory === ClipCategories.ALL || clip.category === activeCategory;
        const matchesSearch = clip.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case ClipCategories.PLAYS:
                return <FontAwesomeIcon icon={faTrophy} className="text-yellow-400" />;
            case ClipCategories.FUNNY:
                return <FontAwesomeIcon icon={faLaughSquint} className="text-yellow-400" />;
            case ClipCategories.HIGHLIGHTS:
                return <FontAwesomeIcon icon={faFire} className="text-yellow-400" />;
            default:
                return <FontAwesomeIcon icon={faPlay} className="text-yellow-400" />;
        }
    };

    return (
        <div className="text-white p-8 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Clipes <span className="text-yellow-400">FURIA</span></h1>
                    <p className="text-gray-400">As melhores jogadas e momentos marcantes da equipe</p>
                </div>

                {/* Filtros e busca */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex flex-wrap gap-2">
                        {Object.values(ClipCategories).map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category ? 'bg-yellow-500 text-neutral-900' : 'bg-neutral-800 hover:bg-neutral-700'}`}
                            >
                                <div className="flex items-center gap-2">
                                    {getCategoryIcon(category)}
                                    {category}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Buscar clipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Grid de clipes */}
                {filteredClips.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClips.map((clip, index) => (
                            <div key={index} className="bg-neutral-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
                                <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                                    <iframe
                                        src={`https://www.youtube.com/embed/${clip.id}`}
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={clip.title}
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg line-clamp-2">{clip.title}</h3>
                                        <span className="bg-neutral-800 text-xs px-2 py-1 rounded ml-2 whitespace-nowrap">{clip.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(clip.category)}
                                            {clip.category}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>{clip.views} visualizações</span>
                                            <span>•</span>
                                            <span>{new Date(clip.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-medium text-gray-400">Nenhum clipe encontrado</h3>
                        <p className="text-gray-500 mt-2">Tente alterar os filtros ou a busca</p>
                    </div>
                )}

                {/* Carregar mais */}
                {filteredClips.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium transition-colors">
                            Carregar mais clipes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Clips;