import { observer } from "mobx-react-lite";
import React from "react";
import { Input } from "../Input/Input";
import { Loading } from "../Loading/Loading";
import "./Header.module.css";

interface IHeader {
	filter: React.ChangeEventHandler<HTMLInputElement>;
	loading: boolean;
}

export const Header: React.FC<IHeader> =(props) => (
	<header>
		{props.loading && <Loading />}
		<div>
			<h1>MovieFlix</h1>
		</div>
		<Input onChange={props.filter} />
	</header>
);

export default observer(Header);
