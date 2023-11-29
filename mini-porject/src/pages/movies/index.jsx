import React, { useState, useEffect } from 'react';
import { options ,ImageUrl} from '@/ApiInfo';
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
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWU5ZDllMGU1NmZiNWU3NThlNDdmYWZkOTdiNmM2ZiIsInN1YiI6IjY1NjYwMmUzNmMwYjM2MDBlNGRiYzQ2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YX6hYgkuzF5tWmexeSHHIGsTAZKgkenbn620fCiH-VI'
      }
    };
  
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