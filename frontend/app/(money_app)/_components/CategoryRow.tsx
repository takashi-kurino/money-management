'use client'

import Link from 'next/link'

interface Category {
  uuid: string
  name: string
}

export default function CategoryRow({ categories }: { categories: Category[] }) {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ul>
                    {categories.map((category) => (
                        <Link key={category.uuid} href={`/category/${category.uuid}`} className="flex items-center gap-2 text-blue-500 hover:underline">
                            
                            <li key={category.uuid}>{category.uuid}{category.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
}
