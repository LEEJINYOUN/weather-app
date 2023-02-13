import React from "react";
import { authService } from "../fbase";
import { Link } from "react-router-dom";

export default function Home() {
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <div>
      홈
      <Link to="/" onClick={onLogOutClick}>
        로그아웃
      </Link>
    </div>
  );
}
