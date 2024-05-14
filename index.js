import express from "express";

const app = express();

app.use(express.json());

const fs = require('fs');
const axios = require('axios');
const csv = require('csv-parser');

// Função para ler o arquivo CSV
function lerArquivoCSV(caminhoArquivo) {
    const dados = [];
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(caminhoArquivo)
            .pipe(csv())
            .on('data', (row) => {
                dados.push(row);
            })
            .on('end', () => {
                resolve(dados);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

// Função para enviar os dados via API
async function enviarDadosViaAPI(dados, urlDaAPI) {
    try {
        const resposta = await axios.post(urlDaAPI, dados);
        console.log('Dados enviados com sucesso:', resposta.data);
    } catch (erro) {
        console.error('Erro ao enviar os dados via API:', erro);
    }
}

// Caminho do arquivo CSV e URL da API
const caminhoArquivoCSV = 'dados.csv';
const urlDaAPI = 'http://sua-api.com/endpoint';

// Ler o arquivo CSV e enviar os dados via API ttt
lerArquivoCSV(caminhoArquivoCSV)
    .then((dados) => {
        enviarDadosViaAPI(dados, urlDaAPI);
    })
    .catch((erro) => {
        console.error('Erro ao ler o arquivo CSV:', erro);
    });



app.listen(3333);