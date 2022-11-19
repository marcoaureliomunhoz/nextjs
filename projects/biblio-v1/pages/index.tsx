import { BiblioNavMenu } from '../components/BiblioNavMenu';
import { db } from '../infra/data/db';

interface PageProps {
  editoras: {
    numero: number;
  };
  livros: {
    numero: number;
  };
}

export async function getStaticProps(context: any): Promise<{props: PageProps}> {

  const numeroDeEditoras = await db.editora.count();
  const numeroDeLivros = await db.livro.count();

  return {
    props: {
      editoras: {
        numero: numeroDeEditoras
      },
      livros: {
        numero: numeroDeLivros
      }
    }
  }
}

export default function PageHome({
  editoras,
  livros
}: PageProps) {
  return (
    <BiblioNavMenu page='home'>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <article style={{flex:'1', border:'2px solid #eee', marginRight:'5px', padding:'10px'}}>
          <h3 style={{margin:'0px'}}>Editoras</h3>
          <p style={{margin:'0px', fontSize:'1.2em'}}>{editoras.numero}</p>
        </article>
        <article style={{flex:'1', border:'2px solid #eee', marginLeft:'5px', padding:'10px'}}>
          <h3 style={{margin:'0px'}}>Livros</h3>
          <p style={{margin:'0px', fontSize:'1.2em'}}>{livros.numero}</p>
        </article>
      </div>
    </BiblioNavMenu>
  )
}
