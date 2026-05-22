// frontend/app/page.tsx

import {CardHome} from "../_components/ui/cardhome";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Welcome to Takashi Kurino's Portfolio
        </h1>
        
        <h2 className="text-xl text-center text-gray-600 mb-12">
          This portforil include money management and auth.
        </h2>
        
        <h2 className="text-xl text-gray-600 mb-2 p-3">
          Link To my Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CardHome title="GitHub" description="github" link="http://apple.com"/>
          <CardHome title="Notion" description="write detail this portfolio" link="https://www.notion.so/Takashi-Kurino-Portfolio-356bb43e5cae8015900cc17d23b639bb?source=copy_link" />
        </div>
        
        <h2 className="text-xl text-gray-600 mb-2 p-3">
          Deploy Environment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          <CardHome title="Frontend" description="Vercel" link="https://vercel.com/"/>
          <CardHome title="Backend" description="Render" link="https://render.com/"/>
          <CardHome title="Database" description="Neon(PostgreSQL)" link="https://neon.com/"/>
          <CardHome title="Email" description="Resend" link="https://resend.com/"/>
        </div>

        <h2 className="text-xl text-gray-600 mb-2 p-3">
          Use Framework
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          <CardHome title="Frontend" description="React + Next.js" />
          <CardHome title="Backend" description="Django" />
        </div>

        <h2 className="text-xl text-gray-600 mb-2 p-3">
          Local Dev Environment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          <CardHome title="Database" description="PostgreSQL" />
          <CardHome title="Webserver" description="Nginx" />
        </div>

      </div>
    </div>
  );
}