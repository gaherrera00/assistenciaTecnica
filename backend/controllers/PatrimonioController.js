import PDFDocument from 'pdfkit';
import fs from 'fs';
import { listarPatrimonios, obterPatrimonioPorId, criarPatrimonio, atualizarPatrimonio, excluirPatrimonio } from "../models/patrimonio.js";

const listarPatrimoniosController = async (req, res) => {
    try {
        const patrimonios = await listarPatrimonios();
        res.status(200).json(patrimonios);
    } catch (err) {
        console.error('Erro ao listar patrimonios: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar patrimonios. '});
    };
};

const obterPatrimonioPorIdController = async (req, res) => {
    try {
    patrimonios = await obterPatrimonioPorId(id);
    res.status(200).json(patrimonios);
    } catch (err) {
        console.error('Erro ao obter patrimonio por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter patrimonio por ID. '});
    };
};

const criarPatrimonioController = async (req, res) => {
    try {
        const { tipo_item, sala, data_aquisicao, observacoes } = req.body;

        const tiposValidos = ['Computador', 'Mesa', 'Cadeira', 'Impressora', 'Projetor', 'Outros'];

        if (!tipo_item || !tiposValidos.includes(tipo_item)) {
            res.status(400).json({ mensagem: `tipo_item é obrigatório e deve ser um dos seguintes: ${tiposValidos.join(', ')}` });
            return; // Interrompe a execução antes de criar o patrimônio
        }

        if (!sala || typeof sala !== 'string' || sala.trim().length < 2) {
            res.status(400).json({ mensagem: 'sala é obrigatória e deve ter pelo menos 2 caracteres.' });
            return;
        }

        if (data_aquisicao && isNaN(Date.parse(data_aquisicao))) {
            res.status(400).json({ mensagem: 'data_aquisicao inválida.' });
            return;
        }

        if (observacoes && typeof observacoes !== 'string') {
            res.status(400).json({ mensagem: 'observacoes deve ser texto.' });
            return;
        }

        // monta o objeto com os dados
        const patrimonioData = {
            tipo_item: tipo_item || null,
            sala: sala,
            data_aquisicao: data_aquisicao || null,
            observacoes: observacoes || null
        };

        const patrimonioId = await criarPatrimonio(patrimonioData);
        
        // Agora cria o PDF com base no patrimônio recém-criado
        const patrimonio = await obterPatrimonioPorId(patrimonioId);  // Recupera o patrimônio recém-criado

        // Cria o documento PDF
        const doc = new PDFDocument();

        // Configuração do PDF
        doc.fontSize(18).text('Relatório de Apontamento de Chamada', { align: 'center' });
        doc.fontSize(14).text(`Tipo de item: ${patrimonio.tipo_item}`);
        doc.text(`Sala: ${patrimonio.sala}`);
        doc.text(`Data de Aquisição: ${patrimonio.data_aquisicao || 'Não informada'}`);
        doc.text(`Observações: ${patrimonio.observacoes || 'Sem observações'}`);
        
        // Envia o PDF como resposta ao cliente
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=apontamento.pdf');
        doc.pipe(res); // O arquivo PDF será enviado como resposta
        doc.end(); // Finaliza o PDF
    
        res.status(201).json({ mensagem: 'Patrimonio criado com sucesso.', patrimonioId });
    } catch (err) {
        console.error('Erro ao criar patrimonio: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar patrimonio.' });
    }
};

const atualizarPatrimonioController = async (req, res) => {
    try {
        const patrimonioId = req.params.id;
        const { tipo_item, sala, data_aquisicao, observacoes } = req.body;

        const tiposValidos = ['Computador', 'Mesa', 'Cadeira', 'Impressora', 'Projetor', 'Outros'];
        
        if (tipo_item && !tiposValidos.includes(tipo_item)) {
            return res.status(400).json({ mensagem: `tipo_item inválido, deve ser um dos seguintes: ${tiposValidos.join(', ')}` });
        }

        if (sala && (typeof sala !== 'string' || sala.trim().length < 2)) {
            return res.status(400).json({ mensagem: 'sala inválida.' });
        }

        if (data_aquisicao && isNaN(Date.parse(data_aquisicao))) {
            return res.status(400).json({ mensagem: 'data_aquisicao inválida.' });
        }

        if (observacoes && typeof observacoes !== 'string') {
            return res.status(400).json({ mensagem: 'observacoes deve ser texto.' });
        }

        // monta o objeto com os dados
        const patrimonioData = {
            tipo_item: tipo_item || null,
            sala: sala,
            data_aquisicao: data_aquisicao || null,
            observacoes: observacoes || null
        };

          // Atualiza o patrimônio no banco de dados
          await atualizarPatrimonio(patrimonioId, patrimonioData);

          // Após a atualização, recupera o patrimônio atualizado para gerar o novo PDF
          const patrimonioAtualizado = await obterPatrimonioPorId(patrimonioId);
  
          if (!patrimonioAtualizado) {
              return res.status(404).json({ mensagem: 'Patrimônio não encontrado após atualização.' });
          }
  
          // Cria um novo documento PDF com as informações atualizadas
          const doc = new PDFDocument();
  
          // Configuração do PDF
          doc.fontSize(18).text('Relatório de Apontamento de Chamada Atualizado', { align: 'center' });
          doc.fontSize(14).text(`Tipo de item: ${patrimonioAtualizado.tipo_item}`);
          doc.text(`Sala: ${patrimonioAtualizado.sala}`);
          doc.text(`Data de Aquisição: ${patrimonioAtualizado.data_aquisicao || 'Não informada'}`);
          doc.text(`Observações: ${patrimonioAtualizado.observacoes || 'Sem observações'}`);
  
          // Envia o PDF com as informações atualizadas como resposta
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=apontamento_atualizado.pdf');
          doc.pipe(res);  // O PDF gerado será enviado na resposta
          doc.end();  // Finaliza o documento PDF
          
        res.status(201).json({ mensagem: 'Patrimonio alterado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar patrimonio: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar patrimonio.' });
    }
};

const excluirPatrimonioController = async (req, res) => {
    try {
        const patrimonioId = req.params.id;
        await excluirPatrimonio(patrimonioId);
        res.status(200).json({ mensagem: 'Patrimonio excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir patrimonio: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir patrimonio.' });
    }
};

export { listarPatrimoniosController, obterPatrimonioPorIdController, criarPatrimonioController, atualizarPatrimonioController, excluirPatrimonioController };