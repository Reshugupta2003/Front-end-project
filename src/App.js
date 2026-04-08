import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };
  const removeClass=()=>{
    document.body.classList.remove('white');
    document.body.classList.remove('#9cfa3c');
    document.body.classList.remove('#ff0000');
    document.body.classList.remove('#cc75cf');
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark Mode on!", "danger");
    } else {
      setMode('light');
       document.body.style.backgroundColor = 'white';
      showAlert("Light Mode on!", "success");
    }
  };
  const toggle = (cls) => {
    removeClass();
    document.body.style.backgroundColor = cls;
  };
  return (
    <>
      <Router>
        <Navbar title="TextUtils" about="About" mode={mode} toggle={toggle} toggleMode ={toggleMode}/>
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            {/* /users --> Component-1 {only using path}
                /users/home --> Component-2 {using exact path}  */}
            <Route path="/about" element={<About mode={mode} />} />
            
            {/* Default Route for TextForm */}
            <Route
              exact path="/"
              element={
                <TextForm heading="Try TextUtils-  Words count, Character count, Remove extra space" mode={mode} showAlert={showAlert} />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

