import { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <main className="container flex flex-col pt-10 min-h-screen">
      {children}
    </main>
  );
}