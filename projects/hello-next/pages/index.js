import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Olá Next.js!</h1>
      <div>
        <Link href='/sobre'>Sobre</Link>
      </div>
      <img src='/img/foto.jpg' />
    </>
  );

}
