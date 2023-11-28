import React, { useState, useEffect } from 'react';
import { options ,ImageUrl} from '@/ApiInfo';
import Pagination from '../../components/Pagination/Pagination'

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`, options)
        .then(response => response.json())
        .then((response) => {
            setMovies(response.results);  
            setTotalPages(response.total_pages);
        })
        .catch(err => console.error(err));
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
    return (
        <>
      <ul className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <li key={movie.id} className="w-1/4 p-4">
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
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
      
      </>
    );
  };
  
  export default MovieList;