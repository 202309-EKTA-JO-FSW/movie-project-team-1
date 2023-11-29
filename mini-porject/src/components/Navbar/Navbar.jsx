import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { options } from '../../ApiInfo';

function Navbar()  {
    const movieCategory = [
        {
            catrogeValue :'top_rated',
           navbarValue:'Top Rate'
        },
        {
            catrogeValue :'popular',
            navbarValue:'Popular'
        },
        {
            catrogeValue :'now_playing',
            navbarValue:'Now Playing'
        },
        {
            catrogeValue :'upcoming',
            navbarValue:'Upcoming'
        }
    ];
    const[genres,SetGenres]=useState([]);
    //const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'];
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
        .then(response => response.json())
        .then((response) => {
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
                    {movieCategory.map((item,index) => <Link  href={{
            pathname: '/movies',
            query: { MovieCategory: `${item.catrogeValue}` },
          }}  key={item.catrogeValue+index}>{item.navbarValue}</Link>)}
                </div>
            </div>
            <div className='dropdown'>
                <Link href='/' className='dropdown-link'>Genres</Link>
                <div className='dropdown-content'>
                    {genres.map((genre) =>  <Link href={{
            pathname: '/movies',
            query: { GenreID: `${genre.id}` },
          }}
          key={genre.id}>{genre.name}</Link>)}
                </div>
            </div>
            <Link href='/actors'>Actors</Link>
        </nav>
    )
};

export default Navbar;