"""
File: tests.py
Author: Chaktim Wong
Date Created: 7 October 2021
Last Modified: 7 October 2021
Description:
  This file contains a basic db connection test and tests for the functions in database_tools.py
"""
import pymongo
import os
from database import database_tools


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


def test_database_tools():
    """
    test_database_tools tests the add, delete and get leaderboard functions in database_tools.py
    :return: true if all tests pass, and false if any tests fails
    """
    print("----START OF database_tools.py TEST-----")
    initial_state = database_tools.get_leaderboard()
    test_str = "Testing add_leaderboard and get_leaderboard.......   "
    database_tools.add_leaderboard("Bob", 1000, 2)
    if str(database_tools.get_leaderboard()) != "[{'name': 'Bob', 'score': 1000, 'level': 2}]":
        print(test_str + "FAILED")
        return False
    else:
        print(test_str + "PASSED")

    test_str = "Testing delete_leaderboard.......                    "
    database_tools.delete_leaderboard("Bob", 1000, 2)
    if database_tools.get_leaderboard() != initial_state:
        print(test_str + "FAILED")
        return False
    else:
        print(test_str + "PASSED")

    # all tests passed
    print("............................ALL TESTS PASSED..........................")
    print("-----END OF database_tools.py TEST------")
    return True



