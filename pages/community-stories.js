import { useRouter } from "next/router";
import useSWR from "swr";
import BlogPostCard from "@/src/components/BlogPostCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CommunityStories() {
  const { data: blogPosts, error } = useSWR("/api/blogposts", fetcher);
  const router = useRouter();

  if (error) return <div>Failed to load posts</div>;
  if (!blogPosts) return <div>Loading...</div>;

  const handleCreatePost = () => {
    router.push("/create-post");
  };

  return (
    <div>
      {/* Welcome/Info Text */}
      <section className="info-section">
        <h2>Welcome to Community Stories</h2>
        <p>
          Here you can read about others' experiences and share your own. Click
          the button below to create a new post and contribute to the community!
        </p>
        <button onClick={handleCreatePost}>Create New Post</button>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar">
        <label>
          City:
          <input type="text" placeholder="Filter by city" />
        </label>
        <label>
          Year:
          <input type="number" placeholder="Filter by year" />
        </label>
        <label>
          Age:
          <input type="number" placeholder="Filter by age" />
        </label>
        <button>Apply Filters</button>
      </div>

      {/* Blogposts Section */}
      <section className="blogposts-section">
        {blogPosts.map((post) => (
          <div className="blogpost-card" key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {/* Optional: Add other post details here, like city, year, etc. */}
          </div>
        ))}
      </section>
    </div>
  );
}
