import useSWR from 'swr';
import {Editora} from "../../models/Editora";
import Head from "next/head";
import {BiblioNavMenu} from "../../components/BiblioNavMenu";
import {RiAddCircleLine, RiDeleteBin5Line, RiExternalLinkLine} from "react-icons/ri";
import {FiEdit} from "react-icons/fi";
import React from "react";
import {useRouter} from "next/router";
import {Modal} from "../../components/Modal";
import Swal from 'sweetalert2';

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export default function EditorasSwrPage() {

  const { data, error } = useSWR('/api/editoras', fetcher);
  
  const router = useRouter();
  const editoras = data ? data.data as Editora[] : [];
  
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
      <Head>
        <title>Editoras</title>
      </Head>
      <BiblioNavMenu
        page='editoras'
        buttons={[
          {title: 'Adicionar por modal', rightIcon: <RiAddCircleLine />, click: adicionarPorModal},
          {title: 'Adicionar por página', rightIcon: <RiExternalLinkLine />, click: adicionarPorPagina},
        ]}
      >
        <table style={{width:'100%'}}>
          <thead>
          <tr>
            <th style={{width:'150px', minWidth:'150px', maxWidth:'150px'}}>Código</th>
            <th style={{width:'90%'}}>Nome</th>
            <th style={{width:'64px', minWidth:'64px'}}></th>
          </tr>
          </thead>
          <tbody>
          {editoras?.map(editora => {
            return (
              <tr key={`editora-${editora.id}`}>
                <td>{editora.id}</td>
                <td>{editora.nome}</td>
                <td style={{display:'flex', justifyContent:'space-between', alignItems:'center', alignContent:'center'}}>
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

  function adicionarPorModal() {
    setNomeEditora('');
    setModalForm(true);
  }

  function adicionarPorPagina() {
    router.push('/editoras/adicionar');
  }

  function fecharModal() {
    setIdEditora(0);
    setNomeEditora('');
    setModalForm(false);
  }

  async function salvar() {
    if (!nomeEditora) {
      return alert('Informe o nome da editora!');
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
      console.log('salvo com sucesso!');
      fecharModal();
      //alert('Salvo com sucesso!');
      //router.reload();
      // const myWindow = window.open("", "", "width=1,height=1,innerWidth=1,innerHeight=1,toolbar=0,top=9999999");
      // myWindow?.blur();
      // myWindow?.close();
      Swal.fire({
        title: 'Sucesso!',
        text: 'Editora registrada com sucesso.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });
  }

  async function excluir(editora: Editora) {
    //if (!confirm(`Confirma a exclusão da editora ${editora.nome}?`)) return;
    const result = await Swal.fire({
      title: `Confirma a exclusão da editora ${editora.nome}?`,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      icon: 'question',
    });
    if (!result.isConfirmed) return;
    fetch(`/api/editoras/${editora.id}`, {
      method: 'DELETE'
    }).then(async _ => {
      //router.reload();
      // const myWindow = window.open("", "", "width=1,height=1,innerWidth=1,innerHeight=1,toolbar=0,top=9999999");
      // myWindow?.blur();
      // myWindow?.close();
    });
  }

  function editar(editora: Editora) {
    setIdEditora(editora.id);
    setNomeEditora(editora.nome);
    setModalForm(true);
  }
} 