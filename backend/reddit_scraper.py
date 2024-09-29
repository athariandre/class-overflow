import praw
import csv
import time
import pickle
from prawcore.exceptions import PrawcoreException

def class_reddit_scrape(class_category, class_number):
    # Replace these with your actual Reddit API credentials
    CLIENT_ID = "o1zUMm31nXxoAKs7eq0Rwg"
    CLIENT_SECRET = "Dw4KWywdFsE9xeprRUHtAres7vx7PA"
    USER_AGENT = "scraper"

    # Initialize the Reddit instance
    reddit = praw.Reddit(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        user_agent=USER_AGENT
    )

    # Specify the subreddit
    subreddit_name = "aggies"
    post_bodies = []  # Array to store post bodies

    def scrape_subreddit(subreddit, class_category, class_number):
        total_posts_checked = 0
        found_posts = 0

        with open("filtered_reddit_posts.csv", mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["Title", "Score", "URL", "Number of Comments", "Created UTC", "Body"])

            # Use Reddit's search functionality
            search_query = f'selftext:"{class_category} {class_number}"'
            for submission in subreddit.search(search_query, sort='new', syntax='lucene', limit=None):
                total_posts_checked += 1
                if check_and_write_submission(submission, writer, class_category, class_number):
                    found_posts += 1
                    post_bodies.append(submission.selftext)  # Add the full body text to the array

                # Print progress every 10 posts
                if total_posts_checked % 10 == 0:
                    print(f"Checked {total_posts_checked} posts, found {found_posts} matching posts.")

                # Sleep to avoid hitting rate limits
                time.sleep(0.1)
        
        return total_posts_checked, found_posts

    def check_and_write_submission(submission, writer, class_category, class_number):
        body_text = submission.selftext.lower()
        
        if class_category.lower() in body_text and str(class_number) in body_text:
            writer.writerow([
                submission.title,
                submission.score,
                submission.url,
                submission.num_comments,
                submission.created_utc,
                submission.selftext[:500]  # Include first 500 characters of the body in CSV
            ])
            print(f"Found matching post: {submission.title}")
            return True
        return False

    # Main execution
    try:
        subreddit = reddit.subreddit(subreddit_name)
        total_posts_checked, found_posts = scrape_subreddit(subreddit, class_category, class_number)

        print(f"\nTotal posts checked: {total_posts_checked}")
        print(f"Total matching posts found: {found_posts}")

        if found_posts == 0:
            print(f"No posts found matching the criteria: '{class_category}' and '{class_number}' in the body.")
        else:
            print(f"Filtered posts saved to filtered_reddit_posts.csv")
            
            # Save the array of post bodies to a file
            with open("post_bodies.pkl", "wb") as f:
                pickle.dump(post_bodies, f)
            print(f"Full post bodies saved to post_bodies.pkl")

    except PrawcoreException as e:
        print(f"An error occurred: {e}")
        print("This might be due to rate limiting or authentication issues.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

