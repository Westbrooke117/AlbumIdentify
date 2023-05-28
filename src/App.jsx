import './App.css'
import GameView from "./components/GameView.jsx";
import {useState} from "react";

function App() {
    const [formData, setFormData] = useState({username: "", period:"overall", sent: false})

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
                <button onClick={() => {
                    setFormData({
                        ...formData,
                        sent: true
                    })
                }}>Start</button>
            </div>
        )
    } else {
        return (<GameView username={formData.username} period={formData.period}/>)
    }
}


export default App
