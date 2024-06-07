import { useEffect, useMemo, useState } from "react";
import { fetchData, searchStringInObject } from "./utils";
import ResultCard from "./Components/ResultCard";
import Empty from "./Components/ResultCard/Empty";
import Search from "./Components/Search";
import Loader from "./Components/Loader";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [toHighlight, setToHighlight] = useState(null);
  useEffect(() => {
    fetchData({ setLoading, setData });
  }, []);

  const filteredData = useMemo(() => {
    if (!data.length || !query) return [];

    const _combinedData = data.map((item) => {
      const searchData = searchStringInObject(item, query); //this basically returns if the searched string is there and if so in which property it is found
      return {
        ...item,
        ...searchData,
      };
    });
    const filtered = _combinedData.filter((item) => item.found);

    return filtered;
  }, [data, query]);

  useEffect(() => {
    window.addEventListener("mousemove", () => setToHighlight("MOUSE"));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="main__layout">
      <div className="search__container">
        <Search setQuery={setQuery} setShowResult={setShowResult} />
        {showResult && (
          <div className="search__list__container">
            {!filteredData?.length ? (
              <Empty />
            ) : (
              <ul id="ul__result">
                {filteredData.map((item, index, arr) => {
                  return (
                    <ResultCard
                      key={item.id}
                      content={item}
                      index={index}
                      length={arr.length}
                      query={query}
                      hoverIndex={hoverIndex}
                      setHoverIndex={setHoverIndex}
                      setToHighlight={setToHighlight}
                      toHighlight={toHighlight}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
