import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookingsPage from "./pages/BookingsPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/book" element={<Home />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
