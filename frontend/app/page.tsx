// frontend/app/page.tsx

import {CardHome} from "../components/ui/card";


export default function Home() {
  return (
    <> 
      <div className="h-screen w-full flex justify-center items-center row-start-2 flex-col items-center gap-6 " >
        <h1 className="text-4xl font-bold text-center">
          Welcome to Takashi Kurino's Portfolio.
        </h1>
        <h2 className="text-2xl text-center">
          This stack includes
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
          <CardHome title="Frontend" description="React + Next.js" />
          <CardHome title="webserver" description="Nginx" />
          <CardHome title="Backend" description="Django" />
          <CardHome title="db" description="PostgreSQL" />
        </div>
      </div>
    </>

  );
}