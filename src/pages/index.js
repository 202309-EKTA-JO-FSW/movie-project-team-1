import { options ,ImageUrl} from '@/ApiInfo';
import Link from 'next/link';
import NextJsCarousel from '../components/Carousel/Carousel'
export default function Home({nowPlayingMovies,popularMovies,topratedmoviesMovies,upcomingMovies}) {
  return (
    <div className='bg-gradient-to-r from-teal-950 to-yellow-600'>    
<NextJsCarousel upcomingMovies={upcomingMovies}/>
       
<div class="bg-teal-900 justify-between py-3 px-6 mx-6 rounded-xl">
<Link  href={{
            pathname:  '/movies',
            query: { MovieCategory:'popular' },
          }}  key={'popular_list'}> 
  <h2 className='text-yellow-300 text-lg font-bold text-center hover:text-white'>Popular Movies</h2></Link>
  </div>
      <ul className="flex flex-wrap justify-center">
          {popularMovies.map((movie) => (
            <li key={popularMovies.id} className=" p-2 my-3 transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300">
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-stone-200 border rounded-lg shadow-md p-2 my-2">
                  <img
                    src={`${ImageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="bg-teal-900 justify-between py-3 px-6 mx-6 rounded-xl">
        <Link  href={{
            pathname: '/movies',
            query: { MovieCategory:'top_rated' },
          }}  key={'top_rated_list'}> 
          <h2 className='text-yellow-300 text-lg font-bold text-center hover:text-white'>Top Rated Movies</h2>
          </Link>
  </div>
      <ul className="flex flex-wrap justify-center">
          {topratedmoviesMovies.map((movie) => (
            <li key={topratedmoviesMovies.id} className=" p-2 my-3 transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300">
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-stone-200 border rounded-lg shadow-md p-2 my-2">
                  <img
                    src={`${ImageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div class="bg-teal-900 justify-between py-3 px-6 mx-6 rounded-xl">
        <Link  href={{
            pathname: '/movies',
            query: { MovieCategory:'now_playing' },
          }}  key={'now_playing_list'}>  <h2 className='text-yellow-300 text-lg font-bold text-center hover:text-white'>Now Playing Movies</h2>
          </Link>
  </div>
      <ul className="flex flex-wrap justify-center">
          {nowPlayingMovies.map((movie) => (
            <li key={nowPlayingMovies.id} className=" p-2 my-3 transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300">
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-stone-200 border rounded-lg shadow-md p-2 my-2">
                  <img
                    src={`${ImageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>

     
    </div>
  )
}

export async function getServerSideProps(context){
  const nowPlayingResponse = await fetch (
   `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
   options
   );
  const nowPlayingmovies = await nowPlayingResponse.json();

  const popularResponse = await fetch (
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
    options
    );
   const popularmovies = await popularResponse.json();

   const topratedResponse = await fetch (
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
    options
    );
   const topratedmovies = await topratedResponse.json();

   const upcomingResponse = await fetch (
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
    options
    );
   const upcomingmovies = await upcomingResponse.json();

  return{
    props: {
      nowPlayingMovies: nowPlayingmovies.results.slice(0, 12) || [],
      popularMovies: popularmovies.results.slice(0, 12) || [],
      topratedmoviesMovies: topratedmovies.results.slice(0, 12) || [],
      upcomingMovies: upcomingmovies.results.slice(0, 20) || []
    }
  }
}
