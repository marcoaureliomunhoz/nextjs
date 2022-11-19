import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const editora1 = await prisma.editora.create({
        data: {
            id: 1,
            nome: 'Editora 1',
            livros: {
              create: [
                {
                  id: 1,
                  titulo: 'Livro 1'
                },
                {
                  id: 2,
                  titulo: 'Livro 2'
                }
              ]
            }
        }
    });

    const editora2 = await prisma.editora.create({
      data: {
          id: 2,
          nome: 'Editora 2',
          livros: {
            create: [
              {
                id: 3,
                titulo: 'Livro 3'
              },
            ]
          }
      }
  });
}

seed();