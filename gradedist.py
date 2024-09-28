import requests
import bs4

def getInfo(department, number):
    url = f"https://anex.us/grades/?dept={department}&number={number}"
    req = requests.get(url)
    if(req.status_code != 200):
        raise SyntaxError("The department and/or class number does not exist!")
    soup = bs4.BeautifulSoup(req.text, 'html.parser')
    table = soup.find_all('table')[0]