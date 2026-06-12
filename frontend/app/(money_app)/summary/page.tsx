import { redirect } from 'next/navigation';
export default async function Page() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    redirect(`/summary/${year}/${month}`);
}