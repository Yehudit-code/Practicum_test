import logo from './logo.svg';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import StartPlay from './components/StartPlay';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
        <Route path="/" element={<StartPlay />} />
        <Route path="/home" element={<Home/> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
