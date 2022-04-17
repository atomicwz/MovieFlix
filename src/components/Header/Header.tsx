import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { Loading } from "../Loading/Loading";
import "./Header.module.css";

interface IHeader{
  filter: React.ChangeEventHandler<HTMLInputElement>
  loading: boolean
}

export const Header = (props: IHeader) => {
  return (
    <header>
      {props.loading && <Loading/>}
      <div>
        <h1>MovieFlix</h1>
      </div>
      <Input onChange={props.filter} />
    </header>
  );
};
