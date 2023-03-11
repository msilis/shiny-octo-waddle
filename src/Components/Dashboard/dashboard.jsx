import { useState, useEffect } from "react";
import style from "./dashboard.module.css";

export default function Dashboard() {
  //State for tagArray
  const [tagArray, setTagArray] = useState([]);

  //Call API to get tags on initial page load
  useEffect(() => {
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
  }, []);
 
 

 
  

  return (
    <div className={style.dashboardMainContainer}>
      <h4>What do you want to work on in your group?</h4>
      <h5>Book One Techniques</h5>
      <div className={style.techniqueTagsContainer}>
        {tagArray.map((tag)=> <div key={crypto.randomUUID()} className={style.tagMapItem}><p>{tag}</p></div>)}
      </div>
    </div>
  );
}
