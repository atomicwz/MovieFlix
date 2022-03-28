import React from "react";
import { IInput, Input } from "../Input/Input";
import { Loading } from "../Loading/Loading";
import "./Header.module.css";

interface IHeader{
  loading: boolean
  filter: React.ChangeEventHandler<HTMLInputElement>
}


export const Header = (props: IHeader) => {
  return (
    <header>
      {props.loading && <Loading/>}
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
