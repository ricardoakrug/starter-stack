import { Suspense } from 'react';
import { Footer } from '@/components/landing/footer';
import { Blog } from '@/components/landing/blog';
import { Features } from '@/components/landing/features';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';
import { Skeleton } from '@/components/ui/skeleton';

const posts = [
  {
    id: '1',
    title: 'Post 1',
    summary: 'This is the content of post 1',
    label: 'Tutorial',
    author: 'John Doe',
    published: '2021-01-01',
    url: 'https://shadcnblocks.com',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
  },
];

function LoadingHero() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        <Skeleton className="h-10 w-48 mx-auto" />
      </div>
    </div>
  );
}

function LoadingFeatures() {
  return (
    <div className="py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 border rounded-lg">
            <Skeleton className="h-12 w-12 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingBlog() {
  return (
    <div className="py-24 px-4">
      <div className="text-center mb-12">
        <Skeleton className="h-6 w-32 mx-auto mb-4" />
        <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Suspense fallback={<LoadingHero />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingFeatures />}>
        <Features />
      </Suspense>
      <Suspense fallback={<LoadingBlog />}>
        <Blog
          tagline="Latest Updates"
          heading="Blog Posts"
          description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights."
          buttonText="View all articles"
          buttonUrl="https://shadcnblocks.com"
          posts={posts}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
