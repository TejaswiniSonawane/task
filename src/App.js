
import './App.css';
import React from "react";
import {Routes, Route, Switch, BrowserRouter} from "react-router-dom";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import PageNotFound from "./Pages/PageNotFound";
import LoginForm from "./Pages/LoginForm";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
    </div>
  );
}

export default App;
