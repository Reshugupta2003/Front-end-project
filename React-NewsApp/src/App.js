import './App.css';
import React, { Component } from 'react';  // snippet code -rcc
import { Navbar } from './Components/Navbar'; // Use {} because it's name export
import News from './Components/News';       // this is default export
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API
  state ={
    progress: 0,
  }
  setProgress =(progress) =>{
    this.setState({progress: progress});
  }
  render() {              // it haves a render menthod which is not in functional
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
               color="red"
               height = {3}
              progress= {this.state.progress}        
          />  
         <Routes>  {/*   We can send props here. ex- country = "us" and Set progress using props */}
            <Route path="/business" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="business" pageSize={10} country="us" category="business" />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="entertainment" pageSize={10} country="us" category="entertainment" />} />
            <Route path="/health" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="health" pageSize={10} country="us" category="health" />} />
            <Route path="/science" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="science" pageSize={10} country="us" category="science" />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="sports" pageSize={10} country="us" category="sports" />} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="technology" pageSize={10} country="us" category="technology" />} />
            <Route path="/general" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="general" pageSize={10} country="us" category="general" />} />
            <Route path="/" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="general" pageSize={10} country="us"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}



