import React, { useState } from 'react'

export default function About(props) {

    // const [myStyle, setMyStyle] = useState({
    //     color: 'black',
    //     backgroundColor: 'white'
    // })
  
    let myStyle = {
      color: props.mode === "dark"? "white": "rgb(4 39 67)",
      backgroundColor : props.mode === 'dark' ? 'rgb(4 39 67)':'white',
    }
  return (
    <div className="container">
        <h1 className='my-3' style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >About Us</h1>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyle}>
      <strong> 1. Analyze Your Text</strong> 
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
      Our platform allows you to quickly and efficiently analyze your text. Whether you need to <strong> count words, characters, copy text, or check for readability </strong>, our tools are designed to make text analysis effortless. Save time and focus on what matters most—your content!
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyle}>
        <strong>2. Free To Use</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
      Enjoy all our features without spending a penny! Our tools are completely free to use, providing you with the flexibility to perform unlimited text analyses without any hidden costs or subscriptions.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={myStyle}>
      <strong> 3. Browser Compatibility</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
      Access our platform from any modern web browser without the need for installations or downloads. Whether you're using <strong>Chrome, Firefox, Safari, or Edge,</strong> our tools are optimized for seamless performance across all browsers.
      </div>
    </div>
  </div>
 </div>
    </div>
  )
}


