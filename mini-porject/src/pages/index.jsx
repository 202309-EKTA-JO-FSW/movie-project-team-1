
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; 

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('3eff7abc1e8a6a7461712b4747d87bdc')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container"> 
      <h1>Welcome to the Movie Database</h1>
      <p>Discover the latest movies!</p>
  
      <div>
        <h2>Popular Movies</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <h3>{movie.rating}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
          };
