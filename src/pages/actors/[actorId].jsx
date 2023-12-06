import {options,ImageUrl} from "@/ApiInfo"
import Link from 'next/link';


function ActorInfo({ actor, credits, allActors }) {

  function calculateAge(){
    if(actor.deathday === null){
    const birthDate = new Date (actor.birthday);
    const currentDate = new Date();
    const age = birthDate? currentDate.getFullYear() - birthDate.getFullYear(): null;
    return age;
    }
    else{
      return null;
    }
  }

  // const movieReleaseDate = credits.cast.release_date;
  const age = calculateAge();
  const actorPic = `${ImageUrl}${actor.profile_path}`;
  const actorName = actor.name;
  const actorGender = actor.gender === 1 ? 'Female' : 'Male';
  //calculate avg popularity
  const allPopularities = allActors.results.map((acc) =>  acc.popularity );
  const sumPopularities = (allPopularities)? allPopularities.reduce((sum, val) => sum + val, 0): null;
  const avgPopularities = (sumPopularities)? sumPopularities / allPopularities.length: null;
  const popularity = actor.popularity > (avgPopularities - 10)? "High": "Low";

  const birthday = actor.birthday;
  const allBiography = actor.biography.split('.');
  const biography = allBiography.map((bio) => (
    bio !== ""?<li key={bio} className="">{bio}. <br /></li>: null
  ));

 //list of movies
  const topMovies = credits.cast.reduce((result, cast) => {
      if (result.length < 7 && cast.vote_average >= 6.5 ) {
        result.push(cast);
      }
      return result;
    }, []);

    const moviesIn = (topMovies)? topMovies.map((movie) => (
    <div key={movie.id} className="hover:text-slate-400 ml-5 mr-3 mt-8 p-2 text-center border-2 border-grey drop-shadow-xl rounded-lg bg-stone-200 min-w-[165px] min-h-[290px] max-w-[170px] transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300">
      <Link href={`/movies/${movie.id}`}><img className="rounded-2xl h-[224px] w-[145px] m-auto" src={`${ImageUrl}${movie.poster_path}`} alt={movie.title} /></Link>
      <div className='break-normal'>{movie.title} ({movie.release_date.substring(0,4)})</div>
    </div>
  )): null;

//"bg-gradient-to-r from-cyan-500 to-red-500"
  return (
    <div className='to-red-500 pb-10'>
      <div className="flex flex-row justify-start">  
        <img src={actorPic} alt={actor.name} className='border-2 border-grey drop-shadow-xl ml-10 rounded-xl mt-7 h-ma  box-content w-[450px] h-[680px]' />
        <div class='mt-10'>
          <h2 className='text-4xl font-bold ml-14'>{actorName}</h2>
          <div className="text-2xl ml-14 mt-3"><b>Gender:</b> {actorGender}</div>
          <div className="text-2xl ml-14 mt-3"><b>Popularity:</b> {popularity}</div>
          <div className="text-2xl ml-14 mt-3"><b>Birthday:</b> {birthday} {age?"("+age+" years old"+")": null}</div>
          <div>
            <b className="text-2xl ml-14 mt-3">Biography</b>
            <ul className="ml-20 mr-14  list-disc list-inside">{biography}</ul>
          </div>
        </div>
      </div>
        <div>
          <h3 className="text-3xl font-bold ml-10 mt-10">Known For</h3>
          <div className="flex flex-row ml-10 justify-start">
            {moviesIn}
          </div>
        </div>
    </div>
  )
}
//
export async function getServerSideProps(context) {
  const { actorId } = context.query;

  // Fetch actor data using actorId
  const actorResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}?language=en-US`,options);
  const actor = await actorResponse.json();
  

  // Fetch actor movie credits
  const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`,options);
  const credits = await creditsResponse.json();

  // Fetch all actors for popularity comparison
  const allActorsResponse = await fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1',options);
  const allActors = await allActorsResponse.json();

  return {
    props: {
      actor,
      credits,
      allActors,
    },
  };
}

export default ActorInfo;
