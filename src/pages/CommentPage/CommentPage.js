import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Review from "../../components/Review/Review";
import Tag from "../../components/Tag/Tag";
import Comment from "../../components/Comment/Comment";

import Loader from "../../components/Loader/Loader";

import "./CommentPage.css";

import { BsPlus, BsReplyFill } from "react-icons/bs";

import GoogleLogin from "react-google-login";

const CommentPage = ({
  status,
  //status data 자체는 app.js 에서 받아옴
}) => {
  //comment에 있는 userID 바탕으로 userInfo가져오기 (username, status, isDeleted?)

  //get reviewID, wineID from the path
  const { wineID, reviewID } = useParams();

  //get Review using reviewID
  const [review, setReview] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchReview = async (reviewID) => {
    try {
      setIsLoaded(false);
      const res = await axios.get(`/api/wines/${wineID}/reviews`);
      res.data.forEach((each) => {
        if (each.reviewID === Number(reviewID)) {
          setReview(each);
        }
      });
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch matching review when first loading
  useEffect(() => {
    fetchReview(reviewID);
  }, []);

  // 유저가 지금 작성중인 comment - submit 하지 않은
  const [tempComment, setTempComment] = useState("");

  // 다른 사람들이 이미 작성한 comment
  const [comments, setComments] = useState([]);

  // comment 가져오기
  const fetchComments = async (reviewID, wineID) => {
    try {
      setIsLoaded(false);
      const res = await axios.get(
        `/api/wines/${wineID}/reviews/${reviewID}/comments`
      );
      // console.log("fetchComments : ", res.data);
      setComments(res.data);
      // console.log(comments);
      setIsLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments(reviewID, wineID);
  }, [comments]);

  const displayComments = (comments) => {
    return comments.map((each) => {
      if (!each.isDeleted) {
        return (
          <Comment
            status={status}
            comments={each}
            reviewID={reviewID}
            wineID={wineID}
            key={each.commentID}
          />
        );
      }
    });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTempComment(value);
  };

  const userID = status.userID;

  const onSubmit = async () => {
    const body = {
      userID: userID,
      content: tempComment,
    };
    console.log(body);
    if (userID) {
      await axios
        .post(`/api/wines/${wineID}/reviews/${reviewID}/comments`, body)
        .then((res) => {
          console.log("response (comment): ", JSON.stringify(res.data, null));
        })
        .catch((error) => {
          console.log("failed(comment): ", error);
        });
      setTempComment("");
    }

    // else {
    //   <GoogleLogin></GoogleLogin>;
    // }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="commentPage">
        <div className="commentPage__container">
          <div className="commentPage__header">
            <div className="commentPage__headerTitle">Comment</div>
            <BsReplyFill
              className="commentPage__close"
              onClick={() => navigate(-1)}
            />
          </div>
          {isLoaded ? (
            <div className="commentPage__reviewContainer">
              <Review review={review} />
            </div>
          ) : (
            <Loader />
          )}

          <div className="commentPage__comments">
            {displayComments(comments)}
          </div>
          {status.userinfo.status === -1 ? (
            <>
              <div className="commentPage__commentContainer">
                <div className="commentPage__button">
                  <input
                    className="commentPage__input"
                    placeholder="leave a comment"
                    onChange={onChange}
                    value={tempComment === "" ? "" : tempComment}
                  ></input>
                </div>
                <BsPlus className="commentPage__plusIcon" onClick={onSubmit} />
              </div>
              <div className="commentPage__commentContainer"></div>
            </>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentPage;
