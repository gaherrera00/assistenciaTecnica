import CryptoJS from "crypto-js";

export function gerarRA(email) {
  // Remove espaços e converte para minúsculas
  const emailLimpo = email.trim().toLowerCase();
  
  // Gera um hash do email
  const hash = CryptoJS.MD5(emailLimpo).toString();
  
  // Extrai apenas números do hash
  const numeros = hash.replace(/\D/g, "");
  
  // Pega os primeiros 8 dígitos
  const raNumeros = numeros.slice(0, 8);
  
  // Se não tiver 8 dígitos, completa com zeros
  const raCompleto = raNumeros.padEnd(8, '0');
  
  return raCompleto;
}
