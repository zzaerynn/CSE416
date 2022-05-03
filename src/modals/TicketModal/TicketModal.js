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
import Ticket from "../../components/Ticket/Ticket";

const TicketModal = ({ ticketModalStatus, toggleTicketModal }) => {
  return (
    <>
      <div
        className={ticketModalStatus ? "ticketModal" : "ticketModal--inactive"}
      >
        <div className="ticketModal__container">
          <div className="ticketModal__header">
            <div className="ticketModal__headerTitle">view tickets</div>
            <BsXLg
              className="ticketModal__topClose"
              onClick={toggleTicketModal}
            />
          </div>
          <div className="ticketModal__create">
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