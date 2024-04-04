import express from "express";
import sql from 'mssql'
import { sqlConfig } from "./server.js";

const pool = new sql.ConnectionPool(sqlConfig);
await pool.connect();
const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
      const { recordset } = await pool.query`select * from Registro`;
      return res.status(200).json(recordset);
    } catch {
      return res.status(501).json('Erro ao buscar os registros');
    }
  });


routes.post('/Agendamento/novo', async (req, res) => {
   try {
     const {reserva, data , horario ,descricao } = req.body;
     await pool.query`insert into registro values (${reserva}, ${data},${horario},${descricao})`;
     return res.status(200).json('Registro cadastrado com sucesso');
   } catch(error) {
       console.log(error)
     return res.status(501).json('Erro ao cadastrar o registro');
   }
 });

 routes.delete('/Agendamento/excluir/:id', async (req, res)=>{
  try{ 
      const { id } = req.params
      const { descricao, preco } = req.body
      await pool.query`delete from Registro where id=${id}`
      return res.status(201).json('Registro excluido com sucesso')
  
      }
      catch(error){
          console.log(error)
          return res.status(501).json('Erro ao excluir o registro')
      }
     
})


export default routes



