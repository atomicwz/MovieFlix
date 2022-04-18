import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../../components/Error/NotFound";
import { Details } from "../details/details";
import { Home } from "../home";

export const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="movie/:id" element={<Details />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
);
