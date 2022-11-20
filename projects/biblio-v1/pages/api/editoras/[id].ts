// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../infra/data/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    if (req.method === 'PUT') {
      const { id } = req.query;
      const result = await db.editora.update({
        data: {
          nome: req.body.nome
        },
        where: {
          id: Number(id)
        }
      });

      return res.status(200).json({
        id: Number(result.id)
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await db.editora.delete({
        where: {
          id: Number(id)
        }
      });

      return res.status(200).json({deleted: true});
    }

    return res.status(404);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500);
  }
}
