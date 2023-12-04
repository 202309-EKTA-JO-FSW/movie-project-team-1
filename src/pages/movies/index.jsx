import React from 'react';
import { ImageUrl, options } from '@/ApiInfo';
import Pagination from '../../components/Pagination/Pagination'
import Link from 'next/link';
import { useRouter } from 'next/router';


  const MovieList = ({ movies, currentPage, totalPages }) => {
   
    const router = useRouter();
    const handlePageChange = (newPage) => {
      router.push(`/movies?page=${newPage}`);
    };
    return (
      <>
        <ul className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <li key={movie.id} className="w-1/4 p-4">
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-white border rounded-lg shadow-md p-4">
                  <img
                    src={`${ImageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full max-h-80 object-cover"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-bold">{movie.title.length>36 ? movie.title.slice(0, 36): movie.title}</h2>
                    <p className="text-gray-500">{movie.overview.length > 100 ? movie.overview.slice(0, 100)+'...': movie.overview}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  
  export async function getServerSideProps(context) {
    const { query } = context;
    const currentPage = query.page || 1;
    const movieCategory = query.MovieCategory || "popular";
    const genreID = query.GenreID || 0;
  
    let apiUrl;
    if (genreID > 0) {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}&with_genres=${genreID}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/${movieCategory}?language=en-US&page=${currentPage}`;
    }
  
    const response = await fetch(apiUrl, options);
    const data = await response.json();
  
    return {
      props: {
        movies: data.results || [],
        currentPage: data.page || 1,
        totalPages: data.total_pages || 100,
      },
    };
  }

  export default MovieList;