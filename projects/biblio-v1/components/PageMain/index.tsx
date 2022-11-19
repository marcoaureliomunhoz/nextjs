export function PageMain({children}: any) {

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        // marginTop: '50px',
    },
    content: {
        width: '70%',
    },
}
