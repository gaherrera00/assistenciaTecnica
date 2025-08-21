import express from 'express';
const app = express();
import cors from 'cors';
const port = 3001;

import authRotas from './routes/authRotas.js';
import chamadoRotas from './routes/chamadoRotas.js';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(201).send('<h1> API de Chamados.</h1>')
});

app.use('/auth', authRotas);
app.use('/chamado', chamadoRotas);

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