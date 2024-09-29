from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def get_professor_stats(professor_name):
    # Initialize the WebDriver (Make sure to replace with the path to your WebDriver if necessary)
    driver = webdriver.Chrome()

    try:
        base_url = "https://www.ratemyprofessors.com/search/professors/1003?q={}"
        search_url = base_url.format(professor_name.replace(" ", "+"))

        # Navigate to the search page
        driver.get(search_url)

        # Wait until the page loads and the first professor link is visible
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CLASS_NAME, 'TeacherCard__StyledTeacherCard-syjs0d-0'))
        )

        # Get the page source and parse it with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # Find the professor link
        first_professor_link = soup.find('a', class_='TeacherCard__StyledTeacherCard-syjs0d-0')

        if not first_professor_link:
            print(f"Professor {professor_name} not found.")
            driver.quit()  # Quit the driver since the professor was not found
            return None

        # Get the href link of the first professor and navigate to that page
        professor_url = "https://www.ratemyprofessors.com" + first_professor_link['href']
        driver.get(professor_url)

        # Get the new page content and parse again
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        print("Loaded professor page. Now extracting details...")

        # Extract the quality rating
        quality = soup.find('div', class_='RatingValue__Numerator-qw8sqy-2 liyUjw')
        if quality:
            quality1 = quality.text.strip()
            print(f"Quality: {quality1}")
        else:
            print("Quality rating not found.")
            driver.quit()  # Quit if quality rating is not found
            return None

        # Extract the "would take again" percentage
        would_take_again = soup.find('div', class_='FeedbackItem__FeedbackNumber-uof32n-1 kkESWs')
        if would_take_again:
            would_take_again1 = would_take_again.text.strip()
            print(f"Would Take Again: {would_take_again1}")
        else:
            print("Would take again percentage not found.")
            driver.quit()  # Quit if "would take again" percentage is not found
            return None

        # Extract the level of difficulty
        difficulty = soup.find('div', class_='FeedbackItem__FeedbackNumber-uof32n-1 kkESWs')
        if difficulty:
            difficulty1 = difficulty.text.strip()
            print(f"Difficulty: {difficulty1}")
        else:
            print("Level of difficulty not found.")
            driver.quit()  # Quit if level of difficulty is not found
            return None

        # All necessary information has been retrieved, quit the driver
        driver.quit()

        return f"Professor {professor_name} has a quality rating of {quality1}, would take again percentage of {would_take_again1}, and a level of difficulty of {difficulty1}."

    except Exception as e:
        print(f"An error occurred: {e}")
        driver.quit()  # Ensure the driver is closed in case of an error
        return None
