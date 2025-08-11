import CryptoJS from "crypto-js";

const secretKeys = {
  tecnico: "TECNICODO0800",
  gerente: "GERENTEDO0800",
};

export function gerarCodigo(nome, funcao) {
  const chave = secretKeys[funcao];

  const hash = CryptoJS.HmacSHA256(nome.trim().toLowerCase(), chave).toString(
    CryptoJS.enc.Hex
  );
  const numeros = hash.replace(/\D/g, "").slice(0, 9);

  return `${numeros.slice(0, 3)}-${numeros.slice(3, 6)}-${numeros.slice(6, 9)}`;
}
