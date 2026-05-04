import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeEditForm from "./components/employees/EmployeeEditForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EmployeeEditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;