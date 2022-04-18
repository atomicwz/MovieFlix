import { observer } from "mobx-react-lite";
import React from "react";
import styled from "./ButtonPagination.module.css";

export interface IButtonPagination {
	previous: React.MouseEventHandler<HTMLButtonElement>;
	next: React.MouseEventHandler<HTMLButtonElement>;
	page: number;
}

export const ButtonPagination: React.FC<IButtonPagination> = (props) => (
	<div className={styled.buttonDiv}>
		<button onClick={props.previous}>{"<"}</button>
		<button className="page">{props.page + 1}</button>
		<button onClick={props.next}>{">"}</button>
	</div>
);

export default observer(ButtonPagination);
