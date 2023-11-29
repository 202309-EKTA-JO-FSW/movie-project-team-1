import React, { useState } from 'react';
import Link from 'next/link';

function Navbar()  {
    const movieCategory = ['Top Rate', 'Popular', 'Latest', 'Now Playing', 'Upcoming'];

    const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'];

    return (
        <nav>
            <Link href='/'>Logo</Link>
            <div className='dropdown'>
                <Link href='/' className='dropdown-link'>Movies</Link>
                <div className='dropdown-content'>
                    {movieCategory.map((category) => <a href='' key={category}>{category}</a>)}
                </div>
            </div>
            <div className='dropdown'>
                <Link href='/' className='dropdown-link'>Genres</Link>
                <div className='dropdown-content'>
                    {genres.map((genre) => <a href='' key={genre}>{genre}</a>)}
                </div>
            </div>
            <Link href='/'>Actors</Link>
        </nav>
    )
};

export default Navbar;