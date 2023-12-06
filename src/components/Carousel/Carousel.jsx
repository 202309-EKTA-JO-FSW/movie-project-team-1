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
            <div key={upcomingMovies.id}>
              <Link href={`/movies/${movie.id}`}>
                  <img
                    src={`${ImageUrl}${movie.backdrop_path}`}
                    alt={movie.title} className="w-full"  style={{height:'500px'}}
                  />
                   <p className="legend">{movie.title}</p> 
                
              </Link>
            </div>
          ))}
        
             
          </Carousel> 
        </div> 
    ); 
}

export default NextJsCarousel;