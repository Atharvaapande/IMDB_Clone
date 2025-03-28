import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  return (
    <div className="w-full bg-white/0 flex flex-row justify-between items-center space-x-4 px-16 absolute top-0">
      <div>
        <h1 className="text-2xl text-white py-4 grow">IMDB</h1>
      </div>
      <div className="">
        <FontAwesomeIcon
          icon={faSearch}
          size="xs"
          className="text-white font-bold p-3 bg-[#279378] rounded-full"
        />
      </div>
    </div>
  );
}
