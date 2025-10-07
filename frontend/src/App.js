import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    gender: '',
    department: '',
    section: '',
    skills: []
  });
  const [message, setMessage] = useState(null);

  const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle skills checkboxes
  const handleSkills = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      skills: checked ? [...prev.skills, value] : prev.skills.filter(s => s !== value)
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`${API}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setMessage('✅ Student saved successfully');
      setForm({ name: '', rollNo: '', gender: '', department: '', section: '', skills: [] });
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      {message && <p className="msg">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Roll No</label>
        <input name="rollNo" value={form.rollNo} onChange={handleChange} required />

        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} />
            Female
          </label>
        </div>

        <label>Department</label>
        <select name="department" value={form.department} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="AIDS">AIDS</option>
          <option value="CET">CET</option>
        </select>

        <label>Section</label>
        <select name="section" value={form.section} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <label>Skills</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" value="JavaScript" checked={form.skills.includes('JavaScript')} onChange={handleSkills} />
            JavaScript
          </label>
          <label>
            <input type="checkbox" value="React" checked={form.skills.includes('React')} onChange={handleSkills} />
            React
          </label>
          <label>
            <input type="checkbox" value="Node.js" checked={form.skills.includes('Node.js')} onChange={handleSkills} />
            Node.js
          </label>
          <label>
            <input type="checkbox" value="MongoDB" checked={form.skills.includes('MongoDB')} onChange={handleSkills} />
            MongoDB
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
