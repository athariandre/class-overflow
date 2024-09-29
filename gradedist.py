from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time
from bs4 import BeautifulSoup

options = Options()
options.headless = True
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

def getInfo(department, number, prof):
    url = f"https://anex.us/grades/?dept={department}&number={number}"
    driver.get(url)

    time.sleep(2)  # Wait for the page to fully load

    html = driver.page_source
    driver.quit()

    soup = BeautifulSoup(html, 'html.parser')

    # Example: Find all table rows
    rows = soup.find_all('tr')
    for row in rows:
        if prof in row.text:
            print(row.text)

getInfo()