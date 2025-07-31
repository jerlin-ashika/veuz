import "./App.css";
import TicketGrid from "./pages/landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationSuccess from "./pages/registrationSuccess";
import RegistrationForm from "./pages/registrationForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/veuz">
        <Routes>
          <Route path="/" element={<TicketGrid />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
