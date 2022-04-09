import React from "react";
import './App.css'

const timecube = require('timecube')

function App() {
    let chunks = timecube.generateChunks(timecube.maxChunks, 0, true)

    let first = chunks.shift()
    chunks.unshift(chunks.pop())

    return (
        <div className="App" style = {{maxWidth: 500, margin: '0 auto', padding: "0 40px", textAlign: 'left'}}>
            <p style = {{fontSize: '2.25em', fontWeight: 1000}}>
                {first}
            </p>

            { chunks.map((chunk)=> <TimeCubeChunk text = {chunk}/> )}
        </div>
    );
}

function TimeCubeChunk(props){
    return (
        <p style = {{fontSize: '1.8em', fontWeight: 700, maxWidth: 500, whiteSpace: 'pre-line'}}>
            {props.text}
            <br/>
            <br/>
            ***********************
        </p>
    )
}

export default App;
