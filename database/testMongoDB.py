"""
This test code is for local connections to the mongodb.
Add DATABASE_URL to environmental variables before testing.
The url can be found in the heroku configs file.
"""
import pymongo
import os

# Connect to database
client = pymongo.MongoClient(os.environ['DATABASE_URL'])
db = client.test

# Add data to db
collection = db['testData']
data = [
    {"name": "Cheese"}
]
collection.insert(data)

# Check that data is in database
print(collection.find_one())
