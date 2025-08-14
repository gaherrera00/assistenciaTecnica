"use client";
import { useState } from "react";
import Link from "next/link";

export default function ChamadosUser() {
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-17">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                {/* Logo */}
                <div className="mb-6">
                    <img
                        src="/logo.png"
                        alt="Zelus Assistência Técnica"
                        className="w-44 mx-auto"
                    />
                </div>

                <h2 className="text-2xl font-medium text-gray-800 mb-5">
                    Realizar Chamado
                </h2>

                <form className="flex flex-col gap-3 text-left">
                    {/* Nome do usuário */}
                    <input
                        type="text"
                        id="nome"
                        placeholder="Nome do usuário"
                        required
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                    />

                    {/* Sala */}
                    <input
                        type="text"
                        id="sala"
                        placeholder="Sala"
                        required
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                    />

                    {/* ID da máquina */}
                    <input
                        type="text"
                        id="idMaquina"
                        placeholder="ID da máquina"
                        required
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                    />

                    {/* Sintoma principal */}
                    <input
                        type="text"
                        id="sintoma"
                        placeholder="Sintoma principal"
                        required
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                    />

                    {/* Detalhes adicionais */}
                    <textarea
                        id="detalhes"
                        placeholder="Detalhes adicionais"
                        rows={3}
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black resize-none"
                    />

                    {/* Início / Há quanto tempo */}
                    <input
                        type="text"
                        id="inicio"
                        placeholder="Início / Há quanto tempo"
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                    />

                    {/* Frequência / Condições */}
                    <input
                        type="text"
                        id="frequencia"
                        placeholder="Frequência / Condições"
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black"
                    />

                    {/* Histórico / Possível causa */}
                    <textarea
                        id="historico"
                        placeholder="Histórico / Possível causa"
                        rows={3}
                        className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent text-black resize-none"
                    />

                    {/* Upload múltiplo */}
                    <input
                        type="file"
                        id="fotos"
                        name="fotos"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="fotos"
                        className="p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors text-center"
                    >
                        Anexar imagens
                    </label>

                    {/* Miniaturas */}
                    {previews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 justify-center">
                            {previews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Pré-visualização ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                />
                            ))}
                        </div>
                    )}

                    {/* Botão de envio */}
                    <button
                        type="submit"
                        className="mt-4 p-3 bg-[#084438] text-white border-none rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors w-full"
                    >
                        Enviar Chamado
                    </button>
                </form>
            </div>
        </div>
    );
}
