import { observer } from "mobx-react-lite";
import React from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface IHeader {
	filter: React.ChangeEventHandler<HTMLInputElement>;
	loading: boolean;
	color: string;
}

export const Header: React.FC<IHeader> =(props) => (
	<Flex
		width="100%"
		justifyContent="space-between"
		direction="row"
		alignItems="center"
		position="relative"
		bg={props.color}
		padding={3}
	>
		<Flex
			width="80%"
			justifyContent="space-between"
			mx="auto"
		>
			<Text
				color="black"
				fontSize="3xl"
				cursor="default"
			>
				IDEUM
			</Text>
			<Flex
				gap={2}
				alignItems="center"
				color="white"
			>
				<Input
					textAlign="right"
					placeholder="FILTER"
					border="none"
					bg="black"
					ml={{
						base: "10px",
						sm: "20px",
					}}
					_placeholder={{color: "white"}}
					_focus={{outline: "none"}}
					onChange={props.filter}
				/>
				<BsSearch color="black" size={35} />
			</Flex>
		</Flex>

	</Flex>
);

export default observer(Header);
