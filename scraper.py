import urllib2
from bs4 import BeautifulSoup

url = raw_input("URL: ")
print("THE URL SCRAPER RECEIVED IS " + url)
page = urllib2.urlopen(url)
soup = BeautifulSoup(page, "html5lib")
all_divs = soup.find_all("div")
for div in all_divs:
	print div
