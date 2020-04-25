import React from 'react';
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  // API 호출이 오래걸릴 수 있기 때문에 async/await을 사용해서 가져올 때 까지 기다림.
  getMovies = async () => {
    const { data: { data: { movies }}}  = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    console.log(movies);
    // { movies: movies} == { movies } 와 동일
    this.setState({ movies, isLoading: false });
  }

  componentDidMount() {
    console.log("componentDidMount success");
    this.getMovies();
  }
  componentDidUpdate() {
    console.log("componentDidUpdate success");
  }
  render() {
    console.log("render success");
    const { isLoading, movies } = this.state;
    return <section className = "container">{isLoading ? (
        <div className = "loader">
          <span className = "loader__text">Loading...</span>
        </div> 
      ) : (
        <div className = "movies">
          { movies.map(movie => (
            <Movie 
              key = {movie.id} 
              id={movie.id} 
              year={movie.year} 
              title={movie.title} 
              summary = {movie.summary}
              genres = {movie.genres}
              poster = {movie.medium_cover_image} />
          ))}
        </div>
      )}</section>
  }
}


export default App;
