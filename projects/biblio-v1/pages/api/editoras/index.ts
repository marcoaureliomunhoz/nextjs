// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../infra/data/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    if (req.method === 'POST') {
      const id = new Date().getTime();
      const result = await db.editora.create({
        data: {
          id: id,
          nome: req.body.nome
        }
      });

      return res.status(200).json({
        id: Number(result.id)
      });
    }
    
    if (req.method === 'GET') {
      const editoras = await db.editora.findMany();
      return res.status(200).json({
        data: editoras.map(editora => ({
          id: Number(editora.id),
          nome: editora.nome
        }))
      });
    }

    return res.status(404);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500);
  }
}
