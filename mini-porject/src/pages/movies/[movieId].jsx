import { options ,ImageUrl} from '@/ApiInfo';
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
    const language = movie.spoken_languages;
    const movieYear = release ? release.substring(0, 4) : null;
    const rating = Math.ceil(vote_average * 10);
    const director = cast.crew.filter((dir) => dir.job === "Director");
    const overview = movie.overview;
    const trailer = video.results.filter((trailer) => trailer.type === "Trailer");
    const hours = Math.floor(runTime/60);
    const minutes = runTime % 60;
    const offTrailer = trailer !==null ? trailer[0].key: null;
    const companyName =  movie.production_companies.length>0? movie.production_companies[0].name: null;
    const companyImg =  movie.production_companies.length>0 ? movie.production_companies[0].logo_path: null;

    const allLanguages = language.map((lang) => (
        <div key={lang.english_name}>{lang.english_name}</div>
      ))
    
    
    const listDir = director? director.map((dir) => (
      <div key={dir.id}>
          <p>{dir.name}</p>
      </div>
    )): null;

    const actingCast = cast.cast.filter((cast) => cast.known_for_department === "Acting" && cast.order < 5);

    const listCast = actingCast? actingCast.map( actor => (
      <div key={actor.id}>
        <Link href={`../actors/${actor.id}`} ><img src={`${ImageUrl}${actor.profile_path}`} alt={actor.name} width={"100px"}/></Link>
        <p><b>{actor.name}</b> as {actor.character}</p>
      </div>
    )): null

    const topMovies = similar.results.reduce((result, movie) => {
      if(result.length < 7 && movie.vote_average > 7){
        result.push(movie);
      }
      return result;
    }, []);
    
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
            <p><b>Duration:</b> {hours}h{minutes}m</p>
            <div>
              <b>Language(s):</b>
              {allLanguages}
            </div> 
            <p><b>Rating:</b> {rating}% ({votes} Rating{votes !== 1? "s":null})</p>
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
            {offTrailer && <iframe width="420" height="315"
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


