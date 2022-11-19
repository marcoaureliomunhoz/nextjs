import Link from "next/link";
import React from "react";

export interface NavButton {
  leftIcon?: any;
  title?: string;
  rightIcon?: any;
  click?: () => void;
}

interface NavMenuItem {
  id: any;
  title?: string;
  link: string;
  active: boolean;
  icon?: any;
}

interface NavMenuProps {
  children: any;
  items: NavMenuItem[];
  buttons?: NavButton[];
}

export function NavMenu({ children, items, buttons }: NavMenuProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <nav>
          <ul className="nav-menu-options">
            {items.map((item) => {
              return (
                <li key={`tab-${item.id}`}>
                  <Link
                    href={item.link}
                    className={
                      item.active ? "nav-menu-item-active" : "nav-menu-item"
                    }
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          {buttons?.map((btn) => {
            return (
              <button key={`btn-${btn.title}`} onClick={btn.click} style={{border:'none', display:'flex', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                {btn.leftIcon && <span style={{marginRight:'3px', fontSize:'1.8em', display:'flex', alignItems:'center'}}>{btn.leftIcon}</span>}
                {btn.title}
                {btn.rightIcon && <span style={{marginLeft:'3px', fontSize:'1.8em', display:'flex', alignItems:'center'}}>{btn.rightIcon}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  },
};
