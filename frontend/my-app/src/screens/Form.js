import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Form.css';

const Form = () => {
    const initialClasses = JSON.parse(localStorage.getItem('classes')) || [{ department: '', number: '', teacher: '' }];
    const initialNumClasses = initialClasses.length;

    const [numClasses, setNumClasses] = useState(initialNumClasses);
    const [classes, setClasses] = useState(initialClasses);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [screwedPercentage, setScrewedPercentage] = useState(70);

    useEffect(() => {
        const areAnyInputsEmpty = numClasses === 0 || classes.some(classItem => !classItem.department || !classItem.number || !classItem.teacher);
        setSubmitDisabled(areAnyInputsEmpty);

        // Save classes to localStorage whenever they are updated
        localStorage.setItem('classes', JSON.stringify(classes));
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

        if (field === 'department') {
            newClasses[index][field] = value.slice(0, 4);
        } else if (field === 'number') {
            if (/^\d{0,3}$/.test(value)) {
                newClasses[index][field] = value;
            }
        } else if (field === 'teacher') {
            if (!/\s/.test(value)) {
                newClasses[index][field] = value;
            }
        }

        setClasses(newClasses);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setNumClasses(1);
        setClasses([{ department: '', number: '', teacher: '' }]);
        localStorage.removeItem('classes');
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        useEffect(() => {
            const fetchScrewedPercentage = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:5000/course_info', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ classes }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setScrewedPercentage(data.screwedPercentage);
                    } else {
                        console.error('Failed to fetch screwed percentage');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchScrewedPercentage();
        }, [classes]);




        return (
            <div className="result">
                <div className="percentage-box">
                    <h2>You are {screwedPercentage}% SCREWED!</h2>
                </div>

                <div className="class-summary-grid">
                    {classes.map((classItem, index) => (
                        <div key={index} className="class-summary-box">
                            <h4>Class {index + 1}</h4>
                            <p><strong>Department:</strong> {classItem.department}</p>
                            <p><strong>Number:</strong> {classItem.number}</p>
                            <p><strong>Teacher:</strong> {classItem.teacher}</p>
                            <p><strong>Difficulty Rating:</strong> {Math.floor(Math.random() * 100)}%</p>
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
            <h2 className="header-text">number of classes this semester:</h2>
            <div className="class-counter">
                <button className="decrement-button" onClick={decrementClasses}>-</button>
                <input type="text" readOnly value={numClasses} />
                <button className="increment-button" onClick={incrementClasses}>+</button>
            </div>

            <TransitionGroup component="table" className="classes-table">
                <thead>
                    <tr>
                        <th>Class Department (4 chars)</th>
                        <th>Class Number (3 digits)</th>
                        <th>Teacher's Last Name</th>
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
