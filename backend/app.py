from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from gradedist import getAverageGPA
from RateMyProfessor import get_professor_stats
from reddit_scraper import class_reddit_scrape
import pickle
from openai import OpenAI
import json
import csv
import io
import logging

app = Flask(__name__)


CORS(app)
client = OpenAI()

@app.route('/api/course_info', methods=['POST'])
def get_course_info():
    courses = request.json
    results = []
    print(f"Received courses: {courses}")
    logging.info(f"Received courses: {courses}")

    for course in courses:
        department = course['department']
        course_code = course['course_code']
        professor_name = course['professor_name']
        try:
            [profGPA, exGPA] = getAverageGPA(department, int(course_code), professor_name)
            if(profGPA == -1 or exGPA == -1):
                raise Exception("Prof/CourseNum/Dep Does not exist!")
            [RMP_rating, RMP_would_take_again, RMP_difficulty] = get_professor_stats(professor_name)
        except Exception as e:
            out = {
                "status": 500,
                "body": "There is an issue with the user-submitted data"
            }
            print(f"Error: {e}")
            logging.error(f"Error: {e}")
            return jsonify({"error": str(e)}), 500



        RMP_would_take_again = float(RMP_would_take_again[:2]) / 100.0
        RMP_difficulty = float(RMP_difficulty[:2]) # 0-5
        RMP_rating = float(RMP_rating) #0-5
        profGPA = float(profGPA) #0-4
        exGPA = float(exGPA) #0-4

        w1 = 0.4
        w2 = 0.15
        w3 = 0.15
        w4 = 0.3

        class_diff_score = (w1*((4-exGPA) / 4.0) + w2*(1 - (RMP_rating / 5.0)) + w3*(1-(RMP_would_take_again / 100.0)) + w4*(RMP_difficulty / 5.0)) * 10000
        prof_diff_index = 1 - ((profGPA - exGPA) / (exGPA)) # ex. profGPA 4 exGPA 3 diffIdx = 0.75 so 75% as hard
        prof_diff_index*=prof_diff_index
        prof_diff_index*=prof_diff_index
        screwage = (class_diff_score * prof_diff_index)

        class_reddit_scrape(department, course_code)
        # Load the object from the pickle file

        with open('post_bodies.pkl', 'rb') as f:
            data = pickle.load(f)
        string_data = json.dumps(data)

        csv_file_path = 'filtered_reddit_posts.csv'

        with open(csv_file_path, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            output = io.StringIO()
            csv_writer = csv.writer(output)
            for row in csv_reader:
                csv_writer.writerow(row)
            csv_string = output.getvalue()

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "I want you to infer the difficulty of the class. When respondin do NOT mention any quotes that specifically talk about a teacher, keep it strictly talking about the course itself. "},
                {
                    "role": "user",
                    "content": f"I want you to infer the difficulty of the class in 1-2 concise sentences ONLY. When respondin do NOT mention any quotes that specifically talk about a teacher, keep it strictly talking about the course itself. {department} {course_code} / {(string_data + csv_string)}"
                }
            ]
        )
        reddit_summary = completion.choices[0].message.content

        results.append({
            'department': department,
            'course_code': course_code,
            'professor_name': professor_name,
            'class_difficulty': class_diff_score,
            'professor_difficulty': prof_diff_index,
            'reddit_summary': reddit_summary,
            'screw_percentage': screwage
        })

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
