import "./css/Home.css";
import React, { useEffect, useState } from "react";
import { authService } from "../fbase";
import { Link } from "react-router-dom";

export default function Home() {
  const onLogOutClick = () => {
    authService.signOut();
    window.localStorage.clear();
  };
  const [cityInput, setCityInput] = useState("");
  const cityName = {
    서울: "Seoul",
    부산: "Busan",
    대구: "Daegu",
    인천: "Incheon",
    광주: "Gwangju",
    대전: "Daejeon",
    울산: "Gyeongju",
    세종: "Sejong",
    수원: "Suwon",
    춘천: "Chuncheon",
    청주: "Cheongju-si",
    예산: "Yesan",
    홍성: "Hongseong",
    전주: "Jeonju",
    무안: "Muan",
    목포: "Mokpo",
    안동: "Andong",
    예천: "Yecheon",
    포항: "Pohang",
    창원: "Changwon",
    진주: "Chinju",
    제주도: "Jeju",
  };
  const [searched, setSearched] = useState("");
  const onChange = (e) => {
    setCityInput(e.target.value);
  };
  const [searchError, setSearchError] = useState();

  const isCity = () => {
    const isCityName = cityName.hasOwnProperty(cityInput);
    if (isCityName) {
      setSearched(cityName[cityInput]);
      setCityInput("");
      setSearchError("");
    } else {
      setSearched("");
      setCityInput("");
      setSearchError("잘못된 검색입니다.");
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      isCity();
    }
  };
  const onClick = (e) => {
    if (cityInput !== "") {
      isCity();
    }
  };
  const [dataClouds, setDataClouds] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [dataWeather, setDataWeather] = useState([]);
  const [dataWind, setDataWind] = useState([]);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searched}&id=524901&lang=Kr&appid=ba377ee3d7d4e51eeb16cebe61239877`;
  const GetInfo = async () => {
    if (searched !== "") {
      fetch(url)
        .then(function (res) {
          if (!res.ok) {
            throw Error("소스 패치 오류");
          }
          return res.json();
        })
        .then(function (data) {
          setDataClouds(data.clouds);
          setDataMain(data.main);
          setDataWeather(data.weather[0]);
          setDataWind(data.wind);
        });
    }
  };

  useEffect(() => {
    GetInfo();
  }, [url]);

  return (
    <section className="homeContainer">
      <div className="homeLeft">
        <div className="homeInputBox">
          <input
            type="text"
            placeholder="지역 입력"
            value={cityInput}
            onChange={onChange}
            onKeyDown={handleOnKeyPress}
          />
          <input type="button" value="찾기" onClick={onClick} />
        </div>
        <div className="searchedInfoDetail">
          {searchError === "" ? (
            <div>
              <span>최대기온 : {(dataMain.temp_max - 273.15).toFixed(1)}</span>
              <br />
              <span>최저기온 : {(dataMain.temp_min - 273.15).toFixed(1)}</span>
              <br />
              <span>습도 : {dataMain.humidity}%</span>
              <br />
              <span>풍속 : {dataWind.speed}km/h</span>
              <br />
              <span>구름 : {dataClouds.all}%</span>
              <br />
            </div>
          ) : (
            <span>{searchError}</span>
          )}
        </div>
      </div>
      <div className="homeRight">
        <div className="searchedInfoMain">
          {searchError === "" ? (
            <div>
              <img
                src={
                  searched !== ""
                    ? `http://openweathermap.org/img/wn/${dataWeather.icon}@2x.png`
                    : null
                }
                alt="이미지 없음"
              />
              <br />
              <span>{dataWeather.description}</span>
            </div>
          ) : (
            <span>{searchError}</span>
          )}
        </div>
        <Link to="/" onClick={onLogOutClick}>
          로그아웃
        </Link>
      </div>
    </section>
  );
}
