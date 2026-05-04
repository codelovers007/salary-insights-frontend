import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [countries, setCountries] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");
  const [stats, setStats] = useState(null);
  const [jobAvg, setJobAvg] = useState(null);
  const [jobCountry, setJobCountry] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/employees?limit=20`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch dropdown data
  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    const [cRes, jRes] = await Promise.all([
      axios.get(`${API}/dropdowns/countries`),
      axios.get(`${API}/dropdowns/job_titles`)
    ]);

    setCountries(cRes.data);
    setJobs(jRes.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch country stats
  const fetchCountryStats = async () => {
    if (!country) return;
    const res = await axios.get(
      `${API}/insights/country?country=${country}`
    );
    setStats(res.data);
  };

  // Fetch job avg
  const fetchJobAvg = async () => {
    if (!jobCountry || !job) return;
    const res = await axios.get(
      `${API}/insights/job?country=${jobCountry}&job_title=${job}`
    );
    setJobAvg(res.data);
  };

  const full_name = (e) => {
    return e.first_name + " " + e.last_name
  }

  const handleEdit = (id) => {
      // I need to render Edit Employee Form here to update employee
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`${API}/employees/${id}`);

      setEmployees((prev) => prev.filter((e) => e.id !== id));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Employee Dashboard</h1>

      {/* Insights Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Country Salary Insights</h2>

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button style={{ marginLeft: "10px" }} onClick={fetchCountryStats}>Submit</button>

        {stats && (
          <div style={{ marginTop: "10px" }}>
            <p>Min: {stats.min}</p>
            <p>Max: {stats.max}</p>
            <p>Avg: {stats.avg}</p>
          </div>
        )}

        <hr />

        <h2>Job Average Salary Insights</h2>
        <select value={jobCountry} onChange={(e) => setJobCountry(e.target.value)}>
          <option value="">Select Job Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select style={{ marginLeft: "10px" }} value={job} disabled={!jobCountry} onChange={(e) => setJob(e.target.value)}>
          <option value="">Select Job</option>
          {jobs.map((j) => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>

        <button style={{ marginLeft: "10px" }} onClick={fetchJobAvg}>Submit</button>

        {jobAvg && (
          <p style={{ marginTop: "10px" }}>
            Avg Salary: {jobAvg.avg}
          </p>
        )}
      </div>

      {/* 🔹 Employee Table */}
      <div>
        <h2>Employees</h2>

        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Country</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
            
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{full_name(e)}</td>
                <td>{e.job_title}</td>
                <td>{e.country}</td>
                <td>{e.salary}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEdit(e.id)}>Edit</button>
                    <button onClick={() => handleDelete(e.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}