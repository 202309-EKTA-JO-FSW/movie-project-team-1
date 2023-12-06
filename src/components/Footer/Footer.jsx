import Link from "next/link";

function Footer(){
    return(
      <div className="flex flex-row justify-around bg-teal-950 text-white">
        <div className="m-10">
          <div>
            <div className="text-2xl"><b>FilmFusion</b></div>
            <div className="text-l hover:underline hover:underline-offset-4"><Link href="/"><p>Home Page</p></Link></div>
          </div>
          <div className="flex flex-row">
            <div className="mr-5">
                <div className="text-2xl mt-5"><b>Movies</b></div>
                <Link href={`/movies?MovieCategory=now_playing`}><p className="text-l hover:underline hover:underline-offset-4">Now playing Movies</p></Link>
                <Link href={`/movies?MovieCategory=top_rated`}><p className="text-l hover:underline hover:underline-offset-4">Top Rated Movies</p></Link>
                <Link href={`/movies?MovieCategory=upcoming`}><p className="text-l hover:underline hover:underline-offset-4">Upcoming Movies</p></Link>
                <Link href={`/movies?MovieCategory=popular`}><p className="text-l hover:underline hover:underline-offset-4">Popular Movies</p></Link>
            </div>
            <div>
                <div className="text-2xl mt-5"><b>Actors</b></div>
                <Link href={`/actors`}><p className="text-l hover:underline hover:underline-offset-4">Actors Page</p></Link>
            </div>
          </div>
        </div>
            
        <div className="m-10"> 
          <div className="flex flex-row">
            <div className="m-5 flex flex-col items-center">
                <p className="font-bold text-xl mb-3">Sara Jouma</p>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/sara-jouma-156633127/">Linkedin</Link>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/sarajouma">Github</Link>
            </div>
            <div className="m-5 flex flex-col items-center">
                <p className="font-bold text-xl mb-3">Dana Omar</p>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/dana-omar-ko/">Linkedin</Link>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/Dana-MO">Github</Link>
            </div>
            <div className="m-5 flex flex-col items-center">
                <p className="font-bold text-xl mb-3">Abdullah Alawad</p>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/abdullah-alawad-0989b7269/">Linkedin</Link>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/Abdullah-Alawad">Github</Link>
            </div>
            <div className="m-5 flex flex-col items-center">
                <p className="font-bold text-xl mb-3">Mohammad Elamaireh</p>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/mohammad-elamaireh-63b3a5257">Linkedin</Link>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/samxsam21">Github</Link>
            </div>
            </div>
        </div> 
      </div>
    );
}

export default Footer;