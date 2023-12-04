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
  const biography = actor.biography;
 //list of movies
  const topMovies = credits.cast.reduce((result, cast) => {
      if (result.length < 7 && cast.vote_average >= 6 && cast.popularity > 35) {
        result.push(cast);
      }
      return result;
    }, []);

    const moviesIn = (topMovies)? topMovies.map((movie) => (
    <div key={movie.id}>
      <Link href={`/movies/${movie.id}`}><img src={`${ImageUrl}${movie.poster_path}`} alt={movie.title} width={"100px"} /></Link>
      <div>{movie.title}</div>
    </div>
  )): null;


  return (
    <>
        <h1>Actor Information</h1>
        <img src={actorPic} alt={actor.name} width={"200px"} />
        <h2>{actorName}</h2>
        <div><b>Gender:</b> {actorGender}</div>
        <div><b>Popularity:</b> {popularity}</div>
        <div><b>Birthday:</b> {birthday} {age?"("+age+" years old"+")": null}</div>
        <div>
          <h3>Biography</h3>
          <p>{biography}</p>
        </div>
        <div>
          <h3>Known For</h3>
          {moviesIn}
        </div>
    </>
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
