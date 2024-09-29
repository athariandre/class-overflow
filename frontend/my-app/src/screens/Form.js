import React, { useState } from 'react';

const Form = () => {
    const [numClasses, setNumClasses] = useState(0);
    const [classes, setClasses] = useState([]);

    const handleNumClassesChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumClasses(value);
        setClasses(Array(value).fill({ professor: '', className: '' }));
    };

    const handleClassChange = (index, field, value) => {
        const newClasses = [...classes];
        newClasses[index][field] = value;
        setClasses(newClasses);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store the classes data for future use
        console.log(classes);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Number of Classes:</label>
                <input
                    type="number"
                    value={numClasses}
                    onChange={handleNumClassesChange}
                />
            </div>
            {classes.map((classItem, index) => (
                <div key={index}>
                    <label>Class {index + 1} Name:</label>
                    <input
                        type="text"
                        value={classItem.className}
                        onChange={(e) => handleClassChange(index, 'className', e.target.value)}
                    />
                    <label>Professor Name:</label>
                    <input
                        type="text"
                        value={classItem.professor}
                        onChange={(e) => handleClassChange(index, 'professor', e.target.value)}
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;