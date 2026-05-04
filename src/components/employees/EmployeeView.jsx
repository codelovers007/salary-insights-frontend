import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`${API}/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employee");
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>← Back to Dashboard</button>

      <h2>Employee Details</h2>

      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "5px",
        maxWidth: "400px"
      }}>
        <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
        <p><strong>Job Title:</strong> {employee.job_title}</p>
        <p><strong>Country:</strong> {employee.country}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Department:</strong> {employee.department || "-"}</p>
        <p><strong>Date of Joining:</strong> {employee.date_of_joining || "-"}</p>
      </div>
    </div>
  );
}
