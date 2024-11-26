// Importa o módulo express para criar a aplicação web
import express from "express";
import routes from './src/routes/postRoutes.js'

// Cria a aplicação express
const app = express();
app.use(express.static('uploads'))
routes(app)

// Habilita o parseamento de dados JSON na requisição
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor online...');
});
