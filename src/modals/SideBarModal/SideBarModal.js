import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBarModal.css";
import { BsXLg, BsFillPlusCircleFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

import GoogleLogin from "react-google-login";

const SideBarModal = ({ status, toggleStatus }) => {
  const onSuccess = async (response) => {
    //여기다가 우리 로직 구현
    console.log(response);
  };

  const onFailure = (error) => {
    console.log(error);
  };

  const displayUser = () => {
    if (status.user === 0)
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
                    toggleStatus("sideBarModal"), renderProps.onClick();
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
                console.log(status.sideBarModal);
                toggleStatus("sideBarModal");
                console.log(status.sideBarModal);
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
    else if (status.user === 1) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <Link to="/profile">
              <div
                className="sidebar__profile"
                onClick={() => {
                  toggleStatus("sideBarModal");
                }}
              >
                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                <div className="sidebar__name">iamdooddi</div>
              </div>
            </Link>
            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBarModal")}
            />
          </div>
        </div>
      );
    } else if (status.user === 2) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <Link to="/profile">
              <div
                className="sidebar__profile"
                onClick={() => {
                  toggleStatus("sideBarModal");
                }}
              >
                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                <div className="sidebar__name">iamdooddi</div>
                <MdWineBar className="sidebar__icon" />
              </div>
            </Link>
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
    } else if (status.user === 3) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <Link to="/profile">
              <div
                className="sidebar__profile"
                onClick={() => {
                  toggleStatus("sideBarModal");
                }}
              >
                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                <div className="sidebar__name">iamdooddi</div>
                <MdSettings className="sidebar__icon" />
              </div>
            </Link>
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
    if (status.user === 0) {
      return <></>;
    } else if (status.user === 1) {
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
    } else if (status.user === 2) {
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
    } else if (status.user === 3) {
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