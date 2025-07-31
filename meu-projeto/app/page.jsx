import "./home.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6 max-w-screen-xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Zelus Assistência Técnica</h1>
        <p className="text-lg mt-2 text-gray-600">
          Tente resolver antes de abrir um chamado.
        </p>
      </header>

      {/* Grid com as 3 seções de erros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Seção Hardware */}
        <section className="mb-5">
          <h2 className="text-2xl font-semibold mb-4">
            🧱 Erros Físicos (Hardware)
          </h2>
          <ol className="list-decimal list-inside space-y-6 text-gray-800">
            <li>
              <h3 className="text-xl font-bold">🔌 Computador não liga</h3>
              <p>
                <strong>Causa comum:</strong> Fonte de energia com defeito, cabo
                solto ou queima de hardware.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Verifique se o cabo de energia está conectado corretamente.
                </li>
                <li>Teste outra tomada.</li>
                <li>
                  Tente ligar sem periféricos (teclado, mouse, impressora).
                </li>
                <li>
                  Teste a fonte de alimentação (com multímetro ou em outra
                  máquina).
                </li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold">🌡️ Superaquecimento</h3>
              <p>
                <strong>Causa comum:</strong> Poeira no cooler, pasta térmica
                seca, má ventilação.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Limpe o cooler e as ventoinhas com pincel ou ar comprimido.
                </li>
                <li>Troque a pasta térmica do processador a cada 2 anos.</li>
                <li>
                  Evite usar o notebook em superfícies que tampem a ventilação.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold">
                💾 HD/SSD fazendo barulhos ou lento
              </h3>
              <p>
                <strong>Causa comum:</strong> HD com setores defeituosos.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Windows: Use o chkdsk → <code>chkdsk /f /r</code> no CMD.
                </li>
                <li>Ubuntu: Use smartctl (via terminal) para verificar:</li>
                <pre className="bg-gray-200 rounded p-2 mt-1 text-sm font-mono">
                  {`sudo apt install smartmontools
sudo smartctl -a /dev/sdX`}
                </pre>
                <li>Faça backup imediato dos arquivos importantes.</li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold">
                🔊 Áudio não funciona (problema físico)
              </h3>
              <p>
                <strong>Causa comum:</strong> Conector P2 quebrado ou
                alto-falante danificado.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>Teste com fones de ouvido.</li>
                <li>
                  Verifique se o driver está ok (veja parte de software abaixo).
                </li>
                <li>Troque a peça, se necessário (em assistência).</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Seção Windows */}
        <section className="mb-5">
          <h2 className="text-2xl font-semibold mb-4">
            💻 Erros de Software – Windows
          </h2>
          <ol className="list-decimal list-inside space-y-6 text-gray-800">
            <li>
              <h3 className="text-xl font-bold">
                🧼 Lentidão ao iniciar ou travamentos
              </h3>
              <p>
                <strong>Causa comum:</strong> Programas em segundo plano, vírus,
                disco cheio.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Use Ctrl + Shift + Esc para abrir o Gerenciador de Tarefas e
                  desabilitar programas na inicialização.
                </li>
                <li>
                  Limpe arquivos com <code>cleanmgr</code> ou{" "}
                  <code>C:\Windows\Temp</code>.
                </li>
                <li>Instale e rode o Malwarebytes para verificar vírus.</li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold">
                🧩 Driver de áudio, vídeo ou Wi-Fi não funcionando
              </h3>
              <p>
                <strong>Causa comum:</strong> Driver desatualizado ou
                incompatível.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Vá em Gerenciador de Dispositivos, clique com o botão direito
                  no componente e clique em Atualizar driver.
                </li>
                <li>Baixe o driver no site oficial do fabricante.</li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold">💥 Tela azul (BSOD)</h3>
              <p>
                <strong>Causa comum:</strong> Driver mal instalado, falha de
                RAM, disco ou conflito de hardware.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Anote o erro (ex: MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL).
                </li>
                <li>Use o Windows Memory Diagnostic para testar a RAM.</li>
                <li>
                  Rode o <code>sfc /scannow</code> no CMD para corrigir arquivos
                  corrompidos.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Seção Linux */}
        <section className="mb-5">
          <h2 className="text-2xl font-semibold mb-4">
            🐧 Erros de Software – Ubuntu / Linux
          </h2>
          <ol className="list-decimal list-inside space-y-6 text-gray-800">
            <li>
              <h3 className="text-xl font-bold">
                📶 Wi-Fi não conecta ou some
              </h3>
              <p>
                <strong>Causa comum:</strong> Driver da placa de rede não
                reconhecido.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Descubra o modelo da placa: <code>lspci | grep Network</code>
                </li>
                <li>Atualize os drivers:</li>
              </ul>
              <pre className="bg-gray-200 rounded p-2 mt-1 text-sm font-mono">
                {`sudo apt update && sudo apt upgrade
sudo ubuntu-drivers devices
sudo ubuntu-drivers autoinstall`}
              </pre>
            </li>

            <li>
              <h3 className="text-xl font-bold">
                ❌ Erro de “package is broken” ao instalar algo
              </h3>
              <p>
                <strong>Causa comum:</strong> Pacotes quebrados no apt.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <pre className="bg-gray-200 rounded p-2 mt-1 text-sm font-mono">
                {`sudo apt --fix-broken install
sudo apt update && sudo apt upgrade`}
              </pre>
            </li>

            <li>
              <h3 className="text-xl font-bold">
                📦 Programa trava ou não abre
              </h3>
              <p>
                <strong>Causa comum:</strong> Incompatibilidade ou ausência de
                dependência.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Rode o programa pelo terminal para ver o erro:{" "}
                  <code>nome-do-programa</code>
                </li>
                <li>
                  Instale dependências que faltam com:{" "}
                  <code>sudo apt install -f</code>
                </li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold">
                🧱 Sistema travado (congelado)
              </h3>
              <p>
                <strong>Causa comum:</strong> Falta de memória ou bug gráfico.
              </p>
              <p>
                <strong>Solução:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Tente reiniciar a interface: <code>Ctrl + Alt + F2</code> para
                  entrar no terminal, depois <code>sudo reboot</code>
                </li>
                <li>Atualize o sistema:</li>
              </ul>
              <pre className="bg-gray-200 rounded p-2 mt-1 text-sm font-mono">
                {`sudo apt update && sudo apt upgrade`}
              </pre>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
