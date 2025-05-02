import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface UserData {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    // Adicione outros campos conforme necessário
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: UserData;
    onSave: (updatedData: UserData) => Promise<void>;
    isLoading: boolean;
}

function EditProfileModal({
    isOpen,
    onClose,
    userData,
    onSave,
    isLoading,
}: EditProfileModalProps) {
    const [editData, setEditData] = useState<UserData>(userData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza os dados locais quando o userData prop muda
    useEffect(() => {
        setEditData(userData);
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!editData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!editData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
            newErrors.email = 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await onSave(editData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div
                className="bg-gray-800 rounded-lg max-w-2xl w-full border border-gray-700 shadow-xl relative"
                onClick={(e) => e.stopPropagation()} // Previne fechar ao clicar dentro do modal
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Fechar modal"
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6">Editar Perfil</h2>

                    <div className="space-y-4">
                        {/* Campo Nome */}
                        <div>
                            <label htmlFor="name" className="block text-gray-300 mb-1">
                                Nome *
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={editData.name}
                                onChange={handleChange}
                                className={`w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded px-4 py-2 text-white focus:border-yellow-500 focus:ring-yellow-500`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Campo Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-300 mb-1">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={editData.email}
                                onChange={handleChange}
                                className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded px-4 py-2 text-white focus:border-yellow-500 focus:ring-yellow-500`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Campo Telefone */}
                        <div>
                            <label htmlFor="phone" className="block text-gray-300 mb-1">
                                Telefone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={editData.phone || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-yellow-500 focus:ring-yellow-500"
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        {/* Campo Avatar (opcional) */}
                        {editData.avatar && (
                            <div>
                                <label className="block text-gray-300 mb-1">Avatar</label>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={editData.avatar}
                                        alt="Preview"
                                        className="w-16 h-16 rounded-full object-cover border border-yellow-500"
                                    />
                                    <button
                                        type="button"
                                        className="text-sm text-yellow-500 hover:text-yellow-400"
                                    // Adicione lógica para alterar avatar aqui
                                    >
                                        Alterar foto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 text-gray-300 hover:text-white disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Salvando...
                                </>
                            ) : (
                                'Salvar Alterações'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;