
import './App.css';
import React from "react";
import {Routes, Route, Switch, BrowserRouter} from "react-router-dom";
import Layout from "./Pages/Layout";
import PageNotFound from "./Pages/PageNotFound";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/signup" element={<SignupForm/>} />
                <Route path="/homepage" element={<Layout />} />
                <Route path="/" element={<LoginForm />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
    </div>
  );
}

export default App;
