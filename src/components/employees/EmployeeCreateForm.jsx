import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000";

export default function EmployeeCreateForm() {
  const [countries, setCountries] = useState([]);
  const [jobs, setJobs] = useState([]);
	const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    country: "",
    salary: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDropdowns();
  }, []);
  
  const fetchDropdowns = async () => {
    const [cRes, jRes] = await Promise.all([
      axios.get(`${API}/dropdowns/countries`),
      axios.get(`${API}/dropdowns/job_titles`)
    ]);
  
    setCountries(cRes.data);
    setJobs(jRes.data);
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API}/employees`, {
        employee: employee
      });
      alert("Employee created successfully");
      navigate("/");
    } catch (err) {
      alert("Create failed");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        flexWrap: "wrap", // allows wrap on small screens
        alignItems: "center"
      }}
    >
      <h2>Create New Employee</h2>

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

			<input
				name="salary"
				value={employee.salary}
				onChange={handleChange}
				placeholder="Salary"
			/>

      <button onClick={handleCreate}>Create</button>

			<button onClick={() => navigate("/")}>
				← Back to Dashboard
			</button>
    </div>
  );
}