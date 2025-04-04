import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Categories } from "@/constants";
import Link from "next/link";

const MobileCategories = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-5 md:hidden">
          Categories
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-2xl font-extrabold mb-4 text-left">
            Categories
          </SheetTitle>
        </SheetHeader>

        <ul className="space-y-1.5">
          {Categories.map((category, index) => (
            <li key={index}>
              <Button variant={"ghost"} asChild>
                <Link
                  href={
                    category == "all" ? "/blog" : `/blog/category/${category}`
                  }
                  className="flex items-center space-x-2 capitalize"
                >
                  {category}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategories;
