import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export class App extends React.Component<any, any>
{
	
	render()
	{
		return (
				<BrowserRouter> <Routes> <Route path={"*"} element={<Home />} /> </Routes> </BrowserRouter>);
	}
}
