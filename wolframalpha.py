import wolframalpha

input = raw_input("Question: ")
app_id = "R4Q2VX-QPL4XY6AKT"
client = wolframalpha.Client(app_id)

res = client.query(input)
answer = next(res.results).text

print answer
