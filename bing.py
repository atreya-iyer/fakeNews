from py_bing_search import PyBringWebSearch
search_term = "Python Software Foundation"
bing_web = PyBringWebSearch('eca08643fb7245af80c9e6ad60e49bfe', search_term, we_only = False)
first_fifty = bing_web.search(limit=50, format='json')
print(first_fifty[0].description)