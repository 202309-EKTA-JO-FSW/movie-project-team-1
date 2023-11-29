import React, { useState, useEffect } from 'react';
import { options ,ImageUrl} from '@/ApiInfo';
import Pagination from '../../components/Pagination/Pagination'
import Link from 'next/link';
import { useRouter } from 'next/router';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    
    const router = useRouter();
    const movieCategory = router.query.MovieCategory == undefined ? "popular": router.query.MovieCategory ;
    const genreID = router.query.GenreID== undefined ? 0:router.query.GenreID;

    if(genreID >0 ){
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}&with_genres=${genreID}`, options)
        .then(response => response.json())
        .then((response) => {
          setMovies(response.results);  
          setTotalPages(response.total_pages);
        })
        .catch(err => console.error(err));
    }, [currentPage]);
    }
    else{
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieCategory}?language=en-US&page=${currentPage}`, options)
        .then(response => response.json())
        .then((response) => {
          setMovies(response.results);  
          setTotalPages(response.total_pages);
        })
        .catch(err => console.error(err));
    }, [currentPage]);

    }
   

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
      
      </>
    );
  };
  
  export default MovieList;