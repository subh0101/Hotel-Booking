import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Card from "../components/card/Card";

const BookingsPage = () => {
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stTime, setStTime] = useState("");
  const [endTime, setEndTime] = useState([]);
  const [eTime, setETime] = useState("");
  const [rmType, setRmType] = useState("");
  const [rmNo, setRmNo] = useState([]);
  const [bookRm, setBookRm] = useState(null);
  const [main, setMain] = useState("");
  const [data2, setData2] = useState({});

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    console.log(data2);
    try {
      let url = "http://localhost:8000/search";
      if (data2.roomType && data2.roomNumber) {
        url += `?roomType=${data2.roomType}&roomNumber=${data2.roomNumber}`;
      } else if (data2.startTime && data2.endTime) {
        url += `?startTime=${data2.startTime}&endTime=${data2.endTime}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data with status ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setData([]);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchData();
  };

  const onSubmit = () => {
    if (main === "roomNo And roomType") {
      setData2({
        roomNumber: bookRm,
        roomType: rmType,
      });
    } else if (main === "startTime And endTime") {
      setData2({
        endTime: eTime,
        startTime: stTime,
      });
    } else {
      setData2({});
    }
    handleSearch();
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

  const handleOption2Change = ({ target: { value } }) => {
    if (value === "dormatory") {
      setRmNo([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else if (value === "sharing") {
      setRmNo([1, 2, 3, 4, 5, 6]);
    } else if (value === "apartment") {
      setRmNo([1, 2, 3, 4]);
    } else {
      setRmNo([]);
    }
    setRmType(value);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container">
          <div>
            <div className="filter-container">
              <select
                name="mainSelect"
                className="filter-select main-filter"
                onChange={(event) => setMain(event.target.value)}
              >
                <option value="roomNo And roomType">RoomNo and RoomType</option>
                <option value="startTime And endTime">
                  StartTime and EndTime
                </option>
              </select>
              <div className="filter-content">
                {main === "roomNo And roomType" ? (
                  <>
                    <select
                      onChange={(event) => handleOption2Change(event)}
                      className="filter-select"
                      value={rmType}
                      style={{ marginTop: "1rem" }}
                    >
                      {roomType.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(event) => setBookRm(event.target.value)}
                      className="filter-select"
                      value={bookRm}
                      style={{ marginTop: "1rem" }}
                    >
                      {rmNo.map((value) => (
                        <option value={value}>{value}</option>
                      ))}
                    </select>
                    <br />
                    <button
                      className="filter-btn"
                      type="submit"
                      onClick={() => onSubmit()}
                    >
                      Apply
                    </button>
                  </>
                ) : (
                  <div className="filter-content">
                    <select
                      onChange={(event) => handleOption1Change(event)}
                      className="filter-select"
                    >
                      {time.map((value) => (
                        <option value={value}>{value}</option>
                      ))}
                    </select>
                    <select
                      onChange={(event) => setETime(event.target.value)}
                      className="filter-select"
                      value={eTime}
                    >
                      {endTime.map((value) => (
                        <option value={value}>{value}</option>
                      ))}
                    </select>
                    <br />
                    <button className="filter-btn" onClick={onSubmit}>
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "45rem",
              marginRight: "14rem",
              marginLeft: "2rem",
            }}
          >
            {data.map((value) => (
              <Card
                key={value._id}
                name={value.username}
                roomType={value.roomType}
                roomNumber={value.roomNumber}
                startTime={value.startTime}
                endTime={value.endTime}
                date={value.date}
                active={value.bookingActive}
                price={value.price}
                id={value._id}
                fetchData={fetchData}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
