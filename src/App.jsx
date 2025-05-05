import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import About from "./pages/About";
// import ExchangeRates from "./pages/ExchangeRates";
// import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/exchange-rates" element={<ExchangeRates />} /> */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
