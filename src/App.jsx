import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";

function App() {
  return (
    <div className="App">
        <ImageGrid width={5} height={5} artist={"tame impala"} album={"the slow rush"}/>
    </div>
  )
}

export default App
