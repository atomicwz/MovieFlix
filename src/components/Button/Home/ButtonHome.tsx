import React, { Children } from "react";
import { Link } from "react-router-dom";
import styled from './ButtonHome.module.css'


export const ButtonHome = () => {
  return (
    <Link to="/">
      <button className={styled.buttonHome}>Voltar ao início</button>
    </Link>
  );
};
