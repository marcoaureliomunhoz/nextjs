import { Button } from "../Button";

export function PageHeader() {

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.pageTitle}>Biblio</h1>
                <div>
                    <Button title='Entrar' />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '50px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // position: 'fixed',
        // width: '100%',
        // left: '0px',
        // top: '0px',
        // zIndex: 99,
    },
    content: {
        width: '70%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pageTitle: {
        padding: '0px',
        margin: '0px',
        fontSize: '1.5em',
    }
}