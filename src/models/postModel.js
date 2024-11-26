// Importa a função para conectar ao banco de dados
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfic.js";

// Estabelece a conexão com o banco de dados de forma assíncrona
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para recuperar todos os posts do banco
export async function getTodosPosts() {
    // Acessa o banco de dados 'imersao-instabyte'
    const db = conexao.db('imersao-instabyte');
    // Acessa a coleção 'posts'
    const colecao = db.collection('posts');
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabyte');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabyte');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id) 
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost} )
}