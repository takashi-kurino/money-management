// 'use client'

import Link from 'next/link'
import {GetWeekSummary} from "@/app/(money_app)/actions";

export default async function SummaryList({ params }: { params: { year: string; month: string } }) {

    const { year, month } = await params;
    const numberYear = Number(year);
    const numberMonth = Number(month);

    const res = await GetWeekSummary(numberYear, numberMonth);

    return (
        
        <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {res.length === 0 && (
                    <p className="p-4 text-gray-500">今月のデータはありません。</p>
                ) }
                <ul>
                    {res.map((a:any) => (  
                            
                        <Link key={a.category_uuid} href={`/category/${a.category_uuid}`}>
                            <li key={a.category_uuid} className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-200 transition-colors">
                                {a.category_name}-{a.price}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}
