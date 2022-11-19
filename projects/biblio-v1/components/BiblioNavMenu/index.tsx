import { FiGrid } from 'react-icons/fi';
import { NavButton, NavMenu } from '../NavMenu';

const pages = {
  Home: 'home',
  Editoras: 'editoras',
  Livros: 'livros'
}

interface BiblioNavMenuProps {
  children: any;
  page: 'home' | 'editoras' | 'livros'
  buttons?: NavButton[];
}

export function BiblioNavMenu({
  children,
  page,
  buttons
}: BiblioNavMenuProps) {
  return (
    <NavMenu
      items={[
        {
          id: pages.Home,
          link: '/',
          active: page === pages.Home,
          icon: <FiGrid size='24px' />
        },
        {
          id: pages.Editoras,
          title: 'Editoras',
          link: '/editoras',
          active: page === pages.Editoras,
        },
        {
          id: pages.Livros,
          title: 'Livros',
          link: '/livros',
          active: page === pages.Livros,
        }
      ]}
      buttons={buttons}
    >
      {children}
    </NavMenu>
  )
}
