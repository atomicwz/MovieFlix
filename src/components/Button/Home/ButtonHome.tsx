import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import styled from "./ButtonHome.module.css";


export const ButtonHome = () => (
	<Link to="/">
		<button className={styled.buttonHome}>Voltar ao início</button>
	</Link>
);

export default observer(ButtonHome);
