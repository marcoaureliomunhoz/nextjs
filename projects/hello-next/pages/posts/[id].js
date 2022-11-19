import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PagePost() {

  const router = useRouter();

  return (
    <div>
      <Link href='/'>Voltar</Link>
      <p>Post</p>
      <h1>{router.query.id}</h1>
    </div>
  )
}
