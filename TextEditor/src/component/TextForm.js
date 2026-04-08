import React, { useState } from 'react'

export default function TextForm(props) {
  const handleUpclick = () => {
    let new_text = text.toUpperCase();
    setext(new_text);
    props.showAlert("Convert to UpperCase !","success");
  }

  const handleLowclick = () => {
    let new_text = text.toLowerCase();
    setext(new_text);
    props.showAlert("Convert to LowerCase !","success");
  }
  
  const handleOnChange = (event) => {
    setext(event.target.value);
  }

  // Function to calculate word count
  const wordCount = (str) => {
    return str.split(/\W/g).filter((element) => element.length !== 0).length;
  }

  const handleExtraSpace = () =>{
    let new_text = text.trim().split(/\s+/g);
    setext(new_text.join(" "));
  }

  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text copied to clipboard!","success");
  }
  const clean = () => {
    setext("");
  }
  // Function to calculate character count excluding spaces
  const charCountWithoutSpaces = (str) => {
    return str.replace(/\W/g, '').length;
  }

  const [text, setext] = useState('');

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >
        <h2>{props.heading}</h2>
        <div className="mb-3" >
          <textarea className="form-control" style={{ backgroundColor: props.mode === 'dark' ? '#042767' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} value={text} onChange={handleOnChange} id="mybox" rows="8"></textarea>
        </div>
        <button className={`btn btn-${props.mode === 'dark' ? 'danger' : 'warning'} mx-3 my-2`} onClick={handleUpclick} disabled ={text.length === 0}  >Convert to UpperCase</button>

        <button className={`btn btn-${props.mode === 'dark' ? 'danger' : 'warning'} mx-3 my-2`} onClick={handleLowclick} disabled ={text.length === 0} >Convert to LowerCase</button>

        <button className={`btn btn-${props.mode === 'dark' ? 'danger' : 'warning'} mx-3 my-2`} onClick={handleExtraSpace} disabled ={text.length === 0}>Remove Extra Space</button>

        <button className={`btn btn-${props.mode === 'dark' ? 'danger' : 'warning'} mx-3 my-2`} onClick={copyText} disabled ={text.length === 0} >Copy Text</button>

        <button className={`btn btn-${props.mode === 'dark' ? 'danger' : 'warning'} mx-3 my-2`} onClick={clean} disabled ={text.length === 0} >Clean Text</button>
      </div>
         
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h2 >Text Summary</h2>
        <p>{"Words: " + wordCount(text)} </p>
        <p> {"Characters (Without spaces): " + charCountWithoutSpaces(text)}</p>
        <p>{"Time to read: " + (0.008 * wordCount(text)) + " Minutes"}</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  )
}
