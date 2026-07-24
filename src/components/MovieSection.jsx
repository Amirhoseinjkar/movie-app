import useEmblaCarousel from "embla-carousel-react";
import MovieCard from "./MovieCard";
import "./movieSection.css";
function MovieSection({ title, movies }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  function scrollLeft(){
    emblaApi?.scrollPrev()
  }
  function scrollRight(){
    emblaApi?.scrollNext()
  }

  return (
    <section>
      <div className="section-header">
        <button onClick={scrollLeft}>◀</button>

        <h2>{title}</h2>

        <button onClick={scrollRight}>▶</button>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {movies.map((movie) => (
            <div className="embla__slide" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default MovieSection;
