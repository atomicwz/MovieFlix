import { observer } from "mobx-react-lite";
import React from "react";
import "./Input.module.css";

export interface IInput {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<IInput> =(props: IInput) => (
	<input
		placeholder="Pesquise por filmes"
		type="search"
		onChange={props.onChange}
	/>
);

export default observer(Input);
