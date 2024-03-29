import './App.css'
import React from "react";
import {Route, Routes} from "react-router-dom";
import Menu from "./pages/Menu.jsx";
import GamePage from "./pages/GamePage.jsx";
import NoPage from "./pages/NoPage.jsx";
import Summary from "./pages/Summary.jsx";
import Changelog from "./pages/Changelog.jsx";

function App() {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Menu/>}></Route>
                <Route path={"/play/:username/:period/:size"} element={<GamePage/>}></Route>
                <Route path={"/summary/:score/:total"} element={<Summary/>}></Route>
                <Route path={"/changelog"} element={<Changelog/>}></Route>
                <Route path={"*"} element={<NoPage/>}></Route>
            </Routes>
        </div>
    );
}


export default App
