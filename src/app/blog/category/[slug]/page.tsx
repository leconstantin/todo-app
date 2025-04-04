import { allBlogs } from "content-collections";

import { Categories } from "@/constants";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import MobileCategories from "../../_components/mobile-categories";
import BlogCard from "../../_components/blog_card";
// import { usePathname } from "next/navigation";

export default function page({ params }: { params: { slug: string } }) {
  // console.log(params.slug);

  const currentCategoryBlogs = allBlogs.filter((blog) => {
    return blog.category === params.slug;
  });

  // console.log(currentCategoryBlogs.length);

  //   const pathname = usePathname();

  //   const currentBlog = allBlogs.filter((blog) => {
  //     return blog.category === pathname.split("/").at(-1);
  //   });
  //   console.log(currentBlog);

  return (
    <div className="md:flex">
      <MobileCategories />

      <section className="space-y-4 mr-16 hidden md:block">
        <h1 className="text-2xl font-extrabold">Categories</h1>
        <ul className="space-y-1.5">
          {Categories.map((category, index) => (
            <li key={index} className="text-muted-foreground">
              <Button variant={"ghost"}>
                <Link
                  href={
                    category == "all"
                      ? "/blog"
                      : `/blog/category/${category}`
                  }
                  className="flex items-center space-x-2"
                >
                  {category}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        {currentCategoryBlogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} />
        ))}
      </section>
    </div>
  );
}
