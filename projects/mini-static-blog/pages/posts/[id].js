import Link from 'next/link';
import { useRouter } from 'next/router';
import data from '../../posts.json';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: false //true or "blocking" // See the "fallback" section below
  };
}

export async function getStaticProps(context) {

  const posts = data.posts;

  return {
    props: {
      posts: posts
    }, // will be passed to the page component as props
  }
}

export default function PagePost(props) {

  const router = useRouter();

  const post = props.posts.find(post => post.id === router.query.id);

  return (
    <div>
      <Link href='/posts'>Voltar</Link>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.date}</p>
    </div>
  )
}
