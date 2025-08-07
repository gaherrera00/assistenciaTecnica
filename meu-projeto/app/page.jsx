"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6 max-w-full mx-auto">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-md p-4 mb-8 rounded-lg z-10">
        <ul className="flex space-x-6 justify-center">
          <li>
            <Link
              href="#hardware"
              className="text-emerald-600 hover:text-emerald-800 font-medium"
            >
              Hardware
            </Link>
          </li>
          <li>
            <Link
              href="#windows"
              className="text-emerald-600 hover:text-emerald-800 font-medium"
            >
              Windows
            </Link>
          </li>
          <li>
            <Link
              href="#linux"
              className="text-emerald-600 hover:text-emerald-800 font-medium"
            >
              Linux
            </Link>
          </li>
        </ul>
      </nav>

      <div className="space-y-16">
        {/* Hardware */}
        <section id="hardware">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-emerald-600">
            Problemas Comuns de Hardware
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Computador não liga</h3>
              <p className="text-gray-700 mt-2">
                Verifique se o cabo de energia está conectado corretamente e se
                a fonte está ligada.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Tela preta ao iniciar</h3>
              <p className="text-gray-700 mt-2">
                Teste com outro monitor ou cabo. Pode ser problema na GPU ou
                memória RAM.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">
                Teclado ou mouse não respondem
              </h3>
              <p className="text-gray-700 mt-2">
                Verifique se estão conectados corretamente. Teste em outra porta
                USB e reinicie o computador.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Superaquecimento</h3>
              <p className="text-gray-700 mt-2">
                Limpe as ventoinhas e verifique se o fluxo de ar está adequado.
                Use o computador em local ventilado.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">
                Ruídos estranhos vindos do gabinete
              </h3>
              <p className="text-gray-700 mt-2">
                Pode ser poeira acumulada ou ventoinha solta. Desligue o
                computador e faça uma inspeção visual com cuidado.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">
                HD ou SSD não reconhecido
              </h3>
              <p className="text-gray-700 mt-2">
                Verifique os cabos de dados e energia. Se for SSD novo, talvez
                precise inicializar no Gerenciamento de Disco.
              </p>
            </div>
          </div>
        </section>

        {/* Windows */}
        <section id="windows">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-emerald-600">
            Problemas Comuns no Windows
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Windows lento</h3>
              <p className="text-gray-700 mt-2">
                Verifique programas iniciando com o sistema, desinstale o que
                não usa e faça uma limpeza de disco.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Atualizações travadas</h3>
              <p className="text-gray-700 mt-2">
                Tente reiniciar o computador e execute o solucionador de
                problemas do Windows Update.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Erro na inicialização</h3>
              <p className="text-gray-700 mt-2">
                Utilize a Mídia de Instalação do Windows para acessar as opções
                de recuperação e tente reparar o sistema.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Tela azul (BSOD)</h3>
              <p className="text-gray-700 mt-2">
                Anote o código de erro exibido, atualize drivers e verifique a
                integridade do disco com o comando <code>chkdsk</code>.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Sem áudio</h3>
              <p className="text-gray-700 mt-2">
                Verifique se o volume está ativado, se os drivers estão
                atualizados e se o dispositivo de saída está correto.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Programas travando</h3>
              <p className="text-gray-700 mt-2">
                Atualize o software, feche outros programas em segundo plano e
                verifique por conflitos com o antivírus.
              </p>
            </div>
          </div>
        </section>

        {/* Linux */}
        <section id="linux">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-emerald-600">
            Problemas Comuns no Linux
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Sistema não inicializa</h3>
              <p className="text-gray-700 mt-2">
                Verifique se o GRUB está configurado corretamente e use um live
                CD para recuperação.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Wi-Fi não conecta</h3>
              <p className="text-gray-700 mt-2">
                Certifique-se de que o driver da placa esteja instalado. Tente
                comandos como <code>lspci</code> e <code>modprobe</code>.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">Permissões de arquivos</h3>
              <p className="text-gray-700 mt-2">
                Use <code>chmod</code> para alterar permissões e{" "}
                <code>chown</code> para mudar o dono dos arquivos, se
                necessário.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">
                Interface gráfica não carrega
              </h3>
              <p className="text-gray-700 mt-2">
                Verifique se o servidor gráfico está instalado corretamente (
                <code>gdm</code>, <code>lightdm</code>), e tente reiniciar com{" "}
                <code>startx</code> ou <code>systemctl restart gdm</code>.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">
                Erro de "pacote não encontrado"
              </h3>
              <p className="text-gray-700 mt-2">
                Atualize a lista de pacotes com <code>sudo apt update</code> ou
                equivalente. Verifique se o repositório está habilitado.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold">
                Pendrive ou HD externo não monta
              </h3>
              <p className="text-gray-700 mt-2">
                Verifique com <code>lsblk</code> ou <code>fdisk -l</code>. Use{" "}
                <code>mount</code> manualmente ou instale suporte a sistemas de
                arquivos como NTFS.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
