// Header.tsx
import Link from "next/link";
import { getUserName } from "@/app/(auth)/actions";
import MobileMenu from "../MobileNav";

export default async function Header() {

  const user = await getUserName();

  return (

    <header className="border-b">
      <div className="mx-auto flex h-16 items-center justify-between px-4">

        <h1>
          <Link href="/">Home</Link>
        </h1>

        {/* PC用 */}
        <nav className="hidden md:flex gap-4">
          {user ?(
            <>
            <Link href="/transaction">Transaction</Link>
            <Link href="/category">Category</Link>
            <Link href="/summary">Summary</Link>
            <Link href="/settings">{user}</Link>
            </>
          ):(
            <Link href="/login">Login</Link>
          )}
        </nav>
        {/* モバイル用 */}
        <nav className="md:hidden">
          <MobileMenu user={user} />
        </nav>
      </div>
    </header>
    // <header className="fixed top-0 left-0 right-0 w-full h-16 shadow-md bg-white dark:bg-gray-900 z-50">
    //   <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
    //     <nav className="flex justify-between items-center h-full">
    //       <ul className="flex space-x-4 text-sm md:text-base">
    //         {user ? (
    //           <>
    //             <li><Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Home</Link></li>
    //             <li><Link href="/transaction" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">transaction</Link></li>
    //             <li><Link href="/category" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">category</Link></li>
    //             <li><Link href="/summary" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">summary</Link></li>
    //             <li><Link href="/settings" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{user}</Link></li>
    //           </>
    //         ) : (
    //           <li><Link href="/login" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Login</Link></li>
    //         )}
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
  );
}
