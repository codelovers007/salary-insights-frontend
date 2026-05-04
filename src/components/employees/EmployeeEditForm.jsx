import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000";

export default function EditPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [countries, setCountries] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDropdowns();
    fetchEmployee();
  }, []);
  
  const fetchDropdowns = async () => {
    const [cRes, jRes] = await Promise.all([
      axios.get(`${API}/dropdowns/countries`),
      axios.get(`${API}/dropdowns/job_titles`)
    ]);
  
    setCountries(cRes.data);
    setJobs(jRes.data);
  };

  const fetchEmployee = async () => {
    const res = await axios.get(`${API}/employees/${id}`);
    setEmployee(res.data);
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/employees/${id}`, {
      employee: employee,
    });
    navigate('/');
    alert("Updated!");
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        flexWrap: "wrap", // allows wrap on small screens
        alignItems: "center"
      }}
    >
      <h2>Edit Employee</h2>

      <input
        name="first_name"
        value={employee.first_name}
        onChange={handleChange}
      />

      <input
        name="last_name"
        value={employee.last_name}
        onChange={handleChange}
      />

      <select
        name="country"
        value={employee.country}
        onChange={handleChange}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        name="job_title"
        value={employee.job_title}
        onChange={handleChange}
      >
        <option value="">Select Job</option>
        {jobs.map((j) => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}