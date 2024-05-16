import React from "react";
import { handleScrollIntoView, highlightText } from "../../utils";

const ResultCard = ({
  content,
  query,
  index,
  length,
  hoverIndex,
  setHoverIndex,
}) => {
  const handleKeyUpList = (e, index, length) => {
    //DOWN ARROW
    if (e.keyCode === 40) {
      if (index < length - 1) {
        if (hoverIndex !== -1) {
          let element = document.getElementById(`li__${hoverIndex + 1}`);
          handleScrollIntoView(element);
          return;
        }
        let element = document.getElementById(`li__${index + 1}`);
        handleScrollIntoView(element);
      }
    }
    //UP ARROW
    if (e.keyCode === 38) {
      if (index > 0) {
        if (hoverIndex !== -1) {
          let element = document.getElementById(`li__${hoverIndex - 1}`);
          handleScrollIntoView(element);
          return;
        }
        let element = document.getElementById(`li__${index - 1}`);
        handleScrollIntoView(element);
      } else {
        document.getElementById(`search__input`).focus();
      }
    }
  };

  const handleMouseEnter = (e, index) => {
    setHoverIndex(index);
  };
  const handleMouseLeave = (e) => {
    setHoverIndex(-1);
  };

  //use Package like dompurify to sanitize before passing value to dangerouslySetInnerHTML
  return (
    <li
      key={content.id}
      onKeyUp={(e) => handleKeyUpList(e, index, length)}
      tabIndex={0}
      id={`li__${index}`}
      className="li__result__card"
      onMouseEnter={(e) => handleMouseEnter(e, index)}
      onMouseLeave={handleMouseLeave}
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
