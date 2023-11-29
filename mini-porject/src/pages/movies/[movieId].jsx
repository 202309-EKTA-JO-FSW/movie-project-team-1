import React, {useState, useEffect} from "react";
import { options ,ImageUrl} from '@/ApiInfo';
import { useRouter } from 'next/router'
import Link from 'next/link';


function movieInfo(){
     const router = useRouter()
     const id = router.query.movieId;
     console.log(id);
     //const id = 901362;
     const [movie, setMovie] = useState({});
     const [cast, setCast] = useState({});
     const [similar, setSimilar] = useState({});
     const [video, setVideo] = useState({});
    
      useEffect(() => {
        //Movie Details
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
          .then(response => response.json())
          .then(response => setMovie(response))
          .catch(err => console.error(err));
        //Credits
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
          .then(response => response.json())
          .then(response => setCast(response))
          .catch(err => console.error(err));
        //Similar
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options)
          .then(response => response.json())
          .then(response => setSimilar(response))
          .catch(err => console.error(err));
        //Video
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
          .then(response => response.json())
          .then(response => setVideo(response))
          .catch(err => console.error(err));
      }, []);
      
      
    
      
      const poster =(!!movie.poster_path)? `${ImageUrl}${movie.poster_path}`:null;
      const name = movie.original_title;
      const release = movie.release_date;
      const movieYear = (release)? release.substring(0, 4): null;
      const runTime = movie.runtime;
      const language = movie.original_language;
      const rating = Math.ceil(movie.vote_average * 10);
      const votes = movie.vote_count;
      const director = (!!cast.crew)? cast.crew.filter((dir) => dir.job === "Director"): null;
      const overview = movie.overview;
      let trailer = (!!video.results)? video.results.filter((trailer) => trailer.name === "Official Trailer"): null;
      if(trailer == null){
        trailer = (!!video.results)? video.results.filter((trailer) => trailer.official === true): null;
      }
      const offTrailer = trailer !=null ? trailer[0]!=null ? trailer[0].key: null: null;
      const companyName = (!!movie.production_companies) && movie.production_companies.length>0? movie.production_companies[0].name: null;
      const companyImg = (!!movie.production_companies) && movie.production_companies.length>0 ? movie.production_companies[0].logo_path: null;
      
      const listDir = director? director.map((dir) => (
        <div key={dir.id}>
            <p>{dir.name}</p>
        </div>
      )): null;

      const actingCast = (!!cast.cast)?cast.cast.filter((cast) => cast.known_for_department === "Acting" && cast.order < 5): null

      const listCast = actingCast? actingCast.map( actor => (
        <div key={actor.id}>
          <img src={`${ImageUrl}${actor.profile_path}`} alt={actor.name} width={"100px"}/>
          <p>{actor.name}</p>
        </div>
      )): null;

      const similarMovies = (!!similar.results)? similar.results.map(movie => (
        <div key={movie.id}>
            {(!!movie.poster_path) &&  <Link href={`/movies/${movie.id}`}><img src={`${ImageUrl}${movie.poster_path}`} alt={movie.title} width={"100px"}/></Link>}
            <p>{movie.title}</p>
        </div>
      )): null;

    return (
        <>
            <h1>Single Movie Page</h1>
            <img src={poster} alt="movie poster" width="200px"/>
            <h2>{name} ({movieYear}) </h2>
            <p>{release}</p>
            <p>{runTime} Minutes</p>
            <p>Language: {language}</p>
            <p>Rating: {rating}%</p>
            <p>Votes: {votes}</p>
            <p>Director:</p>
            {listDir}
            <div>
                <h3>Overview</h3>
                <p>{overview}</p>
            </div>
            <h3>Cast</h3>
            {listCast}
            <h3>Recommendations</h3>
            {similarMovies} 
            {offTrailer &&   <iframe width="420" height="315"
              src={`https://www.youtube.com/embed/${offTrailer}`} >
            </iframe>}
          
            <div>
              {(!!companyImg) && <img src={`${ImageUrl}${companyImg}`} alt={companyName} width={"200px"}/>}
              <h3><b>{companyName}</b></h3>
            </div>
        </>
    )
}

export default movieInfo;

