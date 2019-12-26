import React from "react";
import TopNavBar from "./components/Navbar";
import MainArea from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <MainArea />
      <Footer />
    </div>
  );
}

export default App;
