import React, { useEffect, useState } from "react";
import "./TicketModal.css";
import {
  BsXLg,
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import Ticket from "../../components/Ticket/Ticket";
import axios from "axios";

const TicketModal = ({ status, toggleStatus, toggleTicketModal }) => {
  //새로 만드는 ticket에 관한 useState
  const [tempSuppTicket, setTempSuppTicket] = useState({
    ticketTitle: "",
    ticketContent: "",
    createdAt: "",
  });

  //새로 만드는 ticket의 visibility property
  const [ticketVisible, setTicketVisible] = useState(0);
  const toggleTempTicket = () => {
    setTicketVisible(!ticketVisible);
  };

  //새로 만드는 Ticket의 input onChange
  //근데 아직 서버에 저장은 안하는,, 로컬에만 저장됨
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(name);
    console.log(value);
    let newTempSuppTicket = {
      ...tempSuppTicket,
      [name]: value,
    };
    setTempTicket(newTempSuppTicket);
    // console.log(newTempTicket);
    // saveQuestionsOnServer(newTempQuestion);
  };

  //user가 이전에 submit한 티켓들
  const [prevTickets, setPrevTickets] = useState({});

  const userID = status.userID;
  //fetch tickets that the user has previously sent
  const fetchUserTickets = async (userID) => {
    try {
      const res = await axios.get(`/api/support-tickets/?userID=${userID}`);
      console.log("res.data from fetchUserTickets: ", res.data);
      setPrevTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTickets(userID);
  }, []);

  const displayTickets = () => {
    let result = [];
    prevTickets.forEach((each, index) => {
      result.push(<Ticket type="ticket" ticketData={each} key={index} />);
    });
  };

  return (
    <>
      <div
        className={status.ticketModal ? "ticketModal" : "ticketModal--inactive"}
      >
        <div className="ticketModal__container">
          <div className="ticketModal__header">
            <div className="ticketModal__headerTitle">view tickets</div>
            <BsXLg
              className="ticketModal__topClose"
              onClick={() => {
                toggleStatus("ticketModal");
              }}
            />
          </div>
          {status.userinfo.status !== -1 && status.userinfo.status !== 2 && (
            <div className="ticketModal__create" onClick={toggleTempTicket}>
              <BsFillPlusCircleFill />
              create a new ticket
            </div>
          )}
          {ticketVisible && (
            <>
              <div className="ticketModal__temp">
                <div className="ticketModal__title">
                  <div className="ticketModal__titleTitle">New Ticket</div>
                  {/* <button className="ticketModal__tempSubmit">Submit</button> */}
                  <BsXLg
                    className="ticketModal__close"
                    onClick={toggleTempTicket}
                  />
                </div>
                {/* <hr></hr> */}
                <div className="ticketModal__tempTitle">
                  <div className="ticketModal__tempTitleTitle">Title </div>
                  <input
                    name="ticketTitle"
                    type="text"
                    className="ticketModal__tempTitleInput"
                    placeholder="Title"
                    onChange={onChange}
                    value={tempSuppTicket.ticketTitle || ""}
                  ></input>
                </div>
                <hr></hr>
                <div className="ticketModal__tempContent">
                  <div className="ticketModal__tempContentTitle">Content</div>
                  <input
                    name="ticketContent"
                    type="text"
                    className="ticketModal__tempContentInput"
                    placeholder="Have any issues? Feel free to report it to us! \n 사실 지금 새벽 두시반.. 졸라리 늦은ㅅ ㅣ간.. 눈이 너무 감기는데 한게 없어서 감기면 안돼.. 진짜로..."
                    onChange={onChange}
                  >
                    {tempSuppTicket.ticketContent || ""}
                  </input>
                </div>
                <div className="ticketModal__button">
                  <button
                    className="ticketModal__tempSubmit"
                    onClick={toggleTempTicket}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
          <Ticket type="ticket" />
          <Ticket type="ticket" />
        </div>
      </div>
    </>
  );
};

export default TicketModal;
