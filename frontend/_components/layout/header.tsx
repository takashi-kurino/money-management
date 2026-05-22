// Header.tsx
import Link from "next/link";
import { getUserName } from "@/app/(auth)/actions";

export default async function Header() {

  const user = await getUserName();

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 shadow-md bg-white dark:bg-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Home
              </Link>
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-4 text-sm md:text-base">
              {user ? (
                <>
                  <li><Link href="/transaction" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">transaction</Link></li>
                  <li><Link href="/category" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">category</Link></li>
                  <li><Link href="/settings" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{user}</Link></li>
                </>
              ) : (
                <li><Link href="/login" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Login</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
