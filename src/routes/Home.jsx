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
    제주: "Jeju",
  };
  const [searched, setSearched] = useState("");
  const onChange = (e) => {
    setCityInput(e.target.value);
  };
  const [searchError, setSearchError] = useState();
  const [mainData, setMainData] = useState([]);
  const [mainDataWeather, setMainDataWeather] = useState([]);
  const [mainDataWeatherText, setMainDataWeatherText] = useState("");

  const isCity = () => {
    const isCityName = cityName.hasOwnProperty(cityInput);
    if (isCityName) {
      setSearched(cityName[cityInput]);
      setCityInput("");
      setSearchError("");
    } else {
      setSearched("");
      setCityInput("");
      setMainDataWeatherText("");
      setSearchError("잘못된 검색입니다.");
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      isCity();
    }
  };
  const onClick = () => {
    if (cityInput !== "") {
      isCity();
    }
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searched}&id=524901&lang=Kr&appid=ba377ee3d7d4e51eeb16cebe61239877`;
  const GetInfo = async () => {
    if (searched !== "") {
      const Json = await (await fetch(url)).json();
      const item = Json.main;
      const itemIcon = Json.weather[0];
      setMainData(item);
      setMainDataWeather(itemIcon);
      if (itemIcon.icon === "01d" || itemIcon.icon === "01n") {
        setMainDataWeatherText("맑음");
      } else if (itemIcon.icon === "02d" || itemIcon.icon === "02n") {
        setMainDataWeatherText("구름 적음");
      } else if (
        itemIcon.icon === "03d" ||
        itemIcon.icon === "03n" ||
        itemIcon.icon === "04d" ||
        itemIcon.icon === "04n"
      ) {
        setMainDataWeatherText("구름 많음");
      } else if (itemIcon.icon === "09d" || itemIcon.icon === "09n") {
        setMainDataWeatherText("소나기");
      } else if (itemIcon.icon === "10d" || itemIcon.icon === "10n") {
        setMainDataWeatherText("비");
      } else if (itemIcon.icon === "11d" || itemIcon.icon === "11n") {
        setMainDataWeatherText("뇌우");
      } else if (itemIcon.icon === "13d" || itemIcon.icon === "13n") {
        setMainDataWeatherText("눈");
      } else if (itemIcon.icon === "50d" || itemIcon.icon === "50n") {
        setMainDataWeatherText("안개");
      }
    }
  };

  useEffect(() => {
    GetInfo();
  }, [url]);

  return (
    <div>
      <span>홈페이지</span>
      <br />
      <Link to="/" onClick={onLogOutClick}>
        로그아웃
      </Link>
      <br />
      <div>
        <input
          type="text"
          placeholder="지역 입력"
          value={cityInput}
          onChange={onChange}
          onKeyDown={handleOnKeyPress}
        />
        <input type="button" value="찾기" onClick={onClick} />
        <br />
      </div>
      <div>
        <h1>지역 정보</h1>
        {searchError === "" ? (
          <div>
            <span>온도 : {(mainData.temp - 273.15).toFixed(1)}</span>
            <br />
            <span>최대기온 : {(mainData.temp_max - 273.15).toFixed(1)}</span>
            <br />
            <span>최저기온 : {(mainData.temp_min - 273.15).toFixed(1)}</span>
            <br />
            <span>
              <img
                src={
                  searched !== ""
                    ? `http://openweathermap.org/img/wn/${mainDataWeather.icon}@2x.png`
                    : null
                }
                alt="이미지 없음"
              />
            </span>
            <br />
            <span>{mainDataWeatherText}</span>
          </div>
        ) : (
          <span>{searchError}</span>
        )}
      </div>
    </div>
  );
}
