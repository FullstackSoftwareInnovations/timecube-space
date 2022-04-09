import React, {useState} from "react";
import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import {generateChunks} from "timecube";

const timecube = require('timecube')

function App() {
    return(
        <HashRouter>
            <Routes>
                <Route path={'/'} element ={<Home/>} />
                <Route path={'/daily'} element ={<Daily/>}/>
            </Routes>
        </HashRouter>
    )

}


function Home(){
    let chunks = timecube.generateChunks(timecube.maxChunks, 0, true)

    let first = chunks.shift()
    chunks.unshift(chunks.pop())

    return (
        <div className="App" style = {{maxWidth: 500, margin: '0 auto', padding: "0 40px", textAlign: 'left'}}>
            <p style = {{fontSize: '2.25em', fontWeight: 1000}}>
                {first}
            </p>

            <div style = {{margin: '0 auto'}}>
                <button onClick = {()=> loadPage('/daily')} style = {{...buttonStyle, display: 'inline-block'}}>
                    Daily Time Cube Fact
                </button>
            </div>



            { chunks.map((chunk)=> <TimeCubeChunk text = {chunk}/> )}
        </div>
    );
}

function Daily(){
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    let dailyChunk = timecube.generateChunks(1, day%timecube.maxChunks, true)
    let header =  generateChunks()

    const [chunk, loadChunk] = useState(dailyChunk)

    const handleClick = ()=>{
        loadChunk(timecube.generateRandomChunk())
    }

    return(
        <div className="App" style = {{maxWidth: 500, margin: '0 auto', padding: "0 40px", textAlign: 'left'}}>
            <p style = {{fontSize: '2.25em', fontWeight: 1000}}>
                {header}
            </p>

            <button onClick = {()=> loadPage('/')} style = {{...buttonStyle, display: 'inline-block'}}>
                All Time Cube Facts
            </button>


            <button onClick = {handleClick} style = {{...buttonStyle, display: 'inline-block'}}>
                Random Time Cube Fact
            </button>

            <p style = {{fontSize: '1.8em', fontWeight: 700, maxWidth: 500, whiteSpace: 'pre-line'}}>
                ***********************
            </p>


            <TimeCubeChunk text = {chunk}/>
        </div>
    )
}

function TimeCubeChunk(props){
    return (
        <p style = {{fontSize: '1.8em', fontWeight: 700, maxWidth: 500, whiteSpace: 'pre-line', ...props.style}} >
            {props.text}
            <br/>
            <br/>
            ***********************
        </p>
    )
}

function loadPage(page){
    window.location.hash = page
}

const buttonStyle = {
    margin: 5,
    padding: '10px 7px',
    fontSize: '1.3em',
    backgroundColor: '#add8e6'
}

export default App;
