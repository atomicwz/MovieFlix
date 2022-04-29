import React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@chakra-ui/react";

export const Loading = () => (
	<Button
		isLoading
		loadingText='Loading'
		colorScheme='black'
		variant='outline'
		spinnerPlacement='start'
	/>
);


export default observer(Loading);
