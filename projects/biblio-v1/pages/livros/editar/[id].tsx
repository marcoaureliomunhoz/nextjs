import React from 'react';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RiSaveLine } from 'react-icons/ri';
import { BiblioNavMenu } from '../../../components/BiblioNavMenu';
import { db } from '../../../infra/data/db';
import { Editora } from '../../../models/Editora';
import { Livro } from '../../../models/Livro';

type PageParams = {
  id: string;
}

type PageProps = {
  editoras: Editora[];
  livro: Livro;
}

export async function getServerSideProps({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<PageProps>> {

  const editoras = await db.editora.findMany();
  const livro = await db.livro.findUnique({
    where: {
      id: Number(params?.id)
    }
  })

  return {
    props: {
      editoras: editoras.map(editora => ({
        id: Number(editora.id),
        nome: editora.nome
      })),
      livro: {
        id: Number(livro?.id),
        titulo: livro?.titulo || '',
        editoraId: Number(livro?.editoraId)
      }
    }
  }
}

export default function PageEditarLivro({
  editoras,
  livro
}: PageProps) {

  const router = useRouter();
  const [tituloLivro, setTituloLivro] = React.useState<string>(livro?.titulo);
  const [idEditora, setIdEditora] = React.useState<number>(livro?.editoraId || 0);

    return (
    <>
      <Head>
        <title>Adicionar Livro</title>
      </Head>
      <BiblioNavMenu
        buttons={[
          {title: 'Salvar', rightIcon: <RiSaveLine />, click: salvar}
        ]}
      >
        <div style={{display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
            <label style={{color:'#333'}}>Título</label>
            <input
              type='text'
              style={{flex:'1', padding:'8px', border:'1px solid #aaa'}}
              value={tituloLivro}
              onChange={(e) => setTituloLivro(e.target.value)}
            />
          </div>
          <div style={{display:'flex', flexDirection:'column', flex:'1', marginTop:'10px'}}>
            <label style={{color:'#333'}}>Editora</label>
            <select
              style={{flex:'1', padding:'8px', border:'1px solid #aaa', color: !idEditora ? '#888' : '#000'}}
              onChange={(e) => setIdEditora(+e.target.value)}
              defaultValue={idEditora}
            >
              <option value={0} style={{color:'#888'}}>Nenhum</option>
              {editoras.map(editora => {
                return (
                  <option key={`editora-${editora.id}`} value={editora.id} style={{color:'#000'}}>{editora.nome}</option>
                )
              })}
            </select>
          </div>
        </div>
      </BiblioNavMenu>
    </>
  );

  async function salvar() {
    if (!livro) return;
    if (!tituloLivro) {
      return alert('Informe o título do livro!');
    }
    if (!idEditora) {
      return alert('Informe a editora do livro!');
    }
    fetch(`/api/livros/${livro.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: tituloLivro,
        editoraId: idEditora
      })
    }).then(async response => {
      router.back();
    });
  }
}
