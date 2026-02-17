import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Navbar";
import Footer from "./components/Footer";
import RulesRegulations from "./pages/RulesRegulations";
function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/rules" element = {<RulesRegulations/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
