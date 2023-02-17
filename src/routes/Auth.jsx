import React from "react";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./css/Auth.css";
import AuthInput from "../components/AuthInput.jsx";
import AuthSwitch from "../components/AuthSwitch.jsx";

export default function Auth() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
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
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("존재하는 이메일입니다.");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("비밀번호가 일치하지 않습니다.");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("비밀번호는 6자 이상이어야 합니다.");
      } else if (
        error.message ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      ) {
        setError(
          "로그인 시도를 여러번 실패했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    }
  };

  return (
    <section className="authContainer">
      <form className="authForm" onSubmit={onSubmit}>
        <h1 className="loginText">로그인</h1>
        <AuthInput
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          newAccount={newAccount}
        />
        <div className="authError">{error && <span>{error}</span>}</div>
        <AuthSwitch newAccount={newAccount} setNewAccount={setNewAccount} />
      </form>
    </section>
  );
}
