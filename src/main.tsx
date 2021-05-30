import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ToastContextProvider from "./context/ToastContext";
import { client } from "./graphql";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ToastContextProvider>
                <App />
            </ToastContextProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
