import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StudentsPage from "./pages/StudentsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css"


export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1, padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}


