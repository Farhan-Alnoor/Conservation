import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-green-900 z-20 sticky top-0">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4 ">  
        <Link href="/" className="text-lg font-bold">
          Wild Futures
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/species" className="hover:underline">
            Species
          </Link>
          <Link href="/organizations" className="hover:underline">
  Organizations
</Link>
<Link href="/threats" className="hover:underline">
  Threats
</Link>
<Link href="/news" className="hover:underline">
  News
</Link>
<Link href="/stories" className="hover:underline">
  Success stories
</Link>
        </div>
      </nav>
    </header>
  );
}