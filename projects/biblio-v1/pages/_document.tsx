import { Html, Head, Main, NextScript } from 'next/document';
import { PageHeader } from '../components/PageHeader';
import { PageMain } from '../components/PageMain';

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <PageHeader />
                <PageMain>
                    <Main />
                </PageMain>
                <NextScript />
            </body>
        </Html>
    );
}