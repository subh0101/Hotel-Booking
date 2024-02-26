import React, { useEffect, useState } from "react";
import "./Input.css";
import Swal from "sweetalert2";

const Input = () => {
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
  const pricing = {
    dormatory: 400,
    sharing: 600,
    apartment: 800,
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stTime, setStTime] = useState("");
  const [endTime, setEndTime] = useState([]);
  const [eTime, setETime] = useState("");
  const [rmType, setRmType] = useState("");
  const [rmNo, setRmNo] = useState([]);
  const [bookRm, setBookRm] = useState("");
  const [date, setDate] = useState("");
  const [res, setRes] = useState("");
  const [price, setPrice] = useState(1);

  const handleSubmit = (event) => {
    const data = {
      username: name,
      userEmail: email,
      date: date,
      startTime: stTime,
      endTime: eTime,
      roomType: rmType,
      roomNumber: bookRm,
      price: price,
    };
    event.preventDefault();
    if (name && email && stTime && eTime && rmType && rmNo && date && price) {
      fetch("http://localhost:8000/bookRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Room booking failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          Swal.fire("Success!", `Your room has been booked for ${price}`, "success");
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("Error", "Room booking failed", "error");
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...!",
        text: `Error booking the room`,
        confirmButtonText: "Close",
      });
    }
  };

  const handleOption2Change = (event) => {
    const selectedValue = event.target.value;
    const stHour = parseInt(stTime.slice(0, 2), 10);
    const endHour = parseInt(eTime.slice(0, 2), 10);
    const hoursDiff = endHour - stHour;

    if (selectedValue === "dormatory") {
      setRmNo([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      setPrice(hoursDiff * pricing.dormatory);
    } else if (selectedValue === "sharing") {
      setRmNo([1, 2, 3, 4, 5, 6]);
      setPrice(hoursDiff * pricing.sharing);
    } else if (selectedValue === "apartment") {
      setRmNo([1, 2, 3, 4]);
      setPrice(hoursDiff * pricing.apartment);
    } else {
      setRmNo([]);
      setPrice(hoursDiff);
    }

    setRmType(selectedValue);
  };

  const handleETimeChange = (event) => {
    const selectedValue = event.target.value;
    setETime(selectedValue);

    const selectedHour = parseInt(selectedValue.slice(0, 2), 10);
    const stHour = parseInt(stTime.slice(0, 2), 10);
    const hoursDiff = selectedHour - stHour;

    if (rmType in pricing) {
      setPrice(hoursDiff * pricing[rmType]);
    } else {
      setPrice(hoursDiff);
    }
  };

  const handleOption1Change = (event) => {
    const selectedValue = event.target.value;
    const filteredOptions = time.filter(
      (option) =>
        parseInt(option.slice(0, 2)) > parseInt(selectedValue.slice(0, 2))
    );
    setStTime(selectedValue);
    setEndTime(filteredOptions);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ paddingBottom: "1rem" }}>Book</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-row">
          <select value={stTime} onChange={handleOption1Change}>
            {time.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select value={eTime} onChange={handleETimeChange}>
            {endTime.map((value) => (
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
            value={bookRm}
            onChange={(event) => setBookRm(event.target.value)}
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
        <button type="submit">Book</button>
        <span style={{ paddingTop: "1rem" }}>Price : {price}</span>
      </form>
      <p></p>
    </div>
  );
};

export default Input;
