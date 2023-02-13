import React from "react";
import { useState } from "react";
import { authService } from "../fbase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Auth() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입이 되었습니다.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 되었습니다. 환영합니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = () => {
    let provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          className="authSubmit"
          value={newAccount ? "회원가입" : "로그인"}
        />
      </form>
      <div className="authSwitchContainer">
        {newAccount ? (
          <>
            <span>회원인가요?</span>
            <span onClick={toggleAccount}>로그인</span>
          </>
        ) : (
          <>
            <span>처음인가요?</span>
            <span onClick={toggleAccount}>회원가입</span>
          </>
        )}
      </div>
      <div>
        <button onClick={onSocialClick} name="google">
          구글 로그인
        </button>
      </div>
    </div>
  );
}
