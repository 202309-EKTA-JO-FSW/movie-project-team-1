export const APIAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDJmNjMzN2M2Yjc2ZTFjZWVjOTJmNzc3MWI3ODMyNyIsInN1YiI6IjY1NjViZWY2ODlkOTdmMDEzOGZlZDM5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZJv8-MbV9dMPLX55zdGAJySlSCajcRjCCKyZ0O5c7y4";

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ APIAccessToken
    }
  };

  export const ImageUrl ="https://image.tmdb.org/t/p/original/";