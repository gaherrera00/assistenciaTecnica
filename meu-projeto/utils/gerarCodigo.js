export function gerarRA(nomeCompleto, dataInicio, dataFim) {
  const anoInicio = new Date(dataInicio).getFullYear().toString().slice(-2);
  const anoFim = new Date(dataFim).getFullYear().toString().slice(-2);
  let nomeNum = 0;
  for (let i = 0; i < nomeCompleto.length; i++) {
    nomeNum += nomeCompleto.charCodeAt(i);
  }
  const ultimos4 = nomeNum.toString().slice(-4).padStart(4, "0");
  return `${anoInicio}${anoFim}${ultimos4}`;
}

export function gerarSenha(tamanho = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    senha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return senha;
}