import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBarModal.css";
import { BsXLg, BsFillPlusCircleFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

import GoogleLogin from "react-google-login";
import axios from "axios";

const SideBarModal = ({ status, toggleStatus, setStatus }) => {
  const [number, setNumber] = useState(-1);
  const onlogout = () => {
    console.log("Hi");
    let sessionStorage = window.sessionStorage;
    sessionStorage.removeItem("userinfo");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("accesstoken");
    sessionStorage.clear();
    location.reload();

    const userinfo = {
      followers: [],
      followings: [],
      likedWinelists: [],
      likedWines: [],
      profileImage: "",
      status: -1,
      tags: [],
      userID: -1,
      accesstoken: -1,
      username: "",
    };

    setStatus({
      ...status,
      sideBarModal: !status.sideBarModal,
      accesstoken: -1,
      userID: -1,
      user: -1,
      userinfo: userinfo,
    });
  };

  const onSuccess = async (response) => {
    const email = response.profileObj.email;
    const imageUrl = response.profileObj.imageUrl;
    const accesstoken = response.accessToken;

    if (number > 0) {
      try {
        const res = await axios.get(
          `/api/users/login?access_token=${accesstoken}`
        );
        if (res.status === 200) {
          if (res.data.userID === -1) {
            setStatus({
              ...status,
              accesstoken: accesstoken,
              registerModal: !status.registerModal,
              sideBarModal: !status.sideBarModal,
            });
          } else {
            const res1 = await axios.get(
              `/api/users/${res.data.userID}?requesterID=${res.data.userID}`
            );
            const userinfo = {
              followers: res1.data.followers,
              followings: res1.data.followings,
              likedWinelists: res1.data.likedWinelists,
              likedWines: res1.data.likedWines,
              profileImage: res1.data.profileImage,
              status: res1.data.status,
              tags: res1.data.tags,
              userID: res1.data.userID,
              accesstoken: accesstoken,
              username: res1.data.username,
            };

            console.log(userinfo);
            setStatus({
              ...status,
              accesstoken: accesstoken,
              userID: res.data.userID,
              user: res1.data.status + 1,
              profileimage: imageUrl,
              userinfo: userinfo,
            });

            let sessionStorage = window.sessionStorage;
            sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
            sessionStorage.setItem("userID", res.data.userID);
            sessionStorage.setItem("accesstoken", accesstoken);
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setNumber(1);
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  const displayUser = () => {
    if (status.userinfo.status === -1)
      return (
        <div className="sidebar__login">
          <div className="sidebar__header">
            <GoogleLogin
              clientId="1085857977500-hci29d5464imb3l7hdau6qipmjpeqstd.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              render={(renderProps) => (
                <div
                  className="sidebar__status"
                  onClick={() => {
                    renderProps.onClick();
                  }}
                  disabled={renderProps.disabled}
                >
                  login
                </div>
              )}
            />
            <BsXLg
              className="sidebar__close"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            />
          </div>

          <div
            className="sidebar__register"
            onClick={() => {
              toggleStatus("sideBarModal", "registerModal");
            }}
          >
            don't have an account?
          </div>
        </div>
      );
    else if (status.userinfo.status === 0) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div
              className="sidebar__profile"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <img src={status.userinfo.profileImage} />
              <Link to={`/profile/${status.userID}`}>
                <div className="sidebar__name">{status.userinfo.username}</div>
              </Link>
              <BsXLg className="sidebar__close" onClick={() => onlogout()} />
            </div>

            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
        </div>
      );
    } else if (status.userinfo.status === 1) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div
              className="sidebar__profile"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <img src={status.userinfo.profileImage} />
              <Link to={`/profile/${status.userID}`}>
                <div className="sidebar__name">{status.userinfo.username}</div>{" "}
              </Link>
              <MdWineBar className="sidebar__icon" />
              <BsXLg className="sidebar__close" onClick={() => onlogout()} />
            </div>

            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
          <Link to="/create">
            <div
              className="sidebar__create"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <BsFillPlusCircleFill />
              create wine list
            </div>
          </Link>
          <hr className="sidebar__hr"></hr>
        </div>
      );
    } else if (status.userinfo.status === 2) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div
              className="sidebar__profile"
              onClick={() => {
                toggleStatus("sideBarModal");
              }}
            >
              <img src={status.userinfo.profileImage} />
              <Link to={`/profile/${status.userID}`}>
                <div className="sidebar__name">{status.userinfo.username}</div>
              </Link>{" "}
              <MdSettings className="sidebar__icon" />
              <BsXLg className="sidebar__close" onClick={() => onlogout()} />
            </div>

            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
        </div>
      );
    }
  };
  const displayFunction = () => {
    if (status.userinfo.status === -1) {
      return <></>;
    } else if (status.userinfo.status === 0) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => toggleStatus("sideBarModal", "applyModal")}
          >
            become sommlier
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal", "ticketModal");
            }}
          >
            view tickets
          </div>
        </>
      );
    } else if (status.userinfo.status === 1) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal", "ticketModal");
            }}
          >
            view tickets
          </div>
        </>
      );
    } else if (status.userinfo.status === 2) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal");
            }}
          >
            <Link to="/verifysomm">verify sommeliers</Link>
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal");
            }}
          >
            manage reviews
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBarModal", "ticketModal");
            }}
          >
            manage tickets
          </div>
        </>
      );
    }
  };

  const commonFuction = () => {
    return (
      <>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/profile">Profile</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/winePage">WinePage</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/winedetail">WinePage Detail</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/wineListPage">WineListPage</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/wineListDetail">WineListDetail</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal", "commentModal")}
        >
          Wine Detail Comment
        </div>
        <div
          className="sidebar__link"
          onClick={() => toggleStatus("sideBarModal")}
        >
          <Link to="/Profile"> Profile</Link>
        </div>
        <div
          className="sidebar__link"
          onClick={() => {
            toggleStatus("sideBarModal", "ticketModal");
          }}
        >
          view tickets
        </div>
        <div
          className="sidebar__link"
          onClick={() => {
            toggleStatus("sideBarModal", "applyModal");
          }}
        >
          become sommlier
        </div>
      </>
    );
  };
  return (
    <>
      <div
        className={
          status.sideBarModal ? "sidebar" : "sidebar sidebar--inactive"
        }
      >
        {displayUser()}
        <div className="sidebar__menu">
          <div className="sidebar__section">
            <div className="sidebar__title">Wine Lists</div>
            <div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/picnic">Picnic</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/wedding">Wedding</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/party">Party</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/christmas">Christmas</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/business">Business</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/camping">Camping</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/travelg">Travel</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/date">Date</Link>
              </div>
            </div>
            <br></br>

            <div className="sidebar__title">Wines</div>
            <div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/red">Red</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/white">White</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/sparkling">Sparkling</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/rose">Rose</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/dessert"> Dessert</Link>
              </div>
              <div
                className="sidebar__link"
                onClick={() => toggleStatus("sideBarModal")}
              >
                <Link to="/wines/fortified">Fortified</Link>
              </div>
            </div>
            {/* 여기서 페이지 구현할때 sidebar__link 하나씩 복사해서 일단 사용 */}

            {displayFunction()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarModal;
