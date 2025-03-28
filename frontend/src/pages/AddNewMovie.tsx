export default function AddNewMovie() {
  return (
    <div className="w-full h-dvh rounded-lg flex justify-center items-center">
      <div className="w-10/12 h-9/12 rounded-lg space-y-8 justify-center items-center flex-col grid grid-cols-2">
        <div className="space-y-14">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Movie Title:</p>
                <input
                  placeholder="Enter Movie Title"
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-white">Year of Release:</p>
                <input
                  placeholder="Enter Movie Release Year"
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">Poster:</p>
              <input
                placeholder="Enter Poster Link"
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
          <div>
            <div className="w-full">
              <p className="text-white">Actor:</p>
              <input
                placeholder="Add actor one by one"
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Gender:</p>
                <select className="px-4 py-2 bg-white rounded-lg w-full my-2">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-full">
                <p className="text-white">DOB:</p>
                <input
                  placeholder="Enter Actor DOB"
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">BIO:</p>
              <input
                placeholder="Enter Actor BIO"
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
          <div>
            <div className="w-full">
              <p className="text-white">Producer Name:</p>
              <input
                placeholder="Enter Producer Name"
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <p className="text-white">Gender:</p>
                <select className="px-4 py-2 bg-white rounded-lg w-full my-2">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-full">
                <p className="text-white">DOB:</p>
                <input
                  placeholder="Enter Actor DOB"
                  className="px-4 py-2 bg-white rounded-lg w-full my-2"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-white">BIO:</p>
              <input
                placeholder="Enter Actor BIO"
                className="px-4 py-2 bg-white rounded-lg w-full my-2"
              />
            </div>
          </div>
        </div>
        <div className="mx-8 h-full">
          <p className="text-white">Plot:</p>
          <textarea
            placeholder="Enter Movie Plot"
            className="px-4 py-2 bg-white rounded-lg w-full my-2 h-11/12"
          />
        </div>
      </div>
    </div>
  );
}
