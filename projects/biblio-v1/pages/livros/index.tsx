import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line, RiAddCircleLine, RiExternalLinkLine } from 'react-icons/ri';
import { BiblioNavMenu } from '../../components/BiblioNavMenu';
import { db } from '../../infra/data/db';
import { Livro } from '../../models/Livro';

interface PageProps {
  livros: Livro[];
}

export async function getServerSideProps(context: any): Promise<{props: PageProps}> {
  
  const livros = await db.livro.findMany({
    include: {
      editora: {
      }
    }
  });

  return {
    props: {
      livros: livros.map(livro => ({
        id: Number(livro.id),
        titulo: livro.titulo,
        editora: {
          id: Number(livro.editoraId),
          nome: livro.editora.nome
        }
      }))
    }
  }
}

export default function PageLivros({
  livros
}: PageProps) {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Livros</title>
      </Head>
      <BiblioNavMenu
        page='livros'
        buttons={[
          {title: 'Adicionar por página', rightIcon: <RiExternalLinkLine />, click: adicionarPorPagina}
        ]}
      >
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th style={{width:'150px', minWidth:'150px', maxWidth:'150px'}}>Código</th>
              <th style={{width:'50%'}}>Título</th>
              <th style={{width:'40%'}}>Editora</th>
              <th style={{width:'64px', minWidth:'64px'}}></th>
            </tr>
          </thead>
          <tbody>
            {livros?.map(livro => {
              return (
                <tr key={`livro-${livro.id}`}>
                  <td>{livro.id}</td>
                  <td>{livro.titulo}</td>
                  <td>{livro.editora?.nome}</td>
                  <td style={{display:'flex', justifyContent:'space-between', alignItems:'center', alignContent:'center'}}>
                    <FiEdit size='24px' color='gray' style={{cursor:'pointer'}} onClick={() => editar(livro)} />
                    <RiDeleteBin5Line size='26px' color='red' style={{cursor:'pointer'}} onClick={() => excluir(livro)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </BiblioNavMenu>
    </>
  );

  function adicionarPorPagina() {
    router.push('/livros/adicionar');
  }

  function excluir(livro: Livro) {
    if (!confirm(`Confirma a exclusão do livro ${livro.titulo}?`)) return;
    fetch(`/api/livros/${livro.id}`, {
      method: 'DELETE'
    })
    .finally(() => {
      router.reload();
    });
  }

  function editar(livro: Livro) {
    router.push(`/livros/editar/${livro.id}`);
  }
}
