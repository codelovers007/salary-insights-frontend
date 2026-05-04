import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeEditForm from "./components/employees/EmployeeEditForm";
import EmployeeCreateForm from "./components/employees/EmployeeCreateForm";
import EmployeeView from "./components/employees/EmployeeView";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EmployeeEditForm />} />
        <Route path="/create" element={<EmployeeCreateForm />} />
        <Route path="/view/:id" element={<EmployeeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;