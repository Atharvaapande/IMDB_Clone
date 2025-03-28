import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { createMovie } from "../api/moviesAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function AddNewMovie() {
  const [formData, setFormData] = useState({
    name: "",
    year_of_release: "",
    poster: "",
    poster_landscape: "",
    rating: 0,
    plot: "",
    actors: [],
    producer: {
      image: "",
      name: "",
      gender: "Male",
      dob: "",
      bio: "",
    },
  });
  const [newActor, setNewActor] = useState({
    image: "",
    name: "",
    gender: "Male",
    dob: "",
    bio: "",
  });
  const [selectedActorIndex, setSelectedActorIndex] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewActorChange = (field: string, value: string) => {
    setNewActor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProducerChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      producer: {
        ...prev.producer,
        [field]: value,
      },
    }));
  };

  const handleAddActor = () => {
    setFormData((prev) => ({
      ...prev,
      actors: [...prev.actors, newActor],
    }));
    setNewActor({ image: "", name: "", gender: "Male", dob: "", bio: "" });
  };

  const handleSelectActor = (index: number) => {
    setSelectedActorIndex(index);
    setNewActor(formData.actors[index]);
  };

  const handleUpdateActor = () => {
    setFormData((prev) => {
      const updatedActors = [...prev.actors];
      updatedActors[selectedActorIndex!] = newActor;
      return {
        ...prev,
        actors: updatedActors,
      };
    });
    setSelectedActorIndex(null);
    setNewActor({ image: "", name: "", gender: "Male", dob: "", bio: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await createMovie(formData);
      if (response.success === true) {
        console.log("Movie created successfully:", response.data);
        navigate("/");
      } else {
        console.error("Failed to create movie");
      }
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="w-full h-max my-16 py-8 rounded-lg flex flex-col justify-center items-center">
      {/* <img
        src={formData.poster_landscape}
        className="w-8/12 h-[660px] mb-16 object-fill rounded-sm brightness-90 shadow-black shadow-xl"
        alt="Poster Landscape"
      /> */}
      <form
        onSubmit={handleSubmit}
        className="w-10/12 h-9/12 rounded-lg space-y-8 justify-center items-center grid grid-cols-1 md:grid-cols-2"
      >
        <div className="space-y-10">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Movie Title:</p>
                <input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-white">Year of Release:</p>
                <input
                  value={formData.year_of_release}
                  onChange={(e) =>
                    handleInputChange("year_of_release", e.target.value)
                  }
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">Poster:</p>
              <input
                value={formData.poster}
                onChange={(e) => handleInputChange("poster", e.target.value)}
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
            <div className="w-full">
              <p className="text-white">Poster Landscape:</p>
              <input
                value={formData.poster_landscape}
                onChange={(e) =>
                  handleInputChange("poster_landscape", e.target.value)
                }
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
            <div className="w-full">
              <p className="text-white">Rating:</p>
              <input
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
          <div>
            <p className="text-white mb-4">Actors:</p>
            <div className="flex space-x-4 overflow-x-auto">
              {formData.actors.map((actor: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col relative group items-center justify-center"
                  onClick={() => handleSelectActor(index)}
                >
                  <div className="absolute top-0 hidden z-20 group-hover:block w-full h-full cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} size="lg" color="white" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-32 rounded-full bg-white cursor-pointer">
                    <img
                      src={actor.image}
                      className="w-32 h-32 object-fill rounded-full brightness-90 shadow-black shadow-md"
                      alt={`Actor ${actor.name}`}
                    />
                  </div>
                  <p className="text-white">{actor.name}</p>
                </div>
              ))}
            </div>
            {/* <button
              type="button"
              onClick={handleShowActorField}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 hover:bg-blue-600 transition-colors"
            >
              Add More Actors
            </button> */}
            <div className="mt-4">
              <div className="w-full">
                <p className="text-white">Actor Name:</p>
                <input
                  value={newActor.name}
                  onChange={(e) => handleNewActorChange("name", e.target.value)}
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
                  onChange={(e) => handleNewActorChange("bio", e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-white">Image:</p>
                <input
                  value={newActor.image}
                  onChange={(e) =>
                    handleNewActorChange("image", e.target.value)
                  }
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <button
                type="button"
                onClick={
                  selectedActorIndex !== null
                    ? handleUpdateActor
                    : handleAddActor
                }
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-8 hover:bg-green-600 transition-colors"
              >
                {selectedActorIndex !== null ? "Update Actor" : "Save Actor"}
              </button>
            </div>
          </div>
          <div>
            <p className="text-white mb-4">Producer:</p>
            {formData.producer.name && (
              <div className="flex space-x-4 overflow-x-auto relative ">
                <div className="flex flex-col items-center group justify-center">
                  <div className="absolute top-0 left-0 hidden z-20 group-hover:block w-fit h-full cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} size="lg" color="white" />
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={formData.producer.image}
                      className="w-32 h-32 object-fill rounded-full brightness-90 shadow-black shadow-md cursor-pointer"
                      alt={`Producer ${formData.producer.name}`}
                    />
                  </div>
                  <p className="text-white">{formData.producer.name}</p>
                </div>
              </div>
            )}
            <div className="mt-4">
              <div className="w-full">
                <p className="text-white">Producer Name:</p>
                <input
                  value={formData.producer.name}
                  onChange={(e) => handleProducerChange("name", e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <p className="text-white">Gender:</p>
                  <select
                    value={formData.producer.gender}
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
                    value={formData.producer.dob}
                    onChange={(e) =>
                      handleProducerChange("dob", e.target.value)
                    }
                    className="px-4 py-2 bg-white rounded-lg w-full my-2"
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="text-white">BIO:</p>
                <input
                  value={formData.producer.bio}
                  onChange={(e) => handleProducerChange("bio", e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-white">Image:</p>
                <input
                  value={formData.producer.image}
                  onChange={(e) =>
                    handleProducerChange("image", e.target.value)
                  }
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-8 hover:bg-green-600 transition-colors"
              >
                Save Producer
              </button>
            </div>
          </div>
        </div>
        <div className="mx-8 h-full">
          <p className="text-white">Plot:</p>
          <textarea
            value={formData.plot}
            onChange={(e) => handleInputChange("plot", e.target.value)}
            className="px-4 py-2 bg-white rounded-lg w-full my-2 h-11/12"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
