import React, { useState, useEffect } from "react";
import "./RegisterModal.css";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import RegisterTag from "../RegisterTagModal/RegisterTagModal";
import Tag from "../../components/Tag/Tag";
import axios, { CancelToken } from "axios";

const RegisterModal = ({ status, toggleStatus, setStatus }) => {
  const [userName, setUserName] = useState();
  const [isavailable, setAvailable] = useState(false);
  const [valueSearch, setSearch] = useState("");
  const [selectedtag, setSelectedtag] = useState([]);
  const [tags, setTags] = useState({});
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const formattedTag = valueSearch.toLowerCase();
      const result = [];
      for (let each in tags) {
        if (each.toLowerCase().indexOf(formattedTag) === 0) {
          result.push(each);
        }
      }
      if (result.length === 1) {
        setTags({ ...tags, [result[0]]: !tags[result[0].length] });
      }
    }
  };
  function onBtnClick() {
    setTags({ ...tags, [this.txt]: !tags[this.txt] });
  }
  const fetchTags = async () => {
    const res = await axios.get("/api/tags/list");
    const tempTags = {};
    res.data.forEach((each) => {
      tempTags[each] = false;
    });
    setTags(tempTags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const displaySelectedTags = () => {
    const result = [];

    for (let each in tags) {
      if (tags[each] === true) {
        result.push(
          <Tag
            type="selected"
            txt={each}
            isFilled={true}
            onClick={onBtnClick.bind({ txt: each })}
          />
        );
      }
    }
    result.sort();
    return result;
  };

  const displayUnselectedTags = () => {
    const result = [];
    const formattedTag = valueSearch.toLowerCase();
    if (formattedTag !== "") {
      for (let each in tags) {
        if (
          each.toLowerCase().indexOf(formattedTag) === 0 &&
          tags[each] === false
        ) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onBtnClick.bind({ txt: each })}
            />
          );
        }
      }
    } else {
      for (let each in tags) {
        if (tags[each] === false) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onBtnClick.bind({ txt: each })}
            />
          );
        }
      }
    }
    return result;
  };

  const onNameChange = async (e) => {
    try {
      const res = await axios.get(
        `/api/users/username-duplicate-check?username=${e.target.value}`
      );
      if (res.status === 200) {
        setAvailable(!res.data.duplicate);
        setUserName(e.target.value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRegister = async () => {
    const newlist = [];
    for (const each in tags) {
      if (tags[each] === true) {
        newlist.push(each);
      }
    }
    setSelectedtag(newlist);

    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${status.accesstoken}`
      );
      if (res.status === 200) {
        try {
          const res1 = await axios.post(`/api/users`, {
            username: userName,
            tags: selectedtag,
            profileImage: res.data.picture,
            email: res.data.email,
          });
          if (res1.status === 201) {
            const res2 = await axios.get(
              `/api/users/${res1.data.userID}?requesterID=${res1.data.userID}`
            );
            const userinfo = {
              followers: res2.data.followers,
              followings: res2.data.followings,
              likedWinelists: res2.data.likedWinelists,
              likedWines: res2.data.likedWines,
              profileImage: res2.data.profileImage,
              status: res2.data.status,
              tags: res2.data.tags,
              userID: res2.data.userID,
              accesstoken: status.accesstoken,
              username: res2.data.username,
            };
            console.log(userinfo);
            setStatus({
              ...status,
              accesstoken: status.accesstoken,
              userID: res2.data.userID,
              user: res2.data.status + 1,
              profileimage: res2.data.picture,
              registerModal: !status.registerModal,
              userinfo: userinfo,
            });
            let sessionStorage = window.sessionStorage;
            sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
            sessionStorage.setItem("userID", res.data.userID);
            sessionStorage.setItem("accesstoken", accesstoken);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {status.registerModal && (
        <div className="register">
          <div className="register__header">
            <BsArrowLeft
              className="register__back"
              onClick={() => toggleStatus("registerModal")}
            ></BsArrowLeft>
            <div className="register__home">
              <Link to="/" onClick={() => toggleStatus("registerModal")}>
                podo
              </Link>
            </div>
          </div>

          <div className="register__main">
            <div className="register__title">Register</div>

            <form className="register__main-content">
              <br></br>
              <div className="register_subtitle">choose your user name</div>
              <input
                className="register__name"
                placeholder="username"
                onChange={onNameChange}
              ></input>
              <div className="register__name-warning">
                {isavailable ? "available username" : "unavailable username"}
              </div>
              <br></br>
              <div className="register_subtitle">
                {" "}
                choose the tags you are interested{" "}
              </div>

              <div className="registertag__main-content">
                <div className="registertag__main-search">
                  <BsSearch className="registertag__main-search-icon" />
                  <input
                    className="registertag__main-search-input"
                    placeholder="search for more tags"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  ></input>
                </div>

                <div>
                  {" "}
                  {displaySelectedTags()}
                  {displayUnselectedTags()}
                </div>
              </div>
              {isavailable ? (
                <div
                  className="register__register"
                  onClick={() => {
                    onRegister();
                  }}
                >
                  {" "}
                  register
                </div>
              ) : (
                <div className="register__register_unavailable"> register</div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
