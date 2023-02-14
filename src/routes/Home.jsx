import React, { useState, useEffect } from "react";
import { authService } from "../fbase";
import { Link } from "react-router-dom";

export default function Home() {
  const onLogOutClick = () => {
    authService.signOut();
    window.localStorage.clear();
  };
  const [airportInput, setAirportInput] = useState("");
  const airportCode = {
    여수: "RKJY",
    양양: "RKNY",
    울산: "RKPU",
    무안: "RKJB",
    제주: "RKPC",
    인천: "RKSI",
    김포: "RKSS",
    광주: "RKJJ",
    김해: "RKPK",
    청주: "RKTU",
    포항: "RKTH",
    대구: "RKTN",
    사천: "RKPS",
    군산: "RKJK",
    원주: "RKNW",
  };
  const [searched, setSearched] = useState("");
  const onChange = (e) => {
    setAirportInput(e.target.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearched(airportCode[airportInput]);
      setAirportInput("");
    }
  };
  const onClick = () => {
    if (airportInput !== "") {
      setSearched(airportCode[airportInput]);
      setAirportInput("");
    }
  };
  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth =
      now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
    return todayYear + todayMonth + todayDate;
  };
  const [airportWeather, setAirportWeather] = useState([]);
  const [airportWeatherError, setAirportWeatherError] = useState("");
  const airportWeatherUrl = `https://apis.data.go.kr/1360000/AirPortService/getAirPort?serviceKey=%2FiKDLqtDnke%2BTPfqRBEFv0cnMRtdGLqHvxvzdVGbF0MEANZuCicgwrXnnYhmNzWRuwwdTcYAlw5Cz9sRKJb3Hw%3D%3D&numOfRows=10&pageNo=1&dataType=JSON&base_date=${todayTime()}&base_time=0600&airPortCd=${searched}`;
  const airportWeatherGetInfo = async () => {
    const airportWeatherJson = await (await fetch(airportWeatherUrl)).json();
    if (searched !== "") {
      if (airportWeatherJson.response.header.resultMsg === "NO_DATA") {
        setAirportWeatherError("정보없음");
      } else {
        const item = airportWeatherJson.response.body.items.item[0];
        setAirportWeather(item);
        setAirportWeatherError("");
      }
      setSearched("");
    }
  };
  const [airportTakeOff, setAirportTakeOff] = useState([]);
  const [airportTakeOffError, setAirportTakeOffError] = useState("");
  const airportTakeOffUrl = `https://apis.data.go.kr/1360000/AirInfoService/getAirInfo?serviceKey=%2FiKDLqtDnke%2BTPfqRBEFv0cnMRtdGLqHvxvzdVGbF0MEANZuCicgwrXnnYhmNzWRuwwdTcYAlw5Cz9sRKJb3Hw%3D%3D&numOfRows=10&pageNo=%ED%8E%98%EC%9D%B4%EC%A7%80%20%EB%B2%88%ED%98%B8&dataType=JSON&fctm=${todayTime()}0600&icaoCode=${searched}`;
  const airportTakeOffGetInfo = async () => {
    const airportTakeOffJson = await (await fetch(airportTakeOffUrl)).json();
    if (searched !== "") {
      if (airportTakeOffJson.response.header.resultMsg === "NO_DATA") {
        setAirportTakeOffError("정보없음");
      } else {
        const item = airportTakeOffJson.response.body.items.item[0];
        setAirportTakeOff(item);
        setAirportTakeOffError("");
      }
    }
  };

  useEffect(() => {
    airportWeatherGetInfo();
    airportTakeOffGetInfo();
  });

  return (
    <div>
      <span>홈</span>
      <Link to="/" onClick={onLogOutClick}>
        로그아웃
      </Link>
      <input
        type="text"
        placeholder="공항이름 입력"
        value={airportInput}
        onChange={onChange}
        onKeyDown={handleOnKeyPress}
      />
      <input type="button" value="찾기" onClick={onClick} />
      <div>
        <div>
          <h1>-공항 종합 정보-</h1>
          <span>현재날짜 : {todayTime()}</span>
          {airportTakeOffError === "" ? (
            <>
              <p>공항 : {airportTakeOff.airportName}</p>
              <p>기온 : {airportTakeOff.ta}&deg;</p>
            </>
          ) : (
            <>
              <p>공항 : {airportTakeOffError}</p>
              <p>기온 : {airportTakeOffError}</p>
            </>
          )}
          {airportWeatherError === "" ? (
            <>
              <p>최저/최고기온 : {airportWeather.sel_val1}</p>
              <p>요약 : {airportWeather.summary}</p>
              <p>발표시각 : {airportWeather.tm}</p>
              <p>경보현황 : {airportWeather.warn}</p>
            </>
          ) : (
            <>
              <p>최저/최고기온 : {airportWeatherError}</p>
              <p>요약 : {airportWeatherError}</p>
              <p>발표시각 : {airportWeatherError}</p>
              <p>경보현황 : {airportWeatherError}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
