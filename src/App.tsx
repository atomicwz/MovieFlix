import * as React from "react";
import { AppRoutes } from "./pages/routes";
import { ChakraProvider } from "@chakra-ui/react";
import  theme  from "./themes/colors";

const App = () => (
	<ChakraProvider theme={theme}>
		<AppRoutes />
	</ChakraProvider>
);

export default App;
