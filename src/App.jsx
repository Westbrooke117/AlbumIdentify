import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";

function App() {
  return (
    <div className="App">
        <ImageGrid width={9} height={9} artist={"aurora"} album={"a different kind of human"}/>
    </div>
  )
}

export default App
