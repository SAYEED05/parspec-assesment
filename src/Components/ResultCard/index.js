import React from "react";
import { handleScrollIntoView, highlightText } from "../../utils";
import useActiveElement from "../../hooks/useActiveElement";

const ResultCard = ({
  content,
  query,
  index,
  length,
  hoverIndex,
  setHoverIndex,
  setSelectedUsing,
  selectedUsing,
}) => {
  const focusedElement = useActiveElement();

  const handleKeyUpList = (e) => {
    setSelectedUsing("KEY");
    const isDownArrow = e.keyCode === 40;
    const isUpArrow = e.keyCode === 38;

    if (isDownArrow || isUpArrow) {
      let newIndex = isDownArrow ? index + 1 : index - 1;

      if (hoverIndex !== -1 && selectedUsing !== "KEY") {
        newIndex = isDownArrow ? hoverIndex + 1 : hoverIndex - 1;
      }

      if (newIndex >= 0 && newIndex < length) {
        const element = document.getElementById(`li__${newIndex}`);
        handleScrollIntoView(element);
      } else if (isUpArrow && newIndex < 0) {
        document.getElementById("search__input")?.focus();
      }
    }
  };

  const handleMouseEnter = (e) => {
    if (selectedUsing === "MOUSE") {
      e.target.focus();
      setHoverIndex(index);
    }
    setSelectedUsing("MOUSE");
  };

  //use Package like dompurify to sanitize before passing value to dangerouslySetInnerHTML
  return (
    <li
      key={content.id}
      onKeyUp={(e) => handleKeyUpList(e)}
      tabIndex={0}
      id={`li__${index}`}
      className={`li__result__card ${
        focusedElement.id === `li__${index}` ? "card__focus" : ""
      }`}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={() => setHoverIndex(-1)}
    >
      <div value={content.id}>
        <div
          className="id"
          dangerouslySetInnerHTML={{ __html: highlightText(content.id, query) }}
        />
        <div
          className="name"
          dangerouslySetInnerHTML={{
            __html: highlightText(content.name, query),
          }}
        />
        <div
          className="address"
          dangerouslySetInnerHTML={{
            __html: highlightText(content.address, query),
          }}
        />
        {content.foundIn === "items" && (
          <div className="found__in">
            <span
              dangerouslySetInnerHTML={{ __html: highlightText(query, query) }}
            />{" "}
            found in {content.foundIn}
          </div>
        )}
      </div>
    </li>
  );
};

export default ResultCard;
