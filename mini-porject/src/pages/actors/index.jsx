import React, { useState, useEffect } from 'react';
import { options ,ImageUrl} from '@/ApiInfo';
import Pagination from '../../components/Pagination/Pagination'
import Link from 'next/link';

const ActorsList = () => {
    const [actors, setActors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`, options)
        .then(response => response.json())
        .then((response) => {
            setActors(response.results);  
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
        {actors.map((actor) => (
          <li key={actor.id} className="w-1/4 p-4">
          <Link href={`/actors/${actor.id}`}>
             <div className="bg-white border rounded-lg shadow-md p-4">
              <img
                src={`${ImageUrl}${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-auto object-cover"
              />
              <div className="mt-4">
                <h2 className="text-lg font-bold">{actor.name}</h2>
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
  
  export default ActorsList;