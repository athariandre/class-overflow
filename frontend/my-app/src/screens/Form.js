import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Form.css';

const Form = () => {
    // Initialize only with department, course_code, and professor_name
    const initialClasses = JSON.parse(localStorage.getItem('classes')) || [{ department: '', course_code: '', professor_name: '' }];
    const initialNumClasses = initialClasses.length;

    const [numClasses, setNumClasses] = useState(initialNumClasses);
    const [classes, setClasses] = useState(initialClasses);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [screwedPercentage, setScrewedPercentage] = useState(null);
    const [apiResults, setApiResults] = useState([]);

    // Clear old localStorage and ensure only valid fields are stored
    useEffect(() => {
        // TEMPORARY: Clear all storage for debugging
        localStorage.clear(); // Clear everything in localStorage
        console.log('All storage cleared!');
    
        const areAnyInputsEmpty = numClasses === 0 || classes.some(classItem => !classItem.department || !classItem.course_code || !classItem.professor_name);
        setSubmitDisabled(areAnyInputsEmpty);
    
        // Save classes to localStorage whenever they are updated
        localStorage.setItem('classes', JSON.stringify(classes));
    }, [classes, numClasses]);
    

    const incrementClasses = () => {
        setNumClasses(numClasses + 1);
        setClasses([...classes, { department: '', course_code: '', professor_name: '' }]);
    };

    const decrementClasses = () => {
        if (numClasses > 0) {
            setNumClasses(numClasses - 1);
            setClasses(classes.slice(0, -1));
        }
    };

    const handleInputChange = (index, field, value) => {
        const newClasses = [...classes];

        if (field === 'department') {
            newClasses[index][field] = value.slice(0, 4);
        } else if (field === 'course_code') {
            if (/^\d{0,3}$/.test(value)) {  // Only allow up to 3 digits
                newClasses[index][field] = value;
            }
        } else if (field === 'professor_name') {
            if (!/\s/.test(value)) {  // Ensure no spaces in the professor name
                newClasses[index][field] = value;
            }
        }

        setClasses(newClasses);
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        console.log('Submitted:', JSON.stringify(classes));
        try {
            const response = await fetch('http://127.0.0.1:8000/api/course_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(classes),
            });

            if (response.ok) {
                const data = await response.json();
                setApiResults(data);
                setScrewedPercentage(data.reduce((total, course) => total + course.screw_percentage, 0) / data.length);
            } else {
                console.error('Failed to fetch course info');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReset = () => {
        setNumClasses(1);
        setClasses([{ department: '', course_code: '', professor_name: '' }]);
        localStorage.removeItem('classes');
        setIsSubmitted(false);
        setScrewedPercentage(null);
        setApiResults([]);
    };

    if (isSubmitted && apiResults.length > 0) {
        return (
            <div className="result">
                <div className="percentage-box">
                    <h2>You are {screwedPercentage?.toFixed(2)}% SCREWED!</h2>
                </div>

                <div className="class-summary-grid">
                    {apiResults.map((result, index) => (
                        <div key={index} className="class-summary-box">
                            <h4>Class {index + 1}</h4>
                            <p><strong>Department:</strong> {result.department}</p>
                            <p><strong>Course Code:</strong> {result.course_code}</p>
                            <p><strong>Professor:</strong> {result.professor_name}</p>
                            <p><strong>Class Difficulty:</strong> {result.class_difficulty}</p>
                            <p><strong>Professor Difficulty:</strong> {result.professor_difficulty}</p>
                            <p><strong>Reddit Summary:</strong> {result.reddit_summary}</p>
                        </div>
                    ))}
                </div>

                <div className="button-container">
                    <button className="reset-button" onClick={handleReset}>Reset</button>
                </div>
            </div>
        );
    }

    return (
        <div className="Form">
            <h2 className="header-text">Number of classes this semester:</h2>
            <div className="class-counter">
                <button className="decrement-button" onClick={decrementClasses}>-</button>
                <input type="text" readOnly value={numClasses} />
                <button className="increment-button" onClick={incrementClasses}>+</button>
            </div>

            <TransitionGroup component="table" className="classes-table">
                <thead>
                    <tr>
                        <th>Class Department (4 chars)</th>
                        <th>Course Code (3 digits)</th>
                        <th>Professor's Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem, index) => (
                        <CSSTransition key={index} timeout={300} classNames="fade">
                            <tr>
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
                                        value={classItem.course_code}
                                        onChange={(e) => handleInputChange(index, 'course_code', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={classItem.professor_name}
                                        onChange={(e) => handleInputChange(index, 'professor_name', e.target.value)}
                                    />
                                </td>
                            </tr>
                        </CSSTransition>
                    ))}
                </tbody>
            </TransitionGroup>

            <div className="button-container">
                <button className="submit-button" onClick={handleSubmit} disabled={isSubmitDisabled}>
                    Submit
                </button>
                <button className="reset-button" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Form;
