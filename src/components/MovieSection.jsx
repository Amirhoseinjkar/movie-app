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
    <h2>{title}</h2>
  </div>

  <div className="slider-wrapper">
    <button onClick={scrollLeft} className="sliderBtn">{"<"}</button>

    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {movies.map((movie) => (
          <div className="embla__slide" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>

    <button onClick={scrollRight} className="sliderBtn">{">"}</button>
  </div>
</section>
  );
}
export default MovieSection;
