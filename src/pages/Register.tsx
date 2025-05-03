import { useState, useCallback } from 'react';
import { PhotoIcon } from "@heroicons/react/24/outline";
import { brazilianStates } from '../mocks/brazilianStates';
import useDoRequest from '../hooks/useDoRequest';
import { maskCEP, maskCPF, maskPhone } from '../utils/Mask';
import { ICompleteUserDTO } from '../services/endpoints/users/IUsers.interface';
import { useUserContext } from '../context/user/UserContext';
import { useNavigate } from 'react-router';

function Register() {
    // Estado do formulário
    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        email: '',
        phone: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        interests: [],
        events: [],
        avatar: null as string | null, // Novo campo
        document: null as string | null,
        terms: false
    });

    const [errors, setErrors] = useState<any>({});
    const [isDragging, setIsDragging] = useState(false);

    const CompleteRegistration = useDoRequest((api) => api.UsersRequest.completeRegistration);

    const navigate = useNavigate();

    const { updateUser } = useUserContext();

    async function handleCompleteRegistration() {
        const registerData: ICompleteUserDTO = {
            address: {
                city: formData.city,
                number: formData.number,
                state: formData.state,
                street: formData.street + " " + formData.neighborhood,
                zipCode: formData.zipCode
            },
            cpf: formData.cpf,
            document: formData.document || "",
            email: formData.email,
            name: formData.fullName,
            phone: formData.phone,
            eventInterests: formData.events,
            interests: formData.interests,
            avatar: formData.avatar || undefined,
        }

        const response = await CompleteRegistration.doRequest(registerData);

        if (response.data) {
            await updateUser(); // Chama a função atualizada

            navigate("/");

        }
    }

    const handleFileChange = async (file: File) => {
        if (!file) return;

        // Check file type and size
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!validTypes.includes(file.type)) {
            setErrors({ ...errors, document: 'Tipo de arquivo inválido. Use JPG, PNG ou PDF.' });
            return;
        }

        if (file.size > maxSize) {
            setErrors({ ...errors, document: 'Arquivo muito grande. Tamanho máximo: 10MB.' });
            return;
        }

        try {
            const base64String = await convertToBase64(file);
            setFormData(prev => ({ ...prev, document: base64String }));
            setErrors({ ...errors, document: undefined });
        } catch (error) {
            console.error('Error converting file:', error);
            setErrors({ ...errors, document: 'Erro ao processar o arquivo.' });
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Manipuladores de eventos
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        //@ts-ignore
        const { name, value, type, checked, files } = e.target;

        let processedValue = value;

        // Aplicar máscaras
        if (name === 'cpf') {
            processedValue = maskCPF(value.replace(/\D/g, ''));
        } else if (name === 'phone') {
            processedValue = maskPhone(value.replace(/\D/g, ''));
        } else if (name === 'zipCode') {
            processedValue = maskCEP(value.replace(/\D/g, ''));
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                //@ts-ignore
                type === 'file' ? (files && files[0] ? handleFileChange(files[0]) : null) :
                    processedValue
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setFormData(prev => {
            //@ts-ignore
            const currentArray = [...prev[name]];
            if (checked) {
                return { ...prev, [name]: [...currentArray, value] };
            } else {
                return { ...prev, [name]: currentArray.filter(item => item !== value) };
            }
        });
    };

    // Drag and drop handlers
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleFileChange(e.dataTransfer.files[0]);
        }
    }, []);

    const handleAvatarChange = async (file: File) => {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!validTypes.includes(file.type)) {
            setErrors({ ...errors, avatar: 'Tipo de arquivo inválido. Use JPG ou PNG.' });
            return;
        }

        if (file.size > maxSize) {
            setErrors({ ...errors, avatar: 'Arquivo muito grande. Tamanho máximo: 2MB.' });
            return;
        }

        try {
            const base64String = await convertToBase64(file);
            setFormData(prev => ({ ...prev, avatar: base64String }));
            setErrors({ ...errors, avatar: undefined });
        } catch (error) {
            console.error('Error converting avatar:', error);
            setErrors({ ...errors, avatar: 'Erro ao processar a imagem.' });
        }
    };

    // Validações
    const validateForm = () => {
        const newErrors: any = {};
        // Verificar se o documento é uma imagem ou PDF válido
        if (formData.document) {
            const validTypes = ['image/jpeg', 'image/png'];
            const mimeType = formData.document.split(';')[0].split(':')[1];

            if (!validTypes.includes(mimeType)) {
                newErrors.document = 'Tipo de arquivo inválido. Use JPG ou PNG.';
            }
        }

        if (formData.avatar) {
            const validTypes = ['image/jpeg', 'image/png'];
            const mimeType = formData.avatar.split(';')[0].split(':')[1];

            if (!validTypes.includes(mimeType)) {
                newErrors.avatar = 'Formato de imagem inválido';
            }
        }

        // Validação de campos obrigatórios
        if (!formData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório';
        if (!formData.cpf || formData.cpf.length !== 14) newErrors.cpf = 'CPF inválido';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
        if (!formData.phone || formData.phone.length < 14) newErrors.phone = 'Telefone inválido';
        if (!formData.street.trim()) newErrors.street = 'Logradouro é obrigatório';
        if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
        if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
        if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
        if (!formData.state) newErrors.state = 'Estado é obrigatório';
        if (!formData.zipCode || formData.zipCode.length !== 9) newErrors.zipCode = 'CEP inválido';
        if (!formData.document) newErrors.document = 'Documento é obrigatório';
        if (!formData.terms) newErrors.terms = 'Você deve aceitar os termos';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Envio do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await handleCompleteRegistration();
        } catch (error: any) {
            console.error('Erro ao enviar:', error);

            // Tratamento específico para erros de validação de documento
            if (error.response?.data?.message?.includes('Documento inválido')) {
                setErrors({
                    ...errors,
                    document: error.response.data.message
                });
            } else {
                // Feedback genérico para outros erros
                alert('Erro ao completar cadastro: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const eventOptions = [
        { value: 'Eventos Online (lives, entrevistas)', label: 'Eventos Online (lives, entrevistas)' },
        { value: 'Eventos Presenciais (lan houses, arenas)', label: 'Eventos Presenciais (lan houses, arenas)' },
        { value: 'Campeonatos eSports', label: 'Campeonatos eSports' },
        { value: 'Meetups com jogadores e streamers', label: 'Meetups com jogadores e streamers' },
        { value: 'Tour em gaming houses / sede da FURIA', label: 'Tour em gaming houses / sede da FURIA' },
        { value: 'Conteúdo exclusivo (bastidores, vídeos especiais)', label: 'Conteúdo exclusivo (bastidores, vídeos especiais)' },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 py-12">
            <main className="max-w-2xl mx-auto">
                <div className="space-y-4 my-8 text-center">
                    <h1 className="text-yellow-500 text-4xl font-bold">JUNTE-SE À FURIA</h1>
                    <h2 className="text-white text-2xl">Complete seu cadastro para se tornar um Furioso</h2>
                </div>

                <form onSubmit={handleSubmit} className="bg-neutral-950/50 p-8 rounded-lg border border-yellow-400/20">
                    <div className="space-y-8">
                        {/* Seção de Dados Pessoais */}
                        <div className="border-b border-yellow-500/10 pb-8">
                            <h2 className="text-xl font-bold text-yellow-500 mb-4">DADOS PESSOAIS</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
                                        Nome Completo *
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.fullName ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                                </div>

                                <div>
                                    <label htmlFor="cpf" className="block text-sm font-medium text-white mb-1">
                                        CPF *
                                    </label>
                                    <input
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        placeholder="000.000.000-00"
                                        maxLength={14}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.cpf ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.cpf && <p className="mt-1 text-sm text-red-500">{errors.cpf}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.email ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                                        Telefone *
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(00) 00000-0000"
                                        maxLength={15}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.phone ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Seção de Endereço */}
                        <div className="border-b border-yellow-500/10 pb-8">
                            <h2 className="text-xl font-bold text-yellow-500 mb-4">ENDEREÇO</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="street" className="block text-sm font-medium text-white mb-1">
                                        Logradouro *
                                    </label>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.street ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                                </div>

                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium text-white mb-1">
                                        Número *
                                    </label>
                                    <input
                                        id="number"
                                        name="number"
                                        type="text"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.number ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.number && <p className="mt-1 text-sm text-red-500">{errors.number}</p>}
                                </div>

                                <div>
                                    <label htmlFor="complement" className="block text-sm font-medium text-white mb-1">
                                        Complemento
                                    </label>
                                    <input
                                        id="complement"
                                        name="complement"
                                        type="text"
                                        value={formData.complement}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white/5 px-4 py-2 text-white border border-yellow-400/20 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="neighborhood" className="block text-sm font-medium text-white mb-1">
                                        Bairro *
                                    </label>
                                    <input
                                        id="neighborhood"
                                        name="neighborhood"
                                        type="text"
                                        value={formData.neighborhood}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.neighborhood ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.neighborhood && <p className="mt-1 text-sm text-red-500">{errors.neighborhood}</p>}
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                                        Cidade *
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.city ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-white mb-1">
                                        Estado *
                                    </label>
                                    <select
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.state ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    >
                                        <option value="">Selecione</option>
                                        {brazilianStates.map(state => (
                                            <option key={state.value} value={state.value} className="text-gray-900">
                                                {state.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                                </div>

                                <div>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-white mb-1">
                                        CEP *
                                    </label>
                                    <input
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        placeholder="00000-000"
                                        maxLength={9}
                                        className={`block w-full rounded-md bg-white/5 px-4 py-2 text-white border ${errors.zipCode ? 'border-red-500' : 'border-yellow-400/20'} focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none`}
                                    />
                                    {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Seção de Interesses */}
                        <div className="border-b border-yellow-500/10 pb-8">
                            <h2 className="text-xl font-bold text-yellow-500 mb-4">INTERESSES</h2>

                            <div className="space-y-4">
                                <p className="text-sm text-white mb-3">Selecione os esports que você acompanha:</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['Counter-Strike 2', 'Valorant', 'League of Legends', 'Rainbow Six', 'Rocket League', 'Furia FC', 'Outros'].map(game => (
                                        <div key={game} className="flex items-center">
                                            <input
                                                id={game}
                                                name="interests"
                                                type="checkbox"
                                                value={game}
                                                //@ts-ignore
                                                checked={formData.interests.includes(game)}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-yellow-400/20 text-yellow-500 focus:ring-yellow-500"
                                            />
                                            <label htmlFor={game} className="ml-3 text-sm text-white">
                                                {game === 'Counter-Strike 2' && 'Counter-Strike 2'}
                                                {game === 'Valorant' && 'Valorant'}
                                                {game === 'League of Legends' && 'League of Legends'}
                                                {game === 'Rainbow Six' && 'Rainbow Six'}
                                                {game === 'Rocket League' && 'Rocket League'}
                                                {game === 'Furia FC' && 'Furia FC'}
                                                {game === 'Outros' && 'Outros'}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <p className="text-sm text-white mb-3">Selecione os tipos de eventos que deseja receber informações:</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {eventOptions.map(({ value, label }) => (
                                        <div key={value} className="flex items-start space-x-3">
                                            <input
                                                id={value}
                                                name="events"
                                                type="checkbox"
                                                value={value}
                                                //@ts-ignore
                                                checked={formData.events.includes(value)}
                                                onChange={handleCheckboxChange}
                                                className="mt-1 h-4 w-4 rounded border-yellow-400/20 text-yellow-500 focus:ring-yellow-500"
                                            />
                                            <label htmlFor={value} className="text-sm text-white leading-5">
                                                {label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-yellow-500/10 pb-8">
                            <h2 className="text-xl font-bold text-yellow-500 mb-4">AVATAR</h2>

                            <div className="flex items-center gap-8">
                                {/* Preview do Avatar */}
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full border-2 border-yellow-500/30 overflow-hidden">
                                        {formData.avatar ? (
                                            <img
                                                src={formData.avatar}
                                                alt="Preview do Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-yellow-500/10 flex items-center justify-center">
                                                <PhotoIcon className="w-8 h-8 text-yellow-500/50" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                        <label className="cursor-pointer text-yellow-500 text-sm font-medium">
                                            Alterar
                                            <input
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                onChange={(e) => e.target.files?.[0] && handleAvatarChange(e.target.files[0])}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Instruções */}
                                <div className="flex-1">
                                    <p className="text-sm text-white mb-2">
                                        Escolha uma foto para o seu perfil Furioso
                                    </p>
                                    <div className="text-xs text-gray-400 space-y-1">
                                        <p>• Formatos aceitos: JPG, PNG</p>
                                        <p>• Tamanho máximo: 2MB</p>
                                        <p>• Dimensões recomendadas: 400x400px</p>
                                    </div>
                                    {errors.avatar && <p className="mt-2 text-sm text-red-500">{errors.avatar}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Seção de Documentos */}
                        <div className="pb-8">
                            <h2 className="text-xl font-bold text-yellow-500 mb-4">DOCUMENTOS</h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="document" className="block text-sm font-medium text-white mb-2">
                                        Upload de Documento (RG ou CNH) *
                                        <span className="block text-xs text-gray-400 mt-1">
                                            Envie a foto ou scan do seu documento oficial
                                        </span>
                                        <span className="block text-xs text-gray-400">
                                            O documento deve estar legível e conter seu CPF e nome completo
                                        </span>
                                    </label>
                                    <div
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        className={`mt-1 flex justify-center px-6 py-8 border-2 ${isDragging ? 'border-yellow-500 bg-white/10' : errors.document ? 'border-red-500' : 'border-dashed border-yellow-500/30'} rounded-md bg-white/5 transition-colors duration-200`}
                                    >
                                        <div className="space-y-1 text-center">
                                            {formData.document ? (
                                                <>
                                                    <p className="text-white">Documento anexado com sucesso!</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, document: null }))}
                                                        className="text-sm text-yellow-500 hover:text-yellow-400"
                                                    >
                                                        Trocar arquivo
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <PhotoIcon className="mx-auto h-8 w-8 text-yellow-500/50" />
                                                    <div className="flex text-sm text-gray-400">
                                                        <label
                                                            htmlFor="document-upload"
                                                            className="relative cursor-pointer rounded-md font-medium text-yellow-500 hover:text-yellow-500/80 focus-within:outline-none"
                                                        >
                                                            <span>Enviar arquivo</span>
                                                            <input
                                                                id="document-upload"
                                                                name="document"
                                                                type="file"
                                                                accept=".jpg,.jpeg,.png"
                                                                onChange={(e) => e.target.files && e.target.files[0] && handleFileChange(e.target.files[0])}
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                        <p className="pl-1">ou arraste até aqui</p>
                                                    </div>
                                                    <p className="text-xs text-gray-400">
                                                        PNG ou JPG até 5MB
                                                    </p>
                                                    {isDragging && (
                                                        <p className="text-xs text-yellow-500 mt-2">Solte o arquivo para enviar</p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {errors.document && <p className="mt-1 text-sm text-red-500">{errors.document}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Termos e Condições */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className={`h-4 w-4 rounded ${errors.terms ? 'border-red-500' : 'border-yellow-400/20'} text-yellow-500 focus:ring-yellow-500`}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-white">
                                    Concordo com os <a href="#" className="text-yellow-500 hover:underline">Termos de Uso</a> e <a href="#" className="text-yellow-500 hover:underline">Política de Privacidade</a> *
                                </label>
                                {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                type="button"
                                className="px-6 py-2 text-sm font-medium text-white bg-transparent border border-yellow-500/50 rounded-md hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                onClick={() => navigate("/login")}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={CompleteRegistration.loading}
                                className={`px-6 py-2 text-sm font-bold text-gray-900 bg-yellow-500 rounded-md hover:bg-yellow-500/90 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${CompleteRegistration.loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {CompleteRegistration.loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        VALIDANDO DOCUMENTO...
                                    </span>
                                ) : (
                                    'COMPLETAR CADASTRO'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Register;