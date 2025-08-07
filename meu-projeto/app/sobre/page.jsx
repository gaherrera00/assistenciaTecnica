export default function SobreNos() {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-8">
          Sobre Nós
        </h2>

        <p className="text-lg leading-relaxed mb-6">
          A <strong>Zelus Assistência Técnica</strong> nasceu nos corredores do
          SENAI, entre ferramentas improvisadas, café forte e muita curiosidade
          tecnológica.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Tudo começou com <strong>Gabriel</strong>, <strong>Gustavo</strong> e{" "}
          <strong>Richard</strong> — três amigos apaixonados por tecnologia. No
          início, consertávamos os computadores da escola, os notebooks dos
          professores e até os controles da televisão da sala de vídeo. A missão
          era simples: se não liga, a gente dá um jeito. Se liga, a gente
          melhora.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Foi num desses momentos — tentando reviver um computador que só dava
          tela azul e apitava como micro-ondas — que surgiu a ideia:{" "}
          <em>"E se a gente abrisse nossa própria assistência técnica?"</em>
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Assim nasceu a <strong>Zelus</strong>. O nome foi ideia do Richard
          (claro), que queria algo com impacto. "Zelus" parecia nome de herói
          digital — e ninguém sabia exatamente o que significava, então ficou
          sofisticado.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Desde então, crescemos, aprendemos, erramos (às vezes o problema era
          só o mouse desligado) e nos especializamos em oferecer{" "}
          <strong>
            suporte técnico de qualidade, com bom humor e atenção de verdade
          </strong>
          .
        </p>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            🚀 Missão
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            Oferecer soluções técnicas acessíveis, ágeis e de confiança, com um
            toque humano e criativo.
          </p>

          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            👨‍💻 Quem somos
          </h3>
          <ul className="text-lg list-none list-inside space-y-2 mb-6">
            <div className="flex justify-start">
              <img
                src="/gabriel.jpg"
                alt=""
                className="rounded-full max-w-25 max-h-25"
              />
              <li className="mt-6 ml-5">
                <strong>Gabriel</strong> – Especialista em hardware e improvisos
                (já abriu um PC com uma colher).
              </li>
            </div>
            <div className="flex justify-start mt-7 mb-7" >
              <img
                src="/richard.jpg"
                alt=""
                className="rounded-full max-w-25 max-h-25"
              />
              <li className="mt-6 ml-5">
                <strong>Richard</strong> – Comunicador criativo, transforma
                problemas técnicos em linguagem simples (e divertida).
              </li>
            </div>
            <div className="flex justify-start">
              <img
                src="/gustavo.jpg"
                alt=""
                className="rounded-full max-w-25 max-h-25"
              />
              <li className="mt-6 ml-5">
                <strong>Gustavo</strong> – Técnico detalhista, viciado em cabos
                grandoes, grossos, pretos, organizados e sistemas otimizados.
              </li>
            </div>
          </ul>

          <p className="text-lg leading-relaxed">
            Aqui na Zelus, a gente resolve problemas com seriedade, mas sem
            perder o bom humor. Se o seu computador está pedindo socorro, é só
            chamar a <strong>Zelus Assistência Técnica</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
