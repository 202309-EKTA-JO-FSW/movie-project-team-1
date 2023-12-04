import { options ,ImageUrl} from '@/ApiInfo';
//import { getServerSideProps } from './actors';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

export default function Home({movies, currentPage, totalPages}) {

  return (
    <>
      <h1>Home Page</h1>
      {/*There Should be Welcoming part to the website here*/}
      <h2>Now Showing</h2>
      <ul className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <li key={movie.id} className="w-1/4 p-4">
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-white border rounded-lg shadow-md p-4">
                  <img
                    src={`${ImageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-bold">{movie.title}</h2>
                    <p className="text-gray-500">{movie.overview}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
    </>
  )
}

export async function getServerSideProps(context){
  const { query } = context;
  const currentPage = query.page || 1;

  const nowShowingResponse = await fetch (
   `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
   options
   );
  const nowShowing = await nowShowingResponse.json();

  return{
    props: {
      movies: nowShowing.results || [],
      currentPage: nowShowing.page || 1,
      totalPages: nowShowing.total_pages || 1
    }
  }
}
