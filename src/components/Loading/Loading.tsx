import React from "react";
import styled from "./Loading.module.css";
import { ReactComponent as Spinner } from "../../Assets/spinner.svg";
import { observer } from "mobx-react-lite";

export const Loading = () => (
	<div className={styled.loading}>
		<Spinner />
	</div>
);


export default observer(Loading);
