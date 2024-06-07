import { DATA_URL } from "../constants";

const debounce = (cb, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const searchStringInObject = (obj, searchString) => {
  //currently only supports string and array of strings,ideally it should be able to handle all possible types
  searchString = searchString.toLowerCase();
  for (let key in obj) {
    if (
      typeof obj[key] === "string" &&
      obj[key].toLowerCase().includes(searchString)
    ) {
      return { foundIn: key, found: true };
    }
    if (Array.isArray(obj[key])) {
      for (let item of obj[key]) {
        if (
          typeof item === "string" &&
          item.toLowerCase().includes(searchString)
        ) {
          return { foundIn: key, found: true };
        }
      }
    }
  }
  return { foundIn: "", found: false };
};

const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class='highlighted'>$1</span>`);
};

const hasActiveElementInList = (id) => {
  var targetElements = document.getElementById(id);
  let children = targetElements?.children ?? [];
  for (let el of children) {
    if (el.contains(document.activeElement)) {
      return true;
    }
  }
  return false;
};

const fetchData = async ({ setLoading, setData }) => {
  try {
    setLoading(true);
    const res = await fetch(DATA_URL);
    const data = await res.json();
    setData(data);
  } catch (error) {
    console.log("ERROR_WHILE_FETCHING_DATA-->", error);
  } finally {
    setLoading(false);
  }
};

const handleScrollIntoView = (element) => {
  element?.focus();
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  return;
};

export {
  debounce,
  searchStringInObject,
  highlightText,
  hasActiveElementInList,
  fetchData,
  handleScrollIntoView,
};
