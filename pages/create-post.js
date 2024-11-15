import BlogPostForm from "@/src/components/BlockPostForm";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function CreatePostPage() {
  return (
    <>
      {" "}
      <Header />
      <h2>Create a new Post</h2>
      <BlogPostForm />
      <Footer />
    </>
  );
}
