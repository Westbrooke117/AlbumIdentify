import './App.css'
import GameView from "./components/GameView.jsx";
import {useState} from "react";

function App() {
    const [formData, setFormData] = useState({
        username: "",
        period:"overall",
        difficulty: 3,
        sent: false
    })

    if (formData.sent === false){
        return (
            <div className={"centerContent"}>
                <h1>AlbumIdentify</h1>
                <form>
                    <label htmlFor={"username-input"}>last.fm Username:</label>
                    <input id={"username-input"} className={"textinput"} onChange={(event) => {
                        setFormData({
                            ...formData,
                            username: event.target.value
                        })
                    }}/>
                </form>
                <form>
                    <label htmlFor={"time-periods"}>Time Period:</label>
                    <select name={"time-periods"} onChange={(event) => {
                        setFormData({
                            ...formData,
                            period: event.target.value
                        })
                    }}>
                        <option value={"overall"}>Overall</option>
                        <option value={"12month"}>12 Months</option>
                        <option value={"6month"}>6 Months</option>
                        <option value={"3month"}>3 Months</option>
                        <option value={"1month"}>1 Month</option>
                        <option value={"7day"}>7 Days</option>
                    </select>
                </form>
                <form>
                    <label htmlFor={"difficulty"}>Difficulty:</label>
                    <select name={"difficulty"} onChange={(event) => {
                        setFormData({
                            ...formData,
                            difficulty: parseInt(event.target.value)
                        })
                    }}>
                        <option value={3}>Easy (3x3)</option>
                        <option value={5}>Medium (5x5)</option>
                        <option value={7}>Hard (7x7)</option>
                        <option value={9}>Impossible (9x9)</option>
                    </select>
                </form>
                <button onClick={() => {
                    setFormData({
                        ...formData,
                        sent: true
                    })
                }}>Start</button>
            </div>
        )
    } else {
        return (<GameView username={formData.username} period={formData.period} size={formData.difficulty}/>)
    }
}


export default App
