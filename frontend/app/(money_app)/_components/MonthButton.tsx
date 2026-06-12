'use client'

import { useRouter } from 'next/navigation'

function useMonthNav(year: number, month: number) {
    const router = useRouter()
    return {
        prev: () => router.push(month === 1 ? `/summary/${year - 1}/12` : `/summary/${year}/${month - 1}`),
        next: () => router.push(month === 12 ? `/summary/${year + 1}/1` : `/summary/${year}/${month + 1}`),
        current: () => {
            const t = new Date()
            router.push(`/summary/${t.getFullYear()}/${t.getMonth() + 1}`)
        }
    }
}

export function PrevButton({ year, month }: { year: number; month: number }) {
    const { prev } = useMonthNav(year, month)
    return <button onClick={prev}>&lt;</button>
}

export function NextButton({ year, month }: { year: number; month: number }) {
    const { next } = useMonthNav(year, month)
    return <button onClick={next}>&gt;</button>
}

export function CurrentButton({ year, month ,title}: { year: number; month: number ;title?: string }) {
    const { current } = useMonthNav(year, month)
    return <button onClick={current}>{title || "今月"}</button>
}

export default function MonthButton({ year, month }: { year: number; month: number }) {
    return (
        <div>
            <PrevButton year={year} month={month} />
            <CurrentButton year={year} month={month} />
            <NextButton year={year} month={month} />
        </div>
    )
}