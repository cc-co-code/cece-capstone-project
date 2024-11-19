import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import BlogPostCard from "@/src/components/BlogPostCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CommunityStories() {
  const { data: blogPosts = [], error } = useSWR("/api/blogposts", fetcher);
  const router = useRouter();
  const { postId } = router.query;

  const [cityFilter, setCityFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  if (error) return <div>Failed to load posts</div>;

  if (postId) {
    const selectedPost = blogPosts.find((post) => post._id === postId);
    if (!selectedPost) return <p>Post not found.</p>;

    return (
      <div>
        <BlogPostCard
          title={selectedPost.title}
          content={selectedPost.content}
          city={selectedPost.city}
          year={selectedPost.year}
          age={selectedPost.age}
          postId={selectedPost._id}
          authorId={selectedPost.authorId}
          authorUsername={selectedPost.authorUsername}
          initialComments={selectedPost.comments || []}
          createdAt={selectedPost.createdAt}
        />
      </div>
    );
  }

  const filterBlogPosts = () => {
    if (!Array.isArray(blogPosts)) return [];
    return blogPosts.filter((post) => {
      const cityMatch = cityFilter
        ? post.city.toLowerCase().includes(cityFilter.toLowerCase())
        : true;
      const yearMatch = yearFilter ? post.year === parseInt(yearFilter) : true;
      const ageMatch = ageFilter ? post.age === parseInt(ageFilter) : true;
      return cityMatch && yearMatch && ageMatch;
    });
  };

  const filteredBlogPosts = filterBlogPosts();

  return (
    <div>
      <section className="info-section">
        <h2>Welcome to Community Stories</h2>
        <p>
          Here you can read about others' experiences and share your own. Click
          the button below to create a new post and contribute to the community!
        </p>
        <button
          className="button-uniform"
          onClick={() => router.push("/create-post")}
        >
          Create New Post
        </button>
      </section>

      <div className="filter-bar">
        <label>
          City of Abortion:
          <input
            type="text"
            placeholder="Filter by city"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
        </label>
        <label>
          Year of Abortion:
          <input
            type="number"
            placeholder="Filter by year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
        </label>
        <label>
          Age at Time of Abortion:
          <input
            type="number"
            placeholder="Filter by age"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          />
        </label>
        <button className="button-uniform">Apply Filters</button>
      </div>

      <section className="blogposts-section">
        {filteredBlogPosts.length > 0 ? (
          filteredBlogPosts.map((post) => (
            <BlogPostCard
              key={post._id}
              title={post.title}
              content={post.content}
              city={post.city}
              year={post.year}
              age={post.age}
              postId={post._id}
              authorId={post.authorId}
              authorUsername={post.authorUsername}
              initialComments={post.comments || []}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </section>
    </div>
  );
}
