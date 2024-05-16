import { debounce } from "../../utils";

const Search = ({ setQuery, setShowResult }) => {
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setShowResult(true);
  };
  //to prevent unnecessary API calls while user types,created a debounce function

  const debouncedSearch = debounce(handleSearchChange, 250);

  const handleKeyUp = (e) => {
    if (e.keyCode === 40) {
      document.getElementById(`li__0`)?.focus?.();
    }
  };

  return (
    <input
      type="search"
      list="search__list"
      onChange={debouncedSearch}
      autoFocus
      placeholder="Search user by id,name,address,pincode,items..."
      onKeyUp={handleKeyUp}
      id="search__input"
      autoComplete="off"
    />
  );
};

export default Search;
