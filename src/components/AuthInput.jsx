import React from "react";
import "./css/AuthInput.css";

export default function AuthInput({
  email,
  setEmail,
  password,
  setPassword,
  newAccount,
}) {
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
  return (
    <div className="authInputBox">
      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={email}
        required
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        required
        onChange={onChange}
      />
      <input
        type="submit"
        className="authSubmit"
        value={newAccount ? "회원가입" : "로그인"}
      />
    </div>
  );
}
