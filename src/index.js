import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<BrowserRouter router>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</>
);
