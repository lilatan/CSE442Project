"""
File: tests.py
Author: Chaktim Wong
Date Created: 10 October 2021
Last Modified: 10 October 2021

Description:
  This file contains a basic db connection test and tests for the functions in database_tools.py
"""
import pymongo
import os
from database.database_tools import MongoUser


# Basic db connection test
def basic_test():
    # Connect to database
    client = pymongo.MongoClient(os.environ['DATABASE_URL'])
    db = client.test
    collection = db['testData']
    # Code to add data to a specific collection on mongodb
    data = {
        "name": "Cheese"
    }
    collection.insert_one(data)
    print("TESTING DATABASE CONNECTION......", flush=True)
    print("...the following line should be a database object with the word 'Cheese' in it...")
    print(collection.find_one(), flush=True)
    print("TESTING DATABASE CONNECTION......complete.")


def test_add_get():
    """
    test_add tests the add_leaderboard() and get_leaderboard() functions
    by adding to the leaderboard and then printing the results of get_leaderboard()

    :return: None
    """
    db = MongoUser()
    MongoUser.add_leaderboard(db, "Bob", 1000, 2)
    print(MongoUser.get_leaderboard(db), flush=True)
