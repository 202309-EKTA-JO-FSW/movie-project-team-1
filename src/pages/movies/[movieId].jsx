import { options ,ImageUrl} from '@/ApiInfo';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReadMoreReadLess from '../../../ReadMoreReadLess';

function movieInfo({ movie, cast, similar, video}) {
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
    const trailer = video.results.length !== 0?  video.results.filter((trailer) => trailer.type === "Trailer"): null;
    const offTrailer = trailer !== null ? trailer[0].key: null;
    const hours = Math.floor(runTime/60);
    const minutes = runTime % 60;

    const companyName =  movie.production_companies.length>0? movie.production_companies[0].name: null;
    const companyImg =  movie.production_companies.length>0 ? movie.production_companies[0].logo_path: null;
    const genres = movie.genres.map((genre) => (
        <span key={genre.id}>{genre.name}&nbsp;.&nbsp;</span>
    ))

    const allLanguages = language.map((lang) => (
        <div key={lang.english_name}>{lang.english_name}</div>
      ))
    
    
    const listDir = director? director.map((dir) => (
      <div key={dir.id}>
          <p>{dir.name}</p>
      </div>
    )): null;

    const actingCast = cast.cast.filter((cast) => cast.known_for_department === "Acting" && cast.order < 7);

    const listCast = actingCast? actingCast.map( actor => (
      <div key={actor.id} className='hover:text-slate-400	mx-5 p-2 text-center border-2 border-grey drop-shadow-xl rounded-lg bg-stone-200 min-w-[170px] min-h-[290px] max-w-[171px] transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300'>
        <Link href={`../actors/${actor.id}`} ><img className='rounded-lg m-auto h-56 w-[150px]' src={`${ImageUrl}${actor.profile_path}`} alt={actor.name} /></Link>
        <Link href={`../actors/${actor.id}`} ><div><b>{actor.name}</b></div></Link>
        <div>{actor.character}</div>
      </div>
    )): null

    const topMovies = similar.results.reduce((result, movie) => {
      if(result.length < 7 && movie.vote_average > 6){
        result.push(movie);
      }
      return result;
    }, []);
    
    const similarMovies = (topMovies)? topMovies.map((movie) => (
      <div key={movie.id} className='hover:text-slate-400	ml-5 mr-3 mt-2 p-2 text-center border-2 border-grey drop-shadow-xl rounded-lg bg-stone-200 min-w-[170px] min-h-[290px] max-w-[171px] transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300'>
          {(!!movie.poster_path) &&  <Link href={`/movies/${movie.id}`}><img className='rounded-2xl h-56 w-[150px] m-auto' src={`${ImageUrl}${movie.poster_path}`} alt={movie.title} /></Link>}
          <Link href={`/movies/${movie.id}`}><p className='break-normal'>{movie.title} ({movieYear})</p></Link>
      </div>
    )): null;
   
    let pathColor;
    let trailColor;
    function setRatingColors(rate, path, trail){
      if(rate >= 70){
        path = '#20c674';
        trail = '#1e482c';
      }
      else if(rate < 40){
        path = '#ce255e';
        trail = '#56203c';
      }
      else{
        path = '#c9cc2f';
        trail = '#454211';
      }
      pathColor = path;
      trailColor = trail;
    }
    setRatingColors(rating, pathColor, trailColor)
    
    //bg-gradient-to-r from-cyan-500 to-red-500
    return (
        <div className="">
          <div className='flex mb-10 justify-start pb-10'>
            
            <img src={poster} alt="movie poster" className='border-2 border-grey drop-shadow-xl ml-10 rounded-xl mt-7 h-ma  box-content w-88 h-[510px]' />
            
            <div className='mt-10'>
              <h2 className='text-4xl font-bold ml-14'>{name} ({movieYear}) </h2>
              <span className='text-lg ml-14 mt-5'><b className='text-2xl'>Genre(s):</b> {genres}</span>
              <p className='text-2xl ml-14 mt-3'><b>Release Date:</b> {release}</p>
              <p className='text-2xl ml-14 mt-3'><b>Duration:</b> {hours !== 0? hours+"h": null}{minutes !== 0? minutes+"m": null}</p>
              <p className='text-2xl text-2xl ml-14 mt-5'>
                <b>Rating: </b>
                <b><CircularProgressbar
                  value={rating} 
                  text={`${rating}%`} 
                  background 
                  backgroundPadding={6}
                  className='inline cursor-default	 max-w-[60px] max-h-[60px] transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300'
                  styles={buildStyles({
                    pathTransitionDuration: 0.5,
                    textSize: '30px',
                    trailColor: trailColor,
                    pathColor: pathColor,                  
                    backgroundColor: '#0f172a',
                    textColor: 'white',
                  })}
                  /></b>
                &nbsp;
                ({votes} Rating{votes !== 1? "s":null})
              </p>
              <div className='text-2xl ml-14 mt-2'>
                <b>Language(s):</b>
                {allLanguages}
              </div> 
              <div className='text-l ml-14 mt-3'>
                <b className='text-2xl'>Director(s):</b>
                {listDir}
              </div>
              <div className='text-l ml-14 mt-3 mr-28'>
                  <h3 className='text-xl font-bold'>Overview</h3>
                  <ReadMoreReadLess text={overview} maxLength={250} movieName={name}/>
              </div>
            </div>

          </div>
          <div className=''>
            <h3 className='text-2xl font-bold ml-10 mb-3'>Cast</h3>
            <div className='flex flex-row ml-10 justify-start justify-items-center'>
              {listCast}
            </div>
            {offTrailer && <h3 className='text-2xl font-bold ml-10 mb-3 mt-5'>Trailer</h3>}
            {offTrailer && <iframe className='place-content-center ml-14 rounded-xl w-[720px] h-[400px]' 
              src={`https://www.youtube.com/embed/${offTrailer}`} >
            </iframe>}
            <h3 className='text-2xl font-bold ml-10 mb-3 mt-5'>Recommendations</h3>
            <div className='flex flex-row ml-10 justify-start justify-items-center'>
              {similarMovies}
            </div>
            {companyName && <h3 className='text-2xl font-bold ml-10 mb-3 mt-5'>Production Company</h3>}
            <div >
              {(!!companyImg) && <img src={`${ImageUrl}${companyImg}`} alt={companyName} className='ml-20' width={"200px"}/>}
              <h3 className='pb-7 font-serif ml-20'><b>{companyName}</b></h3>
            </div>
            </div>
        </div>
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
      props: { movie, cast, similar, video},
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
export default movieInfo;


