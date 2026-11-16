
import Perform from "./pages/Perform";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Endure from "./pages/Endure";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Training from "./sections/Training";
import Programs from "./sections/Programs";
import Membership from "./sections/Membership";
import Build from "./pages/Build";
import Contact from "./sections/Contact";
import "./App.css";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";

function HomePage() {
  return (
    <>
      <SmoothScroll />

      <main>
        <Hero />
        <Experience />
        <Training />
        <Programs />
        <Membership />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs/build" element={<Build />} />
        <Route path="/programs/endure" element={<Endure />} />
        <Route path="/programs/perform" element={<Perform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
