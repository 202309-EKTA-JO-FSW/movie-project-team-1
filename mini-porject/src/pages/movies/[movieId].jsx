import React, {useState, useEffect} from "react";
import { options ,ImageUrl} from '@/ApiInfo';
import { useRouter } from 'next/router'
import Link from 'next/link';


function movieInfo({ movie, cast, similar, video }) {
  const {poster_path ,
         title: name,
         release_date: release,
         runtime: runTime,
         vote_average,
         vote_count: votes
        } = movie;

  const poster = `${ImageUrl}${poster_path}`;
  const language = movie.spoken_languages[0].english_name;
  const movieYear = release ? release.substring(0, 4) : null;
  const rating = Math.ceil(vote_average * 10);
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
  )): null
  const actingCast = (!!cast.cast)?cast.cast.filter((cast) => cast.known_for_department === "Acting" && cast.order < 5): null;
  const listCast = actingCast? actingCast.map( actor => (
    <div key={actor.id}>
      <Link href={`../actors/${actor.id}`} ><img src={`${ImageUrl}${actor.profile_path}`} alt={actor.name} width={"100px"}/></Link>
      <p>{actor.name}</p>
    </div>
  )): null
  const topMovies = (!!similar.results)? similar.results.reduce((result, movie) => {
    if(result.length < 7 && movie.vote_average > 7){
      result.push(movie);
    }
    return result;
  }, []): null;
  const similarMovies = (topMovies)? topMovies.map((movie) => (
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
            <p><b>Release Date:</b> {release}</p>
            <p><b>Duration:</b> {runTime} Minutes</p>
            <p><b>Language:</b> {language}</p>
            <p><b>Rating:</b> {rating}%</p>
            <p><b>Votes:</b> {votes}</p>
            <p><b>Director(s):</b></p>
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
export async function getServerSideProps(context) {
  const { movieId } = context.query;

  try {
    // Movie Details
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    );
    const movie = await movieResponse.json();

    // Credits
    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      options
    );
    const cast = await creditsResponse.json();

    // Similar
    const similarResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      options
    );
    const similar = await similarResponse.json();

    // Video
    const videoResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );
    const video = await videoResponse.json();

    return {
      props: { movie, cast, similar, video },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
export default movieInfo;


