# MONGO DB
# USERNAME: testUser
# PASSWORD: AOt8tFZMFCsWHZOM

import pymongo
client = pymongo.MongoClient("mongodb+srv://testUser:AOt8tFZMFCsWHZOM@testingdb.e5b3v.mongodb.net/TestingDB?retryWrites=true&w=majority")
db = client.test

collection = db['testData']
data = [
    {"name": "Cheese"}
]
collection.insert(data)
print(collection.find_one())