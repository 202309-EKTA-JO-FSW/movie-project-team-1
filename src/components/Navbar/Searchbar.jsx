import React, { useState, useEffect } from 'react'
import { options } from '../../ApiInfo';
import Link from 'next/link';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        if (searchInput !== '') {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchInput)}`, options)
                .then(response => response.json())
                .then(response => setMovies(response.results))
                .catch(err => console.error(err));
            fetch(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(searchInput)}`, options)
                .then(response => response.json())
                .then(response => setActors(response.results))
                .catch(err => console.error(err));
        }
      }, [searchInput]);

    function handleSearchChange(event) {
        setSearchInput(event.target.value);
        setMovies([]);
        setActors([]);
    }

    return (
        <div className = 'm-3'>
            <input type='text' value={searchInput} onChange={handleSearchChange} />
            {movies.length !== 0 ? 
                <div>
                    {movies.map(movie => <Link key={movie.id} href={`/movies/${encodeURIComponent(movie.id)}`}>{movie.title}</Link>)}
                </div>
            : null} 
            {actors.length !== 0 ? 
                <div>
                    {actors.map(actor => <Link key={actor.id} href={`/actors/${encodeURIComponent(actor.id)}`}>{actor.name}</Link>)}
                </div>
            : null} 
        </div>
    )
}

export default SearchBar;