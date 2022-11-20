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
      const result = await db.livro.create({
        data: {
          id: id,
          titulo: req.body.titulo,
          editoraId: req.body.editoraId
        }
      });

      return res.status(200).json({
        id: Number(result.id)
      });
    }

    return res.status(404);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500);
  }
}
