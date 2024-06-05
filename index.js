import express from 'express';
import fs from 'fs';
import axios from 'axios';
import readline from 'readline';

const app = express();

app.use(express.json());

// Função para processar o arquivo linha por linha e enviar via PUT
async function sendFileLines(filePath, url) {
    // Cria uma interface de leitura para o arquivo
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let headers;
    let isFirstLine = true;

    // Lê o arquivo linha por linha
    for await (const line of rl) {
        if (isFirstLine) {
            headers = line.split(','); 
            isFirstLine = false;
            continue;
        }

        const values = line.split(',');
        const jsonData = {};
        
        // Cria um objeto JSON usando os headers e os valores
        headers.forEach((header, index) => {
            jsonData[header] = values[index];
            jsonData["teams"] = {id: '165165', name: 'crm'};
        });

        // Dados API
        const options = {
            method: 'PUT',
            url: 'https://message-template-api.omni.chat/v1/templates/'+jsonData.id,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-api-key': 'b9HGQTH3DK2Vp07T3iHLM7DlTF9I0GL29fycQkzj',
                'x-api-secret': 'r:94ec25997e8ffe7458b357152430e5f0'
            },
            data: jsonData
        };

        try {
            // Envia a linha via PUT
            const response = await axios.request(options);
            console.log(jsonData, teams);
            console.log(`Linha enviada com sucesso: ${JSON.stringify(jsonData)}`);
            console.log(response.data);
        } catch (error) {
            console.error(`Erro ao enviar a linha: ${JSON.stringify(jsonData)}`, error);
        }
    }
}

// Caminho para o arquivo e URL para onde enviar as linhas
const filePath = 'teste.csv';
const url = 'https://exemplo.com/api';

// Chama a função para iniciar o processo
sendFileLines(filePath, url);

app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});
