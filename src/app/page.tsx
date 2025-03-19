import { Footer } from "@/components/blocks/footer";
import { Blog } from "@/components/blocks/blog";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";

const posts = [
  {
    id: "1",
    title: "Post 1",
    summary: "This is the content of post 1",
    label: "Tutorial",
    author: "John Doe",
    published: "2021-01-01",
    url: "https://shadcnblocks.com",
    image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
  },
];

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero />
      <Features />
      <Blog
        tagline="Latest Updates"
        heading="Blog Posts"
        description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights."
        buttonText="View all articles"
        buttonUrl="https://shadcnblocks.com"
        posts={posts}
      />
      <Footer />
    </main>
  );
}
