import { allBlogs } from "content-collections";

import { Categories } from "@/constants";

import { Button } from "@/components/ui/button";
import MobileCategories from "./_components/mobile-categories";
import BlogCard from "./_components/blog_card";
import Link from "next/link";

export default function page() {
  return (
    <div className="md:flex">
      <MobileCategories />

      <section className="space-y-4 mr-16 hidden md:block">
        <h1 className="text-2xl font-extrabold">Categories</h1>
        <ul className="space-y-1.5">
          {Categories.map((category, index) => (
            <li key={index} className="text-muted-foreground">
              <Button variant={"ghost"} asChild>
                <Link
                  href={
                    category == "all"
                      ? "/blog"
                      : `/blog/category/${category}`
                  }
                  className="flex items-center space-x-2 capitalize"
                >
                  {category}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        {allBlogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} />
        ))}
      </section>
    </div>
  );
}
