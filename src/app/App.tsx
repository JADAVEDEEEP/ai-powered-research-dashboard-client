import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";

export default function App() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
