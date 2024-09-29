// getCourseInfo.js

async function getCourseInfo() {
    try {
        const response = await fetch('/api/course_info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('Course Information:', data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call the function to get course information
getCourseInfo();