import { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface ISearchbar {
  setQuery: (value: string) => void;
}

const SearchBar = ({ setQuery }: ISearchbar) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  return (
    <div className="flex flex-row items-center gap-3 bg-white px-3 py-1 rounded-lg">
      <div onClick={() => setShowInput(!showInput)}>
        <BsSearch />
      </div>
      {showInput && (
        <input
          type="text"
          className={``}
          placeholder="Rechercher votre paire"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      )}
    </div>
  );
};

export default SearchBar;
