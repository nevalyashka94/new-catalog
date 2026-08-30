import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Regions from "./pages/Regions";
import Brands from "./pages/Brands";
import BrandPage from "./pages/BrandPage";

export default function App() {
  return (
    <HashRouter>
      <div className="grain flex min-h-screen flex-col bg-[var(--color-obsidian)]">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:id" element={<BrandPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
