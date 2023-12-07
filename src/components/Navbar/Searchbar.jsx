import React, { useState, useEffect } from 'react'
import { options } from '../../ApiInfo';
import Link from 'next/link';
import { ImageUrl } from '../../ApiInfo';
import { useRouter } from 'next/router'

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const router = useRouter()

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

    useEffect(() => {
        setSearchInput('');
        setMovies([]);
        setActors([]);
    }, [router.asPath])

    function handleSearchChange(event) {
        setSearchInput(event.target.value);
        setMovies([]);
        setActors([]);
    }
    console.log(movies);
    return (
        <div className = 'm-7 float-left'>
            <input type='text' placeholder='Search...' value={searchInput} onChange={handleSearchChange} className='text-base rounded-lg w-[200px] h-[30px] text-teal-950 font-bold' />
            {movies.length !== 0 || actors.length !== 0 ? 
                <div className='absolute bg-teal-900  top-22  w-3/12 p-3 rounded-lg text-center z-20 h-[510px] overflow-y-scroll '>
                {movies.length !== 0 ? 
                    <div>
                        {movies.map(movie => <div key={movie.id} className='text-white font-bold p-1 hover:bg-yellow-600 rounded-lg'><Link href={`/movies/${encodeURIComponent(movie.id)}`} className='flex gap-x-1 items-center'><img src={`${ImageUrl}${movie.poster_path}`} width={60} height={60} />{movie.title} ({movie.release_date.substring(0,4)})</Link></div>)}
                    </div>
                : null} 
                {actors.length !== 0 ? 
                    <div>
                        {actors.map(actor => <div key={actor.id} className='text-white font-bold p-1 hover:bg-yellow-600 rounded-lg'><Link href={`/actors/${encodeURIComponent(actor.id)}`} className='flex gap-x-3 items-center'><img src={`${ImageUrl}${actor.profile_path}`} width={60} height={60} />{actor.name}</Link></div>)}
                    </div>
                : null} 
                </div>
            : null}
        </div>
    )
}

export default SearchBar;
