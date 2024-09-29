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

def getAverageGPA(department, number, professor):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    url = f"https://anex.us/grades/?dept={department}&number={number}"
    driver.get(url)

    time.sleep(2)  # Wait for the page to fully load

    html = driver.page_source
    driver.quit()

    soup = BeautifulSoup(html, 'html.parser')

    # Example: Find all table rows
    chart_div = soup.find('div', id='chartDiv')
    table_div = soup.find('div', id='tableDiv')
    if(chart_div.text == "No data returned. Is your input correct?"):
        return[-1, -1]
    rows = table_div.find_all('tr') if table_div else []
    gpasum = 0.0
    totalsum = 0.0
    cnt = 0
    gpacnt = 0
    for row in rows:
        if(row.text[0] == "Y"):
            continue
        decimalidx = row.text.index(".")
        if professor.lower() in row.text.lower():
            gpasum += float(row.text[decimalidx-1:decimalidx+3])
            gpacnt += 1
        else:
            totalsum += float(row.text[decimalidx-1:decimalidx+3])
            cnt+=1
    target_avg_gpa = (float)(gpasum/gpacnt)
    other_avg_gpa = (float)(totalsum/cnt)
    return[target_avg_gpa, other_avg_gpa]

# dep = input("Enter department: ")
# num = int(input("Enter class number: "))
# prof = input("Enter professor last name: ")



