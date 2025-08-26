import express from 'express';
const app = express();
import cors from 'cors';
const port = 3001;

import authRotas from './routes/authRotas.js';
import chamadoRotas from './routes/chamadoRotas.js';
<<<<<<< Updated upstream
import poolRotas from './routes/poolRotas.js';
import apontamentoRotas from './routes/apontamentoRotas.js';
import acompChamadoRotas from './routes/acompChamadoRotas.js';
import patrimonioRotas from './routes/patrimonioRotas.js';
import salaRotas from './routes/salasRotas.js';
=======
import apontamentoRotas from './routes/apontamentoRotas.js';
>>>>>>> Stashed changes

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(201).send('<h1> API de Chamados.</h1>')
});

app.use('/auth', authRotas);
app.use('/chamado', chamadoRotas);
<<<<<<< Updated upstream
app.use('/pool', poolRotas);
app.use('/apontamento', apontamentoRotas);
app.use('/acompanhamento', acompChamadoRotas);
app.use('/patrimonio', patrimonioRotas);
app.use('/sala', salaRotas);
=======
app.use('/apontamento', apontamentoRotas);
>>>>>>> Stashed changes

app.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${3001}`);
});