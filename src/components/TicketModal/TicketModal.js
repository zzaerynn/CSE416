import React, { useState } from "react";
import "./TicketModal.css";
import $ from "jquery";
import {
  BsXLg,
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import Ticket from "../Ticket/Ticket";

const TicketModal = ({ ticketModalStatus, toggleTicketModal }) => {
  // const [TicketAnswerStatus, setTicketAnswerStatus] = useState(0);
  // const [TicketAnswer1Status, setTicketAnswer1Status] = useState(0);
  // const [TicketAnswer2Status, setTicketAnswer2Status] = useState(0);
  // const answer = () => {
  //   setTicketAnswerStatus(!TicketAnswerStatus);
  //   if (TicketAnswerStatus) {
  //     $(".ticket_answer_box").hide();
  //   } else {
  //     $(".ticket_answer_box").show();
  //   }
  // };

  // const defaultanswer1 = () => {
  //   setTicketAnswer1Status(!TicketAnswer1Status);
  //   if (TicketAnswer1Status) {
  //     $(".ticket_answer1").hide();
  //   } else {
  //     $(".ticket_answer1").show();
  //   }
  // };

  // const defaultanswer2 = () => {
  //   setTicketAnswerStatus(!TicketAnswerStatus);
  //   if (TicketAnswerStatus) {
  //     $(".ticket_answer2").hide();
  //   } else {
  //     $(".ticket_answer2").show();
  //   }
  // };

  return (
    <>
      <div className={ticketModalStatus ? "ticket" : "ticket--inactive"}>
        <div className="ticket__container">
          <div className="ticket__header">
            <div className="ticket__header-title">view tickets</div>
            <BsXLg className="ticket__top-close" onClick={toggleTicketModal} />
          </div>
          <div className="ticket__create">
            <BsFillPlusCircleFill /> create a new ticket
          </div>

          <Ticket
            type="ticket"
            ticketStatus={0}
            title={"Trouble Logging in"}
            question={"I have trouble logging in with my account"}
            answer={
              "Please click on forgot my password button to reset your password."
            }
          />
          <Ticket
            type="ticket"
            ticketStatus={1}
            title={"Trouble Logging in"}
            question={"I have trouble logging in with my account"}
            answer={
              "Please click on forgot my password button to reset your password."
            }
          />
        </div>
      </div>
    </>
  );
};

export default TicketModal;
