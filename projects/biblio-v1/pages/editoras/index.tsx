import React from 'react';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line, RiAddCircleLine } from 'react-icons/ri';
import { BiblioNavMenu } from '../../components/BiblioNavMenu';
import { Modal } from '../../components/Modal';
import { db } from '../../infra/data/db';
import { Editora } from '../../models/Editora';

interface PageProps {
  editoras: Editora[];
}

export async function getStaticProps(context: any): Promise<{props: PageProps}> {
  
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

export default function PageEditoras({
  editoras
}: PageProps) {

  const router = useRouter();
  const [modalForm, setModalForm] = React.useState<boolean>(false);
  const [idEditora, setIdEditora] = React.useState<number>(0);
  const [nomeEditora, setNomeEditora] = React.useState<string>('');

  const modal = React.useMemo(() => {
    if (!modalForm) return null;

    return (
      <Modal
        title='Adicionar Editora'
        close={fecharModal}
        buttons={[
          {
            title: 'Salvar',
            click: () => salvar()
          }
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
      </Modal>
    );
  }, [modalForm, nomeEditora]);

  return (
    <>
      <BiblioNavMenu
        page='editoras'
        buttons={[
          {title: 'Adicionar', rightIcon: <RiAddCircleLine />, click: adicionar}
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
            {editoras?.map(editora => {
              return (
                <tr key={`editora-${editora.id}`}>
                  <td style={{width:'100px', minWidth:'100px'}}>{editora.id}</td>
                  <td style={{width:'90%'}}>{editora.nome}</td>
                  <td style={{width:'64px', minWidth:'64px', display:'flex', justifyContent:'space-between', alignItems:'center', alignContent:'center'}}>
                    <FiEdit size='24px' color='gray' style={{cursor:'pointer'}} onClick={() => editar(editora)} />
                    <RiDeleteBin5Line size='26px' color='red' style={{cursor:'pointer'}} onClick={() => excluir(editora)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </BiblioNavMenu>
      {modal}
    </>
  );

  function adicionar() {
    setNomeEditora('');
    setModalForm(true);
  }

  function fecharModal() {
    setIdEditora(0);
    setNomeEditora('');
    setModalForm(false);
  }

  async function salvar() {
    if (!nomeEditora) {
      return alert('Informe um nome válido!');
    }
    fetch(`/api/editoras${idEditora ? '/'+idEditora : ''}`, {
      method: idEditora ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(idEditora
        ? {
          nome: nomeEditora,
          id: idEditora
        }
        : {
          nome: nomeEditora
        }
      )
    }).then(async response => {
      //const data = await response.json();
      fecharModal();
      router.reload();
    });
  }

  function excluir(editora: Editora) {
    if (!confirm(`Confirma a exclusão da editora ${editora.nome}?`)) return;
    fetch(`/api/editoras/${editora.id}`, {
      method: 'DELETE'
    }).then(async response => {
      router.reload();
    });
  }

  function editar(editora: Editora) {
    setIdEditora(editora.id);
    setNomeEditora(editora.nome);
    setModalForm(true);
  }
}
