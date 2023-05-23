import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";
import { useState } from "react";

function App() {
    const [ album, setAlbum] = useState();

    return (
        <div className="App">
            <ImageGrid width={5} height={5} artist={"alt-j"} album={"relaxer"}/>
        </div>
    )
}


export default App
