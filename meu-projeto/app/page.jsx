export default function Home() {
  return (
    <main className="bg-secondary text-black">
      {/* HERO */}
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center"
        style={{ backgroundImage: "url('/bg-lavadora.jpg')" }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Texto */}
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold">
              ASSISTÊNCIA TÉCNICA{" "}
              <span className="text-primary">ONLINE</span> PARA ESTUDANTES
              <br />
              <span className="text-primary">DO SENAI</span>
            </h1>
            <p className="mt-4 text-lg">Precisa de ajuda? Contate-nos</p>

            <form className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-3 rounded-md text-black"
              />
              <input
                type="tel"
                placeholder="Telefone"
                className="w-full p-3 rounded-md text-black"
              />
              <button className="w-full bg-gradient-to-r from-[#084438] to-green-700 p-3 rounded-md font-bold text-white">
                FAZER CHAMADO
              </button>
            </form>
          </div>

          {/* Imagem */}
          <div className="mt-8 md:mt-0">
            <img src="wrench.mp4" alt="" className="max-w-sm" />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-gradient-to-r from-[#084438] to-green-700 py-12 text-secondary">
        <div className="container mx-auto grid md:grid-cols-4 gap-6">
          {[
            {
              icon: "location.png",
              title: "Atendimento no local",
              desc: "Atendimento realizado no local, sem custos adicionais.",
            },
            {
              icon: "wrench.png",
              title: "Profissionais Qualificados",
              desc: "Equipe com mais de 15 anos de experiência.",
            },
            {
              icon: "dollar.png",
              title: "Preços Justos",
              desc: "Pagamentos facilitados e preços acessíveis.",
            },
            {
              icon: "verify.png",
              title: "Garantia",
              desc: "Garantia de até 1 ano na manutenção.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-secondary p-6 rounded-lg text-white text-center"
            >
              <div className="w-15 ml-32 mb-7"><img src={b.icon} /></div>
              <h3 className="mt-3 font-bold">{b.title}</h3>
              <p className="mt-2 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE / INSTITUCIONAL */}
      <section className="bg-secondary py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ASSISTÊNCIA TÉCNICA{" "}
            <span className="text-primary">ESPECIALISTA</span> EM {" "}
            <span className="text-primary">COMPUTADORES</span>
          </h2>
          <p className="mb-6">
            Cansado(a) de ter seu computador quebrado e perder tempo e dinheiro
            para consertá-lo? Nós resolvemos rápido e com garantia.
          </p>
          <button className="bg-primary text-black px-6 py-3 rounded-md font-bold">
            SOLICITE SEU ORÇAMENTO
          </button>
        </div>
      </section>

      {/* MARCAS */}
      <section className="bg-gradient-to-r from-[#084438] to-green-700 py-12 text-secondary">
        <div className="flex items-center justify-center gap-6">
          <span className="font-bold text-white">ESPECIALIZADA</span>
          <img src="logodell.png" alt="DELL" className="w-25" />
          <span className="font-bold text-white">ESPECIALIZADA</span>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-8">
            O que os clientes falam sobre {" "}
            <span className="text-primary">nós</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Caio",
                text: "Galera, veloz pela agilidade no atendimento, técnico super gente boa.",
              },
              {
                name: "Taina",
                text: "Deu tudo certo com a minha máquina, muito obrigada pelo atendimento.",
              },
              {
                name: "Thais",
                text: "Atendimento super rápido e eficaz, obrigada pela atenção.",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="bg-white shadow-xl/10 text-secondary p-6 rounded-lg"
              >
                <strong>{d.name}</strong>
                <p className="mb-4 italic">"{d.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
