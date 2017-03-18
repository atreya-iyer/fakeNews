import urllib2
from bs4 import BeautifulSoup

url = "http://www.cnn.com/2017/03/18/politics/trump-border-wall-specifications/index.html"
page = urllib2.urlopen(url)
soup = BeautifulSoup(page, "html5lib")
all_divs = soup.find_all("div")
for div in all_divs:
	print div

