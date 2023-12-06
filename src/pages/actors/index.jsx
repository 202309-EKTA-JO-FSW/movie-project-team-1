import React, { useState, useEffect } from 'react';
import { options ,ImageUrl} from '@/ApiInfo';
import Pagination from '../../components/Pagination/Pagination'
import Link from 'next/link';
import { useRouter } from 'next/router';



const ActorsList = ({actors, totalPages, currentPage}) => {
    const router = useRouter();

    const handlePageChange = (newPage) => {
        router.push(`/actors?page=${newPage}`);
      };
    
    return (
      <div className='bg-gradient-to-r from-yellow-600 to-teal-950'>
      <div className="container mx-auto w-3/4 ">
      <ul className="flex flex-wrap justify-center">
        {actors.map((actor) => (
          <li key={actor.id} className="w-1/4 p-4 mt-5 mb-2 transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300">
          <Link href={`/actors/${actor.id}`}>
             <div className="bg-stone-200 border rounded-lg shadow-md p-3">
              {(!!actor.profile_path) && <img
                src={`${ImageUrl}${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-auto object-cover rounded-xl"
              />}
              <div className="mt-4">
                <h2 className="text-lg font-bold">{actor.name}</h2>
              </div>
            </div>
            </Link> 
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>

      </div>
      </div>
    );
  };
  
  export async function getServerSideProps({query}){
    let currentPage = query.page || 1;

    const actorsResponse = await fetch(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`,
       options
      );
    const data = await actorsResponse.json();

    const totalPages = data.total_pages;
    const actors = data.results;
    currentPage = parseInt(currentPage, 10);
    
    return {
      props: {actors, totalPages, currentPage},
    }
  }

  export default ActorsList;

