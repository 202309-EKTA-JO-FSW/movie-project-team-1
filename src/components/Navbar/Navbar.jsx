import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { options } from '../../ApiInfo';
import SearchBar from './Searchbar';
import Image from 'next/image';

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
        <nav className='overflow-hidden bg-teal-950 font-[Arial] h-20'>
            <Link href='/' className='float-left text-white text-center p-4'>
            <Image src='/Images/logo.svg' alt='FilmFusion Logo' width={300}
            height={36} className='float left p-2' />
            </Link>
            <div className='group float-left overflow-hidden'>
                <div className='float-left text-white text-center text-xl p-4 hover:text-yellow-600 hover:rounded-lg m-3 cursor-default'>Movies</div>
                <div className='group-hover:block hidden absolute bg-teal-900 text-white top-16 shadow-2xl w-36 z-20 rounded-lg'>
                    {movieCategory.map((item,index) => <Link  href={{
                        pathname: '/movies',
                        query: { MovieCategory: `${item.categoryvalue}` },
                    }}  
                    key={item.categoryvalue+index}
                    className='block py-5 px-4 hover:text-yellow-600 text-center rounded-lg'>{item.navbarValue}</Link>)}
                </div>
            </div>
            <div className='group float-left overflow-hidden'>
                <div className='float-left text-white text-center text-xl p-4 hover:text-yellow-600 m-3 cursor-default hover:rounded-lg'>Genres</div>
                <div className='group-hover:flex flex-col flex-wrap hidden absolute bg-teal-900 text-white top-16 shadow-2xl h-4/6 w-auto z-20 rounded-lg'>
                    {genres.map((genre) =>  <Link href={{
                        pathname: '/movies',
                        query: { GenreID: `${genre.id}` },
                    }}
                    key={genre.id} className='block py-5 px-3 hover:text-yellow-600 text-center rounded-lg'>{genre.name}</Link>)}
                </div>
            </div>
            <Link href='/actors' className='float-left text-white text-center text-xl p-4 hover:text-yellow-600 m-3 hover:rounded-lg'>Actors</Link>
            <SearchBar />
        </nav>
    )
};

export default Navbar;