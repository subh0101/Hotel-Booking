import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Card = (props) => {
  const {
    name,
    roomType,
    roomNumber,
    startTime,
    endTime,
    date,
    id,
    fetchData,
    active,
    price,
  } = props;

  const today = new Date();
  const now = new Date();
  const currDate = today
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  const currTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dataTime = {
    startTime: currTime.slice(0, 2),
    endTime: currTime.slice(3, 5),
  };
  const splitDate = {
    day: currDate.slice(8, 10),
    month: currDate.slice(5, 7),
    year: currDate.slice(0, 4),
  };

  let deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        Swal.fire(
          "Deleted",
          `Booking with id ${id} deleted successfully`,
          "success"
        );
        fetchData();
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error...!",
          text: data.message,
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error...!",
        text: "Internal server error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className={`card ${active ? "active" : "fade"}`}>
      <div className="time">
        <span className="timestamp">{date}</span>
        <span className="timestamp">{startTime}</span>
        <span className="timestamp">{endTime}</span>
        <span className="timestamp">{price}</span>
      </div>
      <div className="content">
        <div className="name">{name}</div>
        <div>
          <span className="room-type">Room Type:</span> {roomType}
        </div>
        <div>
          <span className="room-number">Room Number:</span> {roomNumber}
        </div>
        <div>
          <span className="label">Active:</span> {active}
        </div>
        <div className="actions">
          <Link to={`/update/${id}`}>
            <button className="update-button">Update</button>
          </Link>
          <button className="delete-button" onClick={() => deleteData(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
