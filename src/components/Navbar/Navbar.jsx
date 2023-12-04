import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { options } from '../../ApiInfo';
import SearchBar from './Searchbar';

function Navbar()  {
    const movieCategory = [
        {
            categoryvalue :'top_rated',
           navbarValue:'Top Rate'
        },
        {
            categoryvalue :'popular',
            navbarValue:'Popular'
        },
        {
            categoryvalue :'now_playing',
            navbarValue:'Now Playing'
        },
        {
            categoryvalue :'upcoming',
            navbarValue:'Upcoming'
        }
    ];
    const[genres,SetGenres]=useState([]);
    
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
            query: { MovieCategory: `${item.categoryvalue}` },
          }}  key={item.categoryvalue+index}>{item.navbarValue}</Link>)}
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
            <SearchBar />
        </nav>
    )
};

export default Navbar;