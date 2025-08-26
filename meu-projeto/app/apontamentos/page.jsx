import Link from "next/link";

export default function Apontamento() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-15">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
                <div className="mb-6 text-center">
                    <img
                        src="/logo.png"
                        alt="Zelus Assistência Técnica"
                        className="w-44 mx-auto"
                    />
                </div>

                <h2 className="text-2xl font-medium text-gray-800 mb-5 text-center">
                    Apontamentos
                </h2>

                <form className="flex flex-col gap-4">
                    {/* Campo mensagem */}
                    <div>
                        <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-700 mb-1">
                            Mensagem
                        </label>
                        <textarea
                            id="mensagem"
                            placeholder="Digite seu apontamento..."
                            required
                            rows={4}
                            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Campo começo */}
                    <div>
                        <label htmlFor="comeco" className="block text-sm font-semibold text-gray-700 mb-1">
                            Começo
                        </label>
                        <input
                            type="datetime-local"
                            id="comeco"
                            required
                            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Campo fim */}
                    <div>
                        <label htmlFor="fim" className="block text-sm font-semibold text-gray-700 mb-1">
                            Fim
                        </label>
                        <input
                            type="datetime-local"
                            id="fim"
                            required
                            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Campo duração */}
                    <div>
                        <label htmlFor="duracao" className="block text-sm font-semibold text-gray-700 mb-1">
                            Duração
                        </label>
                        <input
                            type="text"
                            id="duracao"
                            placeholder="Ex: 2h 30m"
                            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Campo criação */}
                    <div>
                        <label htmlFor="criado_em" className="block text-sm font-semibold text-gray-700 mb-1">
                            Criação
                        </label>
                        <input
                            type="datetime-local"
                            id="criado_em"
                            className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                        />
                    </div>

                    {/* Botão */}
                    <button
                        type="submit"
                        className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition-colors mt-2"
                    >
                        Enviar Apontamento
                    </button>
                </form>
            </div>
        </div>
    );
}


