import style from "./dashboard-main.module.css";
import { useState, useEffect} from "react";
import classnames from "classnames";
import Select from "react-select";

export default function DashboardMain({ loggedIn, setLoggedIn, firstName}) {
  const [tagArray, setTagArray] = useState([]);
  const [selectedTag, setSelectedTag] = useState("0");
  const [results, setResults] = useState(true);
  const [reviewPieces, setReviewPieces] = useState([]);
  //Redirect functionality

  //Call API to get tags on initial page load
  useEffect(() => {
    try {
      fetch("http://localhost:8080/tags", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //Map tags from each object to array
          const dataArray = data.map((tag) => tag.techniqueTags);

          //Flatten the multiple arrays returned by dataArray into single array
          const flattenedArray = dataArray.flat(1);
          const filteredArray = flattenedArray.filter(
            (tag, index) => flattenedArray.indexOf(tag) === index
          );

          setTagArray(filteredArray);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //Get options for tag dropdown

  const tagOptions = tagArray.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  //Handle Go button click
  function handleGoClick() {
    const tagSearchData = {
      tagToSearch: selectedTag,
    };
    console.log(tagSearchData);
    try {
      fetch("http://localhost:8080/techniqueSearch", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tagSearchData),
      })
        .then((response) => response.json())
        .then((data) => {
          const reviewArray = data.map((piece) => piece.pieceName);
          setReviewPieces(reviewArray);
        });
    } catch (err) {
      console.log(err);
    }
    setResults(false);
  };

  //Text for greeting
  const greetText = `Hi ${firstName}, what do you want to work on in your group?`

  return(
    <div className={classnames(style.dashboardMainContainer, style.fadeContainer)}>
        <div className={style.dashboardMain}>
        <h2>{greetText}</h2>
        <h3>Book One Techniques</h3>
        <div className={style.techniqueTagsContainer}>
          <Select
            className={style.selectInput}
            options={tagOptions}
            isSearchable={true}
            onChange={(e) => {
              console.log(e.value);
              setSelectedTag(e.value);
            }}
          />
        </div>
        <div className={style.goButton} onClick={handleGoClick}>
          <span>Go!</span>
        </div>
        <div
          className={classnames(style.resultContainer, style.fadeContainer, {
            [style.resultsHidden]: results,
          })}
        >
          <div className={style.reviewPieceContainer}>
            <div className={style.reviewHeading}>
              <h3
                className={style.reviewHeadingText}
              >{`Suggested review pieces for: ${selectedTag}`}</h3>
            </div>
            <div className={style.reviewPieceList}>
              {reviewPieces.map((piece) => (
                <div
                  className={style.reviewPieceItem}
                  key={crypto.randomUUID()}
                >
                  {piece}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
