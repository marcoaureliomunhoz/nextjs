import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RiSaveLine } from 'react-icons/ri';
import { BiblioNavMenu } from '../../components/BiblioNavMenu';
import { db } from '../../infra/data/db';
import { Editora } from '../../models/Editora';

interface PageProps {
  editoras: Editora[];
}

export async function getServerSideProps(context: any): Promise<{props: PageProps}> {
  
  const editoras = await db.editora.findMany();

  return {
    props: {
      editoras: editoras.map(editora => ({
        id: Number(editora.id),
        nome: editora.nome
      }))
    }
  }
}

export default function PageAdicionarLivro({
  editoras
}: PageProps) {

  const router = useRouter();
  const [tituloLivro, setTituloLivro] = React.useState<string>('');
  const [idEditora, setIdEditora] = React.useState<number>(0);

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
    if (!tituloLivro) {
      return alert('Informe o título do livro!');
    }
    if (!idEditora) {
      return alert('Informe a editora do livro!');
    }
    fetch(`/api/livros`, {
      method: 'POST',
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
