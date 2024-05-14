import express from 'express';
import fs from 'fs';
import axios from 'axios';
import csv from 'csv-parser';

const app = express();

app.use(express.json());

// Função para ler o arquivo CSV
function readCsv(filePath) {
    return new Promise((resolve, reject) => {
        const dados = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                //console.log(row);
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
// async function sendApi(dados, urlApi) {
//     try {
//         const resposta = await axios.post(urlApi, dados);
//         console.log('Dados enviados com sucesso:', resposta.data);
//     } catch (erro) {
//         console.error('Erro ao enviar os dados via API:', erro);
//     }
// }

// Caminho do arquivo CSV e URL da API
const filePath = 'teste.csv';
const urlApi = 'https://message-template-api.omni.chat/v1/templates/LqXKSR78Kb';

// Ler o arquivo CSV e enviar os dados via API
readCsv(filePath)
    .then((dados) => {
        console.log((dados[0].coluna3));
        //sendApi(dados, urlApi);
    })
    .catch((erro) => {
        console.error('Erro ao ler o arquivo CSV:', erro);
    });

app.listen(3333);
