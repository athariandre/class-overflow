import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = () => {
    const [numClasses, setNumClasses] = useState(0);
    const [classes, setClasses] = useState([]);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);

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
        // Perform submit logic here
        console.log('Form submitted:', classes);
        // Redirect to the next page or perform any other action
    };

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