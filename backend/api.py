from flask import Flask, request, jsonify
from gradedist import getAverageGPA
from RateMyProfessor import get_professor_stats
from reddit_scraper import class_reddit_scrape

app = Flask(__name__)

@app.route('/api/course_info', methods=['GET'])
def get_course_info():
    courses = request.json
    results = []

    for course in courses:
        department = course['department']
        course_code = course['course_code']
        professor_name = course['professor_name']

        grade_distribution = getAverageGPA(department, course_code)
        professor_rating = get_professor_stats(professor_name)
        reddit_comments = class_reddit_scrape(department, course_code)

        results.append({
            'department': department,
            'course_code': course_code,
            'professor_name': professor_name,
            'grade_distribution': grade_distribution,
            'professor_rating': professor_rating,
            'reddit_comments': reddit_comments
        })

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)