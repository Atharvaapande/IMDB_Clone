import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, FormEvent } from "react";

interface MovieFormData {
  id: string;
  name: string;
  year_of_release: string;
  poster: string;
  plot: string;
  actors: {
    name: string;
    gender: string;
    dob: string;
    bio: string;
  }[];
  producer: {
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

  const movieDetail = movie.find((movie) => movie.id === movieId) || {
    id: "",
    name: "",
    year_of_release: "",
    poster: "",
    plot: "",
    actors: [{ name: "", gender: "Male", dob: "", bio: "" }],
    producer: { name: "", gender: "Male", dob: "", bio: "" },
  };

  const [formData, setFormData] = useState<MovieFormData>({
    id: movieDetail.id,
    name: movieDetail.name,
    year_of_release: movieDetail.year_of_release,
    poster: movieDetail.poster,
    plot: movieDetail.plot,
    actors: movieDetail.actors,
    producer: movieDetail.producer,
  });

  const [showActorForm, setShowActorForm] = useState(false);
  const [showProducerForm, setShowProducerForm] = useState(false);
  const [newActor, setNewActor] = useState({
    name: "",
    gender: "Male",
    dob: "",
    bio: "",
  });
  const [newProducer, setNewProducer] = useState({
    name: "",
    gender: "Male",
    dob: "",
    bio: "",
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
      actors: prev.actors.map((actor, i) =>
        i === index ? { ...actor, [field]: value } : actor
      ),
    }));
  };

  const handleProducerChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      producer: { ...prev.producer, [field]: value },
    }));
  };

  const handleNewActorChange = (field: string, value: string) => {
    setNewActor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewProducerChange = (field: string, value: string) => {
    setNewProducer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddActor = () => {
    setFormData((prev) => ({
      ...prev,
      actors: [...prev.actors, newActor],
    }));
    setNewActor({ name: "", gender: "Male", dob: "", bio: "" });
  };

  // const handleAddProducer = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     producer: newProducer,
  //   }));
  //   setNewProducer({ name: "", gender: "Male", dob: "", bio: "" });
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full my-16 py-8 rounded-lg flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-10/12 h-9/12 rounded-lg space-y-8 justify-center items-center grid grid-cols-1 md:grid-cols-2"
      >
        {/* Form content */}
        <div className="space-y-10">
          {/* Movie Title, Year, and Poster */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Movie Title:</p>
                <input
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-white">Year of Release:</p>
                <input
                  value={formData.year_of_release}
                  onChange={(e) => handleInputChange(e, "year_of_release")}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">Poster:</p>
              <input
                value={formData.poster}
                onChange={(e) => handleInputChange(e, "poster")}
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
          {/* Actors */}
          <div>
            <div className="flex space-x-4 overflow-x-auto">
              {formData.actors.map((actor, index) => (
                <div key={index} className="flex-shrink-0">
                  <p className="text-white">{actor.name}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowActorForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
            >
              Add More Actors
            </button>
            {showActorForm && (
              <div className="mt-4">
                <div className="w-full">
                  <p className="text-white">Actor Name:</p>
                  <input
                    value={newActor.name}
                    onChange={(e) =>
                      handleNewActorChange("name", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <p className="text-white">Gender:</p>
                    <select
                      value={newActor.gender}
                      onChange={(e) =>
                        handleNewActorChange("gender", e.target.value)
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
                      value={newActor.dob}
                      onChange={(e) =>
                        handleNewActorChange("dob", e.target.value)
                      }
                      className="px-4 py-2 bg-white rounded-lg w-full my-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-white">BIO:</p>
                  <input
                    value={newActor.bio}
                    onChange={(e) =>
                      handleNewActorChange("bio", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddActor}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors"
                >
                  Save Actor
                </button>
              </div>
            )}
          </div>
          {/* Producer */}
          <div>
            <div className="flex space-x-4 overflow-x-auto">
              <div className="flex-shrink-0">
                <p className="text-white">{formData.producer.name}</p>
              </div>
            </div>
            {/* <button
              type="button"
              onClick={() => setShowProducerForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
            >
              Add More Producers
            </button> */}
            {/* {showProducerForm && (
              <div className="mt-4">
                <div className="w-full">
                  <p className="text-white">Producer Name:</p>
                  <input
                    value={newProducer.name}
                    onChange={(e) =>
                      handleNewProducerChange("name", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <p className="text-white">Gender:</p>
                    <select
                      value={newProducer.gender}
                      onChange={(e) =>
                        handleNewProducerChange("gender", e.target.value)
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
                      value={newProducer.dob}
                      onChange={(e) =>
                        handleNewProducerChange("dob", e.target.value)
                      }
                      className="px-4 py-2 bg-white rounded-lg w-full my-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-white">BIO:</p>
                  <input
                    value={newProducer.bio}
                    onChange={(e) =>
                      handleNewProducerChange("bio", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddProducer}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors"
                >
                  Save Producer
                </button>
              </div>
            )} */}
          </div>
        </div>
        {/* Plot */}
        <div className="mx-8 h-full">
          <p className="text-white">Plot:</p>
          <textarea
            value={formData.plot}
            onChange={(e) => handleInputChange(e, "plot")}
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
