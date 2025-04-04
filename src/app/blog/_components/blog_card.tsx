import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  image: string;
  description: string;
  publishedOn: string;
  slug: string;
}

const BlogCard = (blogCard: BlogCardProps) => {
  return (
    <Link href={`/blog/${blogCard.slug}`}>
      <Card className="md:max-w-lg lg:max-w-md">
        <CardContent className="space-y-2.5 pt-5">
          <h2 className="font-semibold text-xl">{blogCard.title}</h2>
          <div className="relative aspect-video">
            <Image
              src={blogCard.image}
              alt={blogCard.title}
              fill
              className="object-cover rounded-md w-full"
            />
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {blogCard.description}
          </p>
        </CardContent>

        <CardFooter className="text-xs flex justify-between items-center text-muted-foreground">
          <p>Published on {blogCard.publishedOn}</p>
          <Avatar className="w-7 h-7">
            <AvatarImage src="/favicon.ico" alt="Aut" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;