from flask import Flask, request, jsonify
from gradedist import getAverageGPA
from RateMyProfessor import get_professor_stats
from reddit_scraper import class_reddit_scrape
import pickle
from openai import OpenAI
import json
import csv
import io



app = Flask(__name__)
client = OpenAI()



@app.route('/api/course_info', methods=['POST'])
def get_course_info():
    courses = request.json
    results = []

    for course in courses:
        department = course['department']
        course_code = course['course_code']
        professor_name = course['professor_name']

        [profGPA, exGPA] = getAverageGPA(department, course_code)
        [RMP_rating, RMP_would_take_again, RMP_difficulty] = get_professor_stats(professor_name)
        RMP_would_take_again = int(RMP_would_take_again[1:])
        RMP_difficulty = float(RMP_difficulty)
        RMP_rating = float(RMP_rating)
        profGPA = float(profGPA)
        exGPA = float(exGPA)

        w1 = 0.4
        w2 = 0.4
        w3 = 0.2

        classDifficulty = w1 * (1 - (exGPA / 4.0)) + ((w2 * RMP_difficulty) / 5.0) + w3*(1 - (RMP_would_take_again / 100.0))

        w1 = 0.5
        w2 = 0.3
        w3 = 0.2

        profDifficultyImpact = w1 * (1-(profGPA/4.0)) + w2*(classDifficulty/5.0) + w3*(1-(RMP_would_take_again/100.0))

        classDiffScore = classDifficulty * 70 + 53
        profDiffScore = profDifficultyImpact * 70 + 57

        class_reddit_scrape(department, course_code)
        # Load the object from the pickle file
        obj = pickle.load(open("post_bodies.pkl", "rb"))
        
        with open('backend/post_bodies.pkl', 'rb') as f:
            data = pickle.load(f)
        string_data = json.dumps(data)
        
        csv_file_path = 'backend/filtered_reddit_posts.csv'

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
            {"role": "system", "content": "You are an assistant tasked with summarizing/cleaning data given to you and answering any prompts that may preface the data. You are specifically meant to identify any common issues that can be seen repeated throughout the posts"},
        {
            "role": "user",
            "content": f"Using the following data, create a short (less than 150 word) summary about {department} {course_code}. Specifically mention the difficulty of the course and whatever issues appeared frequently throughout the different texts: {(string_data + csv_string)}"
        }
    ]
)
        reddit_summary = completion.choices[0].message
        screwage = classDiffScore + profDiffScore

        results.append({
            'department': department,
            'course_code': course_code,
            'professor_name': professor_name,
            'class_difficulty': classDiffScore,
            'professor_difficulty': profDiffScore,
            'reddit_summary': reddit_summary,
            'screw_percentage': screwage
        })
    

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)


# from openai import OpenAI
# client = OpenAI()



# print(completion.choices[0].message)