import { RiCloseLine } from 'react-icons/ri';
import { Button } from '../Button';

interface ButtonModal {
  title: string;
  click: () => void;
}

interface ModalProps {
  children: any;
  title: string;
  close?: () => void;
  buttons?: ButtonModal[];
}

export function Modal({
  children,
  title,
  close,
  buttons
}: ModalProps) {

  return (
    <div
      style={{
        display:'flex',
        justifyContent:'center',
        position:'fixed',
        left:'0px',
        top:'0px',
        width:'100vw',
        height:'100vh',
        backgroundColor:'rgba(0,0,0,0.5)',
        zIndex:'999',
        padding: '20px 0px'
      }}
    >
      <div style={{width:'60%', backgroundColor:'#fff', borderRadius:'5px', overflow:'hidden'}}>
        <div style={{borderBottom:'1px solid #eee', padding:'15px 20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h3 style={{margin:'0px'}}>{title}</h3>
          <RiCloseLine onClick={close} size='1.6em' style={{cursor:'pointer'}} />
        </div>
        <div style={{padding:'15px 20px', height:'calc(100% - 120px)'}}>
          {children}
        </div>
        {buttons && buttons.length > 0 && (
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid #eee', padding:'15px 20px'}}>
            {buttons?.map(btn => {
              return (
                <div key={`btn-${btn.title}`} style={{marginLeft:'3px', marginRight:'3px'}}>
                  <Button title={btn.title} click={btn.click} width='80px' />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
