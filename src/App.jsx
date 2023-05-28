import './App.css'
import GameView from "./components/GameView.jsx";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";

function App() {
    const [formData, setFormData] = useState({username: "", period:"overall", sent: false})

    if (formData.sent === false){
        return (
            <div style={{marginLeft: "40%", marginRight: "40%"}}>
                <h1 style={{textAlign: "center"}}>AlbumIdentify</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>last.fm Username</Form.Label>
                        <Form.Control type="text" onChange={(event) => {
                            setFormData({
                                ...formData,
                                username: event.target.value
                            })
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Time Period</Form.Label>
                        <Form.Select onChange={(event) => {
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
                        </Form.Select>
                    </Form.Group>
                    <Button type={"submit"} onClick={(event) => {
                        event.preventDefault();

                        setFormData({
                            ...formData,
                            sent: true
                        })
                    }}>Start</Button>
                </Form>
            </div>
        )
    } else {
        return (<GameView username={formData.username} period={formData.period}/>)
    }
}


export default App
