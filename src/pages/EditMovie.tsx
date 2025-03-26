import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, FormEvent } from "react";

interface MovieFormData {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Actors: {
    name: string;
    gender: string;
    dob: string;
    bio: string;
  }[];
  Producer: {
    name: string;
    gender: string;
    dob: string;
    bio: string;
  };
}

export default function EditMovie() {
  const location = useLocation();
  const movieId = location.state?.movieId;
  const movie = useSelector(
    (state: { movie: { movies: MovieFormData[] } }) => state.movie.movies
  );
  const movieDetail = movie.find((movie) => movie.imdbID === movieId);

  const [formData, setFormData] = useState<MovieFormData>({
    imdbID: movieDetail?.imdbID || "",
    Title: movieDetail?.Title || "",
    Year: movieDetail?.Year || "",
    Poster: movieDetail?.Poster || "",
    Plot: movieDetail?.Plot || "",
    Actors: movieDetail?.Actors || [
      { name: "", gender: "Male", dob: "", bio: "" },
    ],
    Producer: movieDetail?.Producer || {
      name: "",
      gender: "Male",
      dob: "",
      bio: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleActorChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      Actors: prev.Actors.map((actor, i) =>
        i === index ? { ...actor, [field]: value } : actor
      ),
    }));
  };

  const handleProducerChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      Producer: { ...prev.Producer, [field]: value },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full h-dvh rounded-lg flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-10/12 h-9/12 rounded-lg space-y-8 justify-center items-center flex-col grid grid-cols-2"
      >
        <div className="space-y-14">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Movie Title:</p>
                <input
                  value={formData.Title}
                  onChange={(e) => handleInputChange(e, "Title")}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-white">Year of Release:</p>
                <input
                  value={formData.Year}
                  onChange={(e) => handleInputChange(e, "Year")}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">Poster:</p>
              <input
                value={formData.Poster}
                onChange={(e) => handleInputChange(e, "Poster")}
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
          <div>
            {formData.Actors.map((actor, index) => (
              <div key={index} className="mb-4">
                <div className="w-full">
                  <p className="text-white">Actor:</p>
                  <input
                    value={actor.name}
                    onChange={(e) =>
                      handleActorChange(index, "name", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <p className="text-white">Gender:</p>
                    <select
                      value={actor.gender}
                      onChange={(e) =>
                        handleActorChange(index, "gender", e.target.value)
                      }
                      className="px-4 py-2 bg-white rounded-lg w-full my-2"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <p className="text-white">DOB:</p>
                    <input
                      value={actor.dob}
                      onChange={(e) =>
                        handleActorChange(index, "dob", e.target.value)
                      }
                      className="px-4 py-2 bg-white rounded-lg w-full my-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-white">BIO:</p>
                  <input
                    value={actor.bio}
                    onChange={(e) =>
                      handleActorChange(index, "bio", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="w-full">
              <p className="text-white">Producer Name:</p>
              <input
                value={formData.Producer.name}
                onChange={(e) => handleProducerChange("name", e.target.value)}
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Gender:</p>
                <select
                  value={formData.Producer.gender}
                  onChange={(e) =>
                    handleProducerChange("gender", e.target.value)
                  }
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-full">
                <p className="text-white">DOB:</p>
                <input
                  value={formData.Producer.dob}
                  onChange={(e) => handleProducerChange("dob", e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">BIO:</p>
              <input
                value={formData.Producer.bio}
                onChange={(e) => handleProducerChange("bio", e.target.value)}
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
        </div>
        <div className="mx-8 h-full">
          <p className="text-white">Plot:</p>
          <textarea
            value={formData.Plot}
            onChange={(e) => handleInputChange(e, "Plot")}
            className="px-4 py-2 bg-white rounded-lg w-full my-2 h-11/12"
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
