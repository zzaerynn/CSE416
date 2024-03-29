import React, { useState, useEffect } from "react";

import "./Review.css";
import Tag from "../../components/Tag/Tag";
import { Link } from "react-router-dom";
import { BsFillStarFill, BsPatchCheckFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

const Review = ({ review }) => {
  // console.log(review);
  const tags = review.tags;
  // const floatRating = review.rating.toFixed(1);
  const getTags = () => {
    const tagsResult = [];
    for (let i = 0; i < tags.length; i++) {
      tagsResult.push(
        <Tag type="wineButton" isFilled="false" txt={tags[i]} key={i} />
      );
    }
    return tagsResult;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <div className={review.status == 1 ? "review--somm" : "review"}>
        <div className="review__title">
          <div className="review__user">
            <Link to={`/profile/${review.userID}`}>
              <div className="review__userImage">
                <img src={review.profileImage} />
              </div>
            </Link>
            <div className="review__userInfo">
              <div className="review__userName">{review.username}</div>
              <div className="review__userDate">
                {formatDate(new Date(review.lastUpdatedAt))}
              </div>
            </div>
            <div className="review__userIcon">
              {review.status == 1 ? <BsPatchCheckFill /> : <div></div>}
            </div>
          </div>
          <div
            className={
              review.status == 1 ? "review__userRate--somm" : "review__userRate"
            }
          >
            <BsFillStarFill />
            {review.rating.toFixed(1)}
          </div>
        </div>
        {/* <div className="review__tag">{displaySelectedTags(tags)}</div> */}
        <div className="review__tag">{getTags(tags)}</div>
        <div className="review__content"> {review.content} </div>
      </div>
    </>
  );
};

export default Review;
