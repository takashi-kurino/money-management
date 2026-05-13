// frontend/app/page.tsx

import {CardHome} from "../_components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Welcome to Takashi Kurino's Portfolio
        </h1>
        <h2 className="text-xl text-center text-gray-600 mb-12">
          This stack includes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardHome title="Frontend" description="React + Next.js" />
          <CardHome title="Webserver" description="Nginx" />
          <CardHome title="Backend" description="Django" />
          <CardHome title="Database" description="PostgreSQL" />
        </div>
      </div>
    </div>
  );
}