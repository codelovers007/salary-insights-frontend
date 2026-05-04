import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000";

export default function App() {
  const [employees, setEmployees] = useState([]);
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Employee Dashboard</h1>

      {/* Insights Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Country Salary Insights</h2>

        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={fetchCountryStats}>Submit</button>

        {stats && (
          <div style={{ marginTop: "10px" }}>
            <p>Min: {stats.min}</p>
            <p>Max: {stats.max}</p>
            <p>Avg: {stats.avg}</p>
          </div>
        )}

        <hr />

        <h2>Job Average Salary Insights</h2>
        <input
          placeholder="Job Country"
          value={jobCountry}
          onChange={(e) => setJobCountry(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={fetchJobAvg}>Submit</button>

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
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{full_name(e)}</td>
                <td>{e.job_title}</td>
                <td>{e.country}</td>
                <td>{e.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}