

type CardHomeProps = {
    title: string;
    description?: string;
    link?: string
} & React.ComponentProps<"div">;

export function CardHome({title,description,link=""}:CardHomeProps) {
  return (
    
    <div className="w-auto box-border border-1 border-indigo-100 rounded-xl shadow-md ">
        {link ?
        < a href={link}>
            <div className="md:flex hover:bg-sky-100 rounded-xl ">
                
                <div className="p-8">
                <div className="text-xl font-semibold tracking-wide text-blue-500 uppercase">{title}</div>

                    <p className="mt-2 text-2xl">
                        {description}   
                    </p>
                </div>
            </div>
        </a>
        :
        <div className="md:flex">
          
            <div className="p-8">
            <div className="text-xl font-semibold tracking-wide text-blue-500 uppercase">{title}</div>

              <p className="mt-2 text-2xl">
                  {description}   
              </p>
            </div>
        </div>
        }
    </div>
  )
}