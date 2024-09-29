import React, { useState } from 'react';
//import './Form.css'; // Assuming you have some CSS to make it fancy

const Form = () => {
    const [step, setStep] = useState(1);
    const [numClasses, setNumClasses] = useState(0);
    const [classes, setClasses] = useState([]);

    const handleNumClassesChange = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
        setNumClasses(value);
        setClasses(Array.from({ length: value }, () => ({ professor: '', department: '', courseNumber: '' })));
    };

    const handleClassChange = (index, field, value) => {
        const newClasses = [...classes];
        newClasses[index] = { ...newClasses[index], [field]: value };
        setClasses(newClasses);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store the classes data for future use
        console.log(classes);
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    return (
        <div className="fancy-form-container">
            {step === 1 && (
                <div className="prompt">
                    <h2>Enter Number of Classes</h2>
                    <div className="form-group">
                        <label>Number of Classes:</label>
                        <input
                            type="number"
                            value={numClasses}
                            onChange={handleNumClassesChange}
                            className="form-control"
                        />
                    </div>
                    <button onClick={handleNextStep} className="next-button">Next</button>
                </div>
            )}
            {step === 2 && (
                <form onSubmit={handleSubmit} className="fancy-form">
                    <h2>Enter Your Class Schedule</h2>
                    {classes.map((classItem, index) => (
                        <div key={index} className="class-group">
                            <h3>Class {index + 1}</h3>
                            <div className="form-group">
                                <label>Professor Name:</label>
                                <input
                                    type="text"
                                    value={classItem.professor}
                                    onChange={(e) => handleClassChange(index, 'professor', e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Department Code (4 letters):</label>
                                <input
                                    type="text"
                                    value={classItem.department}
                                    onChange={(e) => handleClassChange(index, 'department', e.target.value)}
                                    className="form-control"
                                    maxLength="4"
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Number (3 digits):</label>
                                <input
                                    type="text"
                                    value={classItem.courseNumber}
                                    onChange={(e) => handleClassChange(index, 'courseNumber', e.target.value)}
                                    className="form-control"
                                    maxLength="3"
                                />
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Form;