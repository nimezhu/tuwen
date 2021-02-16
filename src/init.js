import ReactDOM from "react-dom"
import React from "react"
import App from "./App"
export default function(el){
    el.style.backgroundColor = "#333"  
    ReactDOM.render(<App/>,el)
}
