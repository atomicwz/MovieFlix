import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const black = {
	50: "#746C69",
	300: "rgb(51, 51, 51)",
	400: "RGBA(0, 0, 0, 0.24)",
	700: "RGBA(0, 0, 0, 0.64)",
	800: "#141414",
	900: "Black",
};

const red = {
	50: "#E6FFFA",
	800: "#C53030",
};


const colors = {
	primary: black,
	secondary: red,
};

const theme: ThemeConfig = extendTheme({colors});

export default theme;

