type Post = {
 id: string;
 title: string;
 content: string;
};
export default async function PostsPage() {
 const res = await fetch("https://localhost:3000/posts");
 const posts = (await res.json()) as Post[];
 return (
  <div>
   <h1>Posts Page</h1>
   <p>This page lists all the posts available in the application.</p>
   {posts.map((post) => (
    <article key={post.id}>
     <h2> {post.title}</h2>
    </article>
   ))}
  </div>
 );
}
