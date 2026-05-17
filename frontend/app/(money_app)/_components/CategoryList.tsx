'use client'

import Link from 'next/link'
import {category} from '../types'

export default function CategoryList({ categories }: { categories: category[] }) {
    return (
        <div className="bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">

            <ul>
                {categories.map((category) => (  
                <Link key={category.uuid} href={`/category/${category.uuid}`}>
                    <li key={category.uuid} className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-200 transition-colors">
                    {category.name}
                    </li>
                </Link>
                ))}
            </ul>
            </div>
            </div>
        </div>
    );
}
