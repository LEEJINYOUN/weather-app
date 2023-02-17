import React from "react";
import "./css/AuthSwitch.css";

export default function AuthSwitch({ newAccount, setNewAccount }) {
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <div className="authSwitchContainer">
      {newAccount ? (
        <>
          <span className="authQuestion">회원인가요?</span>
          <span className="authSwitch" onClick={toggleAccount}>
            로그인
          </span>
        </>
      ) : (
        <>
          <span className="authQuestion">처음인가요?</span>
          <span className="authSwitch" onClick={toggleAccount}>
            회원가입
          </span>
        </>
      )}
    </div>
  );
}
