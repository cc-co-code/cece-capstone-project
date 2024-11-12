import BlogPostForm from "@/src/components/BlockPostForm";
import Header from "@/src/components/Header";
export default function CreatePostPage() {
  return (
    <div>
      <Header />
      <h1>Create a new Post</h1>
      <BlogPostForm />
    </div>
  );
}
