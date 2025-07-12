import './App.css';
import React, { useState } from 'react';
import { Navbar } from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color="red" height={3} progress={progress} />
        <Routes>
          <Route path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={10} country="us" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={10} country="us" category="entertainment" />} />
          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={10} country="us" category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={10} country="us" category="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={10} country="us" category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={10} country="us" category="technology" />} />
          <Route path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={10} country="us" category="general" />} />
          <Route path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={10} country="us" category="general" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
