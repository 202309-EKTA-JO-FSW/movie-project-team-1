import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { options } from '../../ApiInfo';

function Navbar()  {
    const movieCategory = ['Top Rate', 'Popular', 'Latest', 'Now Playing', 'Upcoming'];
    const[genres,SetGenres]=useState([]);
  
    //const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'];
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            SetGenres(response.genres);  
        })
        .catch(err => console.error(err));
    }, []);
    return (
        <nav>
            <Link href='/'>Logo</Link>
            <div className='dropdown'>
                <Link href='/' className='dropdown-link'>Movies</Link>
                <div className='dropdown-content'>
                    {movieCategory.map((category,index) => <Link href={`../../Pages/movies`} MovieCategory={category} key={category+index}>{category}</Link>)}
                </div>
            </div>
            <div className='dropdown'>
                <Link href='/' className='dropdown-link'>Genres</Link>
                <div className='dropdown-content'>
                    {genres.map((genre) =>  <Link href={`../../Pages/movies`} key={genre.id}>{genre.name}</Link>)}
                </div>
            </div>
            <Link href='/'>Actors</Link>
        </nav>
    )
};

export default Navbar;