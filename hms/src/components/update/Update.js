import React, { useState } from "react";
import Swal from "sweetalert2";

const Update = ({ id }) => {
  const [stTime, setStTime] = useState("");
  const [endTime1, setEndTime1] = useState([]);
  const [eTime, setETime] = useState("");
  const [rmType, setRmType] = useState("");
  const [rmNo, setRmNo] = useState([]);
  const [updateRm, setUpdateRm] = useState(null);
  const [date, setDate] = useState("");

  const time = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  const roomType = ["dormatory", "sharing", "apartment"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      date: date,
      startTime: stTime,
      endTime: eTime,
      roomType: rmType,
      roomNumber: parseInt(updateRm),
    };
    console.log(data);

    if (!stTime || !eTime || !rmType || !updateRm || !date) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields.",
        confirmButtonText: "Close",
      });
      return;
    }

    fetch(`http://localhost:8000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error("Booking not found");
        } else if (response.status === 409) {
          throw new Error("Booking already exists");
        } else {
          throw new Error("Failed to update booking");
        }
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Booking Updated",
          text: "Booking has been successfully updated.",
          confirmButtonText: "Close",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Booking Update Failed",
          text: error.message,
          confirmButtonText: "Close",
        });
      });
  };

  const handleOption2Change = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "dormatory") {
      setRmNo([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else if (selectedValue === "sharing") {
      setRmNo([1, 2, 3, 4, 5, 6]);
    } else if (selectedValue === "apartment") {
      setRmNo([1, 2, 3, 4]);
    } else {
      setRmNo([]);
    }
    setRmType(selectedValue);
  };

  const handleOption1Change = (event) => {
    const selectedValue = event.target.value;
    setStTime(selectedValue);
    const filteredOptions = time.filter(
      (option) => parseInt(option) >= parseInt(selectedValue)
    );
    setEndTime1(filteredOptions);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ padding: "0 1rem" }}>Update</h2>
        <div className="form-row">
          <select value={stTime} onChange={handleOption1Change}>
            {time.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={eTime}
            onChange={(event) => setETime(event.target.value)}
          >
            {endTime1.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <select value={rmType} onChange={handleOption2Change}>
            {roomType.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={updateRm}
            onChange={(event) => setUpdateRm(event.target.value)}
          >
            {rmNo.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <button type="submit">Set</button>
      </form>
    </div>
  );
};

export default Update;
