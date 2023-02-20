import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth =
      now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    let dayOfWeek = week[now.getDay()];
    return (
      todayYear +
      ". " +
      todayMonth +
      ". " +
      todayDate +
      " " +
      dayOfWeek +
      "요일"
    );
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
      setCitySelected(cityInput);
      setSearchError("");
    } else {
      setSearched("");
      setCityInput("");
      setCitySelected(cityInput);
      setSearchError("등록되지 않은 지역입니다.");
    }
  };
  const [dataClouds, setDataClouds] = useState({});
  const [dataMain, setDataMain] = useState({});
  const [dataWeather, setDataWeather] = useState({});
  const [dataWind, setDataWind] = useState({});
  const [citySelected, setCitySelected] = useState();

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      setCitySelected(cityInput);
      isCity();
    }
  };

  const onClick = () => {
    if (cityInput !== "") {
      setCitySelected(cityInput);
      isCity();
    }
  };

  const celsius = 273.15;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searched}&id=524901&lang=Kr&appid=ba377ee3d7d4e51eeb16cebe61239877`;

  useEffect(() => {
    if (searched !== "") {
      fetch(url)
        .then(function (res) {
          if (!res.ok) {
            throw Error("데이터 불러오기 실패");
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
  }, [searched, url]);
  return (
    <section className="mainContainer">
      <div className="mainLeft">
        <div className="mainInputBox">
          <input
            type="text"
            placeholder="지역 입력"
            value={cityInput}
            onChange={onChange}
            onKeyDown={handleOnKeyPress}
          />
          <input type="button" value="찾기" onClick={onClick} />
        </div>
        <div className="mainInfoDetail">
          {searchError === "" ? (
            <>
              <div className="InfoItems">
                <span>최대 / 최저 기온</span>
                <span>
                  {(dataMain.temp_max - celsius).toFixed(1)}
                  &nbsp;&#8451;&nbsp;/&nbsp;
                  {(dataMain.temp_min - celsius).toFixed(1)}&nbsp;&#8451;
                </span>
              </div>
              <div className="InfoItems">
                <span>습도</span>
                <span>{dataMain.humidity}%</span>
              </div>
              <div className="InfoItems">
                <span>풍속</span>
                <span>{dataWind.speed}km/h</span>
              </div>
              <div className="InfoItems">
                <span>구름</span>
                <span>{dataClouds.all}%</span>
              </div>
              <div className="InfoItems">
                <span>날씨 설명</span>
                <span>{dataWeather.description}</span>
              </div>
            </>
          ) : (
            <span className="errorMessage">{searchError}</span>
          )}
        </div>
      </div>
      <div className="mainRight">
        <div className="nowDay">{todayTime()}</div>
        <div className="mainInfo">
          {searchError === "" ? (
            <>
              <div className="infoBox">
                <span className="cityTemp">
                  {(dataMain.temp - celsius).toFixed(1)}&nbsp;&#8451;
                </span>
                <span className="cityName">{citySelected}</span>
                <img
                  className="cityImage"
                  src={
                    searched !== ""
                      ? `http://openweathermap.org/img/wn/${dataWeather.icon}@2x.png`
                      : null
                  }
                  alt="이미지 없음"
                />
              </div>
            </>
          ) : (
            <span className="errorMessage">{searchError}</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
