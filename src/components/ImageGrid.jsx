import {createRef, Component} from "react";
class ImageGrid extends Component {
    state = {
        squares: [],
        interval: false
    }
    constructor(props){
        super(props)
        this.state.squares = Array.from({ length: props.width * props.height }, (_, i) => i); // list of squares left to reveal (1D array)
        this.refs = createRef(); // keeps track of tiles, this initializes it
    }
    componentDidMount(){   
        if(this.state.interval === false) {
            this.state.interval = setInterval(_=>this.revealSquare(), this.props.delay);
            setTimeout(this.revealSquare(), 20);
        }
    }
    componentDidUpdate(){
        // console.log("huh");
        // this.revealSquare();
    }

    newImage(){
        this.state.squares = Array.from({ length: this.props.width * this.props.height }, (_, i) => i);
        for(let i = 0; i < this.state.squares.length; i++){
            this.refs[this.state.squares[i]].classList.remove('revealed');
        }
        clearInterval(this.state.interval);
        this.state.interval = setInterval(_=>this.revealSquare(), this.props.delay);
        setTimeout(this.revealSquare(), 20);
    }
    revealAll(){
        clearInterval(this.state.interval)
        this.state.interval = false;
        for(let i = 0; i < this.state.squares.length; i++){
            this.refs[this.state.squares[i]].classList.add('revealed');
        }
    }
    revealSquare(){
        let ri = Math.floor(Math.random() * this.state.squares.length); // get random place in squares left (as squares index not tiles id)
        this.refs[this.state.squares[ri]].classList.add('revealed'); // get ref with squareId (the tile's id) and add revealed class
        this.state.squares.splice(ri, 1);
    
        if (this.state.squares.length === 0){
            this.props.itsover();
            clearInterval(this.state.interval); // if over: be over
        }
    }
    render(){
        const width = this.props.width;
        const height = this.props.height;
        this.refs = [];
        return <div id="background-container" style={{backgroundImage: `url(${this.props.data.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: '100%'}}>
            {Array(height).fill(0).map((row, i) => (
                    <div key={i} className="blocks">
                        {Array(width).fill(0).map((col, j) => (
                            <div
                                className="block"
                                id={`${i},${j}`}
                                key={j}
                                ref = {e=>this.refs[i+j*width]=e} // sets the tile div into refs to be gotten later (with 1D id)
                                style={{
                                    width: `${100 / width}%`,
                                    height: `${100 / height}%`,
                                }}
                            />
                        ))}
                    </div>
                ))}
        </div>
    }
}

export default ImageGrid;