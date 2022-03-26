import React from "react";
import { Input } from "../Input/Input";
import "./Header.module.css";

export const Header = (props: any) => {
  return (
    <header>
      <div>
        <h1>MovieFlix</h1>
      </div>
      <Input onChange={props.filter} />
      <div>
        <p>User</p>
      </div>
    </header>
  );
};
