import urllib2
from bs4 import BeautifulSoup

url = "http://www.cnn.com/2017/03/18/politics/trump-border-wall-specifications/index.html"
page = urllib2.urlopen(url)
soup = BeautifulSoup(page)
print soup.prettify()
all_links = soup.find_all("a")
for link in all_links:
	print link.get("href")

