// Header.tsx
import Link from "next/link";
import UserName from "@/app/user/components/UserName";

export default async function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-lg font-bold">Todo App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/todo">Todo</Link></li>
                <li><Link href="/admin">Django admin</Link></li>
                <li><UserName /></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
