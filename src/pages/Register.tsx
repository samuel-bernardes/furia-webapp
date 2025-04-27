import { useState } from 'react';
import { PhotoIcon } from "@heroicons/react/24/outline";
import { brazilianStates } from '../mocks/brazilianStates';
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
        document: null,
        terms: false
    });

    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Máscaras
    const applyMask = (value: string, mask: string) => {
        let maskedValue = '';
        let valueIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            if (valueIndex >= value.length) break;

            if (mask[i] === '9') {
                // Apenas números
                if (/[0-9]/.test(value[valueIndex])) {
                    maskedValue += value[valueIndex++];
                }
            } else if (mask[i] === 'A') {
                // Apenas letras
                if (/[a-zA-Z]/.test(value[valueIndex])) {
                    maskedValue += value[valueIndex++];
                }
            } else {
                // Caractere fixo da máscara
                maskedValue += mask[i];
                if (value[valueIndex] === mask[i]) {
                    valueIndex++;
                }
            }
        }

        return maskedValue;
    };

    const maskCPF = (value: string) => {
        return applyMask(value, '999.999.999-99');
    };

    const maskPhone = (value: string) => {
        if (value.length <= 14) {
            return applyMask(value, '(99) 9999-9999');
        } else {
            return applyMask(value, '(99) 99999-9999');
        }
    };

    const maskCEP = (value: string) => {
        return applyMask(value, '99999-999');
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
                type === 'file' ? files[0] :
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

    // Validações
    const validateForm = () => {
        const newErrors: any = {};

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

        setIsSubmitting(true);

        try {
            // Simular envio para API
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Dados enviados:', formData);
            setSubmitSuccess(true);
        } catch (error) {
            console.error('Erro ao enviar:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-neutral-950 py-12 flex items-center justify-center">
                <div className="bg-neutral-950/50 p-8 rounded-lg border border-yellow-400/20 text-center max-w-md">
                    <h2 className="text-yellow-500 text-2xl font-bold mb-4">CADASTRO CONCLUÍDO!</h2>
                    <p className="text-white mb-6">Seu cadastro foi realizado com sucesso. Bem-vindo à FURIA!</p>
                    <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2 text-sm font-bold text-gray-900 bg-yellow-500 rounded-md hover:bg-yellow-500/90"
                    >
                        VOLTAR
                    </button>
                </div>
            </div>
        );
    }

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
                                    {['cs2', 'valorant', 'lol', 'r6', 'rocket-league', 'others'].map(game => (
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
                                                {game === 'cs2' && 'Counter-Strike 2'}
                                                {game === 'valorant' && 'Valorant'}
                                                {game === 'lol' && 'League of Legends'}
                                                {game === 'r6' && 'Rainbow Six'}
                                                {game === 'rocket-league' && 'Rocket League'}
                                                {game === 'others' && 'Outros'}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <p className="text-sm text-white mb-3">Selecione os tipos de eventos que deseja receber informações:</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['online', 'presencial', 'campeonatos', 'meetups'].map(event => (
                                        <div key={event} className="flex items-center">
                                            <input
                                                id={event}
                                                name="events"
                                                type="checkbox"
                                                value={event}
                                                //@ts-ignore
                                                checked={formData.events.includes(event)}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-yellow-400/20 text-yellow-500 focus:ring-yellow-500"
                                            />
                                            <label htmlFor={event} className="ml-3 text-sm text-white">
                                                {event === 'online' && 'Eventos Online'}
                                                {event === 'presencial' && 'Eventos Presenciais'}
                                                {event === 'campeonatos' && 'Campeonatos'}
                                                {event === 'meetups' && 'Meetups com jogadores'}
                                            </label>
                                        </div>
                                    ))}
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
                                        <span className="block text-xs text-gray-400 mt-1">O nome do arquivo deve conter seu nome completo</span>
                                    </label>
                                    <div className={`mt-1 flex justify-center px-6 py-8 border-2 ${errors.document ? 'border-red-500' : 'border-dashed border-yellow-500/30'} rounded-md bg-white/5`}>
                                        <div className="space-y-1 text-center">
                                            {formData.document ? (
                                                <>
                                                    {/* @ts-ignore */}
                                                    <p className="text-white">{formData.document.name}</p>
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
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                        <p className="pl-1">ou arraste até aqui</p>
                                                    </div>
                                                    <p className="text-xs text-gray-400">
                                                        PNG, JPG, PDF até 10MB
                                                    </p>
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
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 text-sm font-bold text-gray-900 bg-yellow-500 rounded-md hover:bg-yellow-500/90 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'ENVIANDO...' : 'COMPLETAR CADASTRO'}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Register;