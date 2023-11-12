import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { PageLayout } from "./Pages/PageLayout/PageLayout";
import { Monitoring } from "./Pages/Monitoring/Monitoring";
import { Storage } from "./Pages/Storage/Storage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<PageLayout />}>
            <Route path="/Monitoring" element={<Monitoring />} />
            <Route path="/Storage" element={<Storage />} />
        </Route>
    )
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
