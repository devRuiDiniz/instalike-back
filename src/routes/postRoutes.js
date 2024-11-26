// Importa o módulo express para criar a aplicação web
import express from 'express';

// Importa o módulo multer para lidar com uploads de arquivos
import multer from 'multer';

// Importa as funções controladoras do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

// Configura o armazenamento para o multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  }
});

// Define a instância do multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de dados JSON na requisição
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para recuperar todos os posts (implementada em listarPosts)
  app.get('/posts', listarPosts);

  // Rota POST para criar um novo post (implementada em postarNovoPost)
  app.post('/posts', postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single('imagem') e chama a função uploadImagem)
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/uploads/:id', atualizarNovoPost)
};

// Exporta a função routes como módulo default
export default routes;