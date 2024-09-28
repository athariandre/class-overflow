import React, { useState } from 'react';
import './App.css';

function App() {
  const [numClasses, setNumClasses] = useState(0);
  const [classInfo, setClassInfo] = useState([]);

  // Function to handle input change for each class info (teacher name and class name)
  const handleInputChange = (index, e) => {
    const updatedClassInfo = [...classInfo];
    updatedClassInfo[index] = {
      ...updatedClassInfo[index],
      [e.target.name]: e.target.value,
    };
    setClassInfo(updatedClassInfo);
  };

  // Function to generate input fields after number of classes is set
  const handleNumClassesSubmit = () => {
    const initialClassInfo = Array.from({ length: numClasses }, () => ({
      teacherName: '',
      className: '',
    }));
    setClassInfo(initialClassInfo);
  };

  const handleSubmit = () => {
    // Submit the class information (for now it just logs it)
    console.log(classInfo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Class Information</h1>

        {/* Step 1: Ask for number of classes */}
        {classInfo.length === 0 ? (
          <div>
            <input
              type="number"
              placeholder="Number of Classes"
              value={numClasses}
              onChange={(e) => setNumClasses(parseInt(e.target.value))}
            />
            <button onClick={handleNumClassesSubmit}>Set Number of Classes</button>
          </div>
        ) : (
          <div>
            <h2>Enter Class Information</h2>

            {/* Step 2: Dynamically generate input fields for class info based on numClasses */}
            {classInfo.map((classItem, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Teacher Name"
                  name="teacherName"
                  value={classItem.teacherName}
                  onChange={(e) => handleInputChange(index, e)}
                  style={{ marginRight: '10px' }}
                />
                <input
                  type="text"
                  placeholder="Class Name"
                  name="className"
                  value={classItem.className}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            ))}

            {/* Step 3: Submit button */}
            <button onClick={handleSubmit}>Submit</button>

            {/* Step 4: Display the submitted class information */}
            <h2>Submitted Class List</h2>
            <ul>
              {classInfo.map((item, index) => (
                <li key={index}>
                  Class: {item.className} (Teacher: {item.teacherName})
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
