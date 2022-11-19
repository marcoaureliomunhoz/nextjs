import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line, RiAddCircleLine } from 'react-icons/ri';
import { BiblioNavMenu } from '../../components/BiblioNavMenu';
import { db } from '../../infra/data/db';
import { Livro } from '../../models/Livro';

interface PageProps {
  livros: Livro[];
}

export async function getStaticProps(context: any): Promise<{props: PageProps}> {
  
  const livros = await db.livro.findMany();

  return {
    props: {
      livros: livros.map(livro => ({
        id: Number(livro.id),
        titulo: livro.titulo
      }))
    }
  }
}

export default function PageLivros({
  livros
}: PageProps) {
  return (
    <BiblioNavMenu
      page='livros'
      buttons={[
        {title: 'Adicionar', rightIcon: <RiAddCircleLine />, click: () => {}}
      ]}
    >
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {livros?.map(livro => {
            return (
              <tr key={`livro-${livro.id}`}>
                <td style={{width:'100px', minWidth:'100px'}}>{livro.id}</td>
                <td style={{width:'90%'}}>{livro.titulo}</td>
                <td style={{width:'64px', minWidth:'64px', display:'flex', justifyContent:'space-between', alignItems:'center', alignContent:'center'}}>
                  <FiEdit size='24px' color='gray' style={{cursor:'pointer'}} />
                  <RiDeleteBin5Line size='26px' color='red' style={{cursor:'pointer'}} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </BiblioNavMenu>
  )
}
