import { useEffect, useState } from "react";
import { fetchMovies } from "../api/moviesAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movies/movieSlice";

export default function ListingPage() {
  const [movies, setMoviesState] = useState<[] | null>([]);
  const navigate = useNavigate();

  const dispatcher = useDispatch();
  useEffect(() => {
    const assign = async () => {
      const fetchMovie = await fetchMovies();
      const movies = fetchMovie.data;
      setMoviesState(movies);
      dispatcher(setMovies(movies));
    };
    assign();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-8">
          {movies?.map((item: any) => (
            <div
              key={item?.id} // ✅ Added unique key
              className="relative flex flex-col items-center group space-y-2 p-4 w-11/12 rounded-lg mx-auto my-6 "
            >
              <div
                className="absolute -top-10 hidden z-20 group-hover:block w-full h-full"
                onClick={() => navigate(`/edit-movie/${item.id}`)}
              >
                <FontAwesomeIcon icon={faEdit} size="lg" color="white" />
              </div>
              <div className="relative items-center justify-center flex ">
                <div className="bg-[#f68e26] rounded-full w-12 h-12 text-center text-white justify-center items-center flex absolute -top-6 z-10 ">
                  {item?.ratting}
                </div>
                <img
                  className="w-60 h-80 rounded-sm object-cover brightness-90 shadow-black shadow-xl "
                  src={item?.poster}
                  alt={item?.name}
                />
                <div className="bg-black/60 w-full absolute bottom-0">
                  <p className="text-sm text-white text-justify px-2 pt-2">
                    Actors: {item?.actors.map((item: any) => `${item.name},`)}
                  </p>
                  <p className="text-sm text-white text-justify px-2 pb-2">
                    producer: {item?.producer.name}
                  </p>
                </div>
              </div>
              <p className="text-white text-sm mt-4">{item?.year_of_release}</p>
              <h1 className="px-3 py-1 -mt-2 rounded-md text-center text-white">
                {item?.name}
              </h1>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-400 mb-8 rounded-md px-4 py-2 text-xl"
          onClick={() => navigate("/add-new-movie")}
        >
          Add New Movie
        </button>
      </div>
    </>
  );
}
