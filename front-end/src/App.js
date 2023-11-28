import "./App.css";
import Home from "./components/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/Register";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
