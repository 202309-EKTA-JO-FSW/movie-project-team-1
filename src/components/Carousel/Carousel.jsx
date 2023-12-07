import React, { Component } from 'react'; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
import Link from 'next/link';
import {ImageUrl} from '@/ApiInfo';

function NextJsCarousel({upcomingMovies}) {
    return ( 
        <div> 
          <Carousel autoPlay> 
          {upcomingMovies.map((movie) => (
            <Link href={`/movies/${movie.id}`}>
            <div key={upcomingMovies.id} className=' my-2'>
                  <img
                    src={`${ImageUrl}${movie.backdrop_path}`}
                    alt={movie.title} className="rounded-2xl relative max-w-[1000px] h-[600px]"  style={{height:'500px'}}
                  />
                   <p className="text-xl absolute -mt-16 z-50 bg-teal-950 py-1 text-yellow-300 text-bold px-20 left-[290px] rounded-3xl">{movie.title} ({movie.release_date.substring(0, 4)})</p> 
                    
            </div>
            </Link>
          ))}
        
 
          </Carousel> 
        </div> 
    ); 
}

export default NextJsCarousel;