import Link from 'next/link';
import data from '../../posts.json';

export async function getStaticProps(context) {

  const posts = data.posts;

  return {
    props: {
      posts: posts
    }, // will be passed to the page component as props
  }
}

export default function PagePosts(props) {

  return (
    <div>
      <Link href='/'>Voltar</Link>
      <h1>Posts</h1>
      <div style={{display:'flex', flexDirection:'column'}}>
        {props.posts.map(post => {
          return (
            <article key={`post-${post.id}`} style={{border:'1px solid green', marginBottom:'10px', padding:'10px', borderRadius:'5px'}}>
              <Link key={`link-post-${post.id}`} href={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.date}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
