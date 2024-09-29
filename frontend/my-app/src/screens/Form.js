import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = () => {
    const [numClasses, setNumClasses] = useState(0);
    const [classes, setClasses] = useState([]);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track if the form is submitted
    const [screwedPercentage, setScrewedPercentage] = useState(70); // Default fixed percentage value

    useEffect(() => {
        const areAnyInputsEmpty = numClasses === 0 || classes.some(classItem => !classItem.department || !classItem.number || !classItem.teacher);
        setSubmitDisabled(areAnyInputsEmpty);
    }, [classes, numClasses]);

    const incrementClasses = () => {
        setNumClasses(numClasses + 1);
        setClasses([...classes, { department: '', number: '', teacher: '' }]);
    };

    const decrementClasses = () => {
        if (numClasses > 0) {
            setNumClasses(numClasses - 1);
            setClasses(classes.slice(0, -1));
        }
    };

    const handleInputChange = (index, field, value) => {
        const newClasses = [...classes];
        newClasses[index][field] = value;
        setClasses(newClasses);
    };

    const handleSubmit = () => {
        // Simulate an API call here in the future
        // For now, set form as submitted
        setIsSubmitted(true);
    };

    // Conditionally render form or result
    if (isSubmitted) {
        return (
            <div className="result">
                <h2>You are {screwedPercentage}% SCREWED!</h2>
                <h3>Class Details:</h3>
                <ul>
                    {classes.map((classItem, index) => (
                        <li key={index}>
                            <h4>Class {index + 1}</h4>
                            <p><strong>Department:</strong> {classItem.department}</p>
                            <p><strong>Number:</strong> {classItem.number}</p>
                            <p><strong>Teacher:</strong> {classItem.teacher}</p>
                            <p><strong>Difficulty Rating:</strong> {Math.floor(Math.random() * 100)}% (this will be fetched from API)</p> {/* For now, it's a random value */}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="Form">
            <h2>Input Your Classes</h2>
            <div>
                <button className="subtract-button" onClick={decrementClasses}>-</button>
                <input type="text" readOnly value={numClasses} />
                <button className="add-button" onClick={incrementClasses}>+</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Class Department</th>
                        <th>Class Number</th>
                        <th>Teacher's Name</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={classItem.department}
                                    onChange={(e) => handleInputChange(index, 'department', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={classItem.number}
                                    onChange={(e) => handleInputChange(index, 'number', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={classItem.teacher}
                                    onChange={(e) => handleInputChange(index, 'teacher', e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button style={{ width: 'fit-content' }} onClick={handleSubmit} disabled={isSubmitDisabled}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Form;
