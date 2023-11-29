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

<div className="container mx-auto w-3/4">
      <ul className="grid grid-cols-4 gap-4 mt-4 mb-4">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-white shadow-md rounded-lg p-4">
          <Link href={`/movies/${movie.id}`}>
             <div>
              <img
                src={`${ImageUrl}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="mt-4">
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <p className="text-gray-500">{movie.overview.lenght<=100 ? movie.overview : movie.overview.substring(0, 100)+"..."}</p>
              </div>
            </div>
            </Link> 
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
      
      </div>
    );
  };
  
  export default MovieList;