import React, {useState, useEffect} from 'react'
import {options,ImageUrl} from "@/ApiInfo"
import {useRouter} from 'next/router';
import Link from 'next/link';

// function ActorInfo() {
//  const router = useRouter();
//  const id  = router.query.actorId;
//  //const id = 556356;
//  const [actor, setActor] = useState({});
//  const [credits, setCredits] = useState({});
//  const [allActors, setAllActors] = useState({});
//  const [age, setAge] = useState('');
 
//  useEffect(() => {
//     //Single Actor
//     fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options)
//         .then(response => response.json())
//         .then(response =>{ 
//           const birthDate = new Date(response.birthday);
//           const currentDate = new Date();
//           let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
//           setAge(calculatedAge);
//           setActor(response)})
//         .catch(err => console.error(err));
//     //actor movies
//     fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, options)
//           .then(response => response.json())
//           .then(response => setCredits(response))
//           .catch(err => console.error(err));
//     //All Actors
//     fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
//           .then(response => response.json())
//           .then(response => setAllActors(response))
//           .catch(err => console.error(err));
//  }, [])

//  const actorPic = (!!actor.profile_path)?`${ImageUrl}${actor.profile_path}`: null;
//  const actorName = actor.name;
//  const actorGender = (actor.gender === 1)? "Female": "Male";
//  //calculate avg popularity
//  const allPopularities = (!!allActors.results)? allActors.results.map((acc) =>  acc.popularity ): null;
//  const sumPopularities = (allPopularities)? allPopularities.reduce((sum, val) => sum + val, 0): null;
//  const avgPopularities = (sumPopularities)? sumPopularities / allPopularities.length: null;
//  const popularity = actor.popularity > (avgPopularities - 10)? "High": "Low";

//  const birthday = actor.birthday;
//  const biography = actor.biography;
//  //list of movies
//  const topMovies = (!!credits.cast)? credits.cast.reduce((result, cast) => {
//       if (result.length < 7 && cast.vote_average >= 6 && cast.popularity > 35) {
//         result.push(cast);
//       }
//       return result;
//     }, []): null;
//  const moviesIn = (topMovies)? topMovies.map((movie) => (
//     <div key={movie.id}>
//       <Link href={`/movies/${movie.id}`}><img src={`${ImageUrl}${movie.poster_path}`} alt={movie.title} width={"100px"} /></Link>
//       <div>{movie.title}</div>
//     </div>
//   )): null;


//   return (
//     <>
//         <h1>Actor Information</h1>
//         <img src={actorPic} alt={actor.name} width={"200px"} />
//         <h2>{actorName}</h2>
//         <div><b>Gender:</b> {actorGender}</div>
//         <div><b>Popularity:</b> {popularity}</div>
//         <div><b>Birthday:</b> {birthday} ({age} years old)</div>
//         <div>
//           <h3>Biography</h3>
//           <p>{biography}</p>
//         </div>
//         <div>
//           <h3>Known For</h3>
//           {moviesIn}
//         </div>
//     </>
//   )
// }

// export default ActorInfo;


function ActorInfo({ actor, credits, allActors }) {
  const router = useRouter();
  const id = router.query.actorId;

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

  const actorPic = (!!actor.profile_path) ? `${ImageUrl}${actor.profile_path}` : null;
  const actorName = actor.name;
  const actorGender = actor.gender === 1 ? 'Female' : 'Male';
  //calculate avg popularity
 const allPopularities = (!!allActors.results)? allActors.results.map((acc) =>  acc.popularity ): null;
 const sumPopularities = (allPopularities)? allPopularities.reduce((sum, val) => sum + val, 0): null;
 const avgPopularities = (sumPopularities)? sumPopularities / allPopularities.length: null;
 const popularity = actor.popularity > (avgPopularities - 10)? "High": "Low";

 const birthday = actor.birthday;
 const biography = actor.biography;
 //list of movies
 const topMovies = (!!credits.cast)? credits.cast.reduce((result, cast) => {
      if (result.length < 7 && cast.vote_average >= 6 && cast.popularity > 35) {
        result.push(cast);
      }
      return result;
    }, []): null;
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
