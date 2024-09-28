import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [classList, setClassList] = useState([]);

  const handleAddClass = () => {
    setClassList([...classList, { studentName, className }]);
    setStudentName('');
    setClassName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Class Information</h1>
        <div>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button onClick={handleAddClass}>Add Class</button>
        </div>
        <div>
          <h2>Class List</h2>
          <ul>
            {classList.map((item, index) => (
              <li key={index}>
                {item.studentName} - {item.className}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
