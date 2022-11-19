import Link from 'next/link';
import React from 'react';

export default function HomePage() {

  const [nome, setNome] = React.useState('');

  return (
    <>
      <h1>Mini Static Blog</h1>
      <div>
        <ul>
          <li><Link href='/posts'>Posts</Link></li>
          <li><Link href='/sobre'>Sobre</Link></li>
        </ul>
        <div>
          <h4>Formulário de cadastro</h4>
          <div>
            <label>Nome</label>
            <input type='text' onChange={(e) => setNome(e.target.value)} defaultValue={nome} />
          </div>
          <div>
            <button onClick={salvar}>Enviar</button>
          </div>
        </div>
      </div>
    </>
  );

  function salvar() {
    console.log('nome: ', nome);
    setNome('');
  }
}
