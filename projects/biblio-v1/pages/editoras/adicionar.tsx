import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RiSaveLine } from 'react-icons/ri';
import { BiblioNavMenu } from '../../components/BiblioNavMenu';

interface PageProps {
}

export default function PageAdicionarEditora({
}: PageProps) {

  const router = useRouter();
  const [nomeEditora, setNomeEditora] = React.useState<string>('');

    return (
    <>
      <Head>
        <title>Adicionar Editora</title>
      </Head>
      <BiblioNavMenu
        buttons={[
          {title: 'Salvar', rightIcon: <RiSaveLine />, click: salvar}
        ]}
      >
        <div style={{display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
            <label style={{color:'#333'}}>Nome</label>
            <input
              type='text'
              style={{flex:'1', padding:'8px', border:'1px solid #aaa'}}
              value={nomeEditora}
              onChange={(e) => setNomeEditora(e.target.value)}
            />
          </div>
        </div>
      </BiblioNavMenu>
    </>
  );

  async function salvar() {
    if (!nomeEditora) {
      return alert('Informe o nome da editora!');
    }
    fetch(`/api/editoras`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nomeEditora
      })
    }).then(async response => {
      router.back();
    });
  }
}
