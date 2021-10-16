"""
File: tests.py
Author: Chaktim Wong
Date Created: 7 October 2021
Last Modified: 7 October 2021
Description:
  This file contains a basic db connection test and simple tests for the functions in database_tools.py
"""
import pymongo
import os
from database import database_tools


def basic_test():
    """
    basic_test tests the connection to the current MongoDB setup by attempting to add data to a
    test collection and querying it.
    :return: true if test passes, and false if test fail
    """
    # connect to database
    client = pymongo.MongoClient(os.environ['DATABASE_URL'])
    db = client.test

    # select collection (creates one if non-existent) and clean it
    collection = db['testData']
    collection.delete_many({})

    # add data to collection
    data = {
        "name": "Cheese"
    }
    collection.insert_one(data)

    # check data is in the collection
    result = True
    print("TESTING DATABASE CONNECTION......", flush=True)
    result = list(collection.find({}, {'_id': False}))
    print(result, flush=True)
    if str(result) != "[{'name': 'Cheese'}]":
        result = False

    print("TESTING DATABASE CONNECTION......complete.", flush=True)
    return result


def test_database_tools():
    """
    test_database_tools tests the add, delete and get leaderboard functions in database_tools.py
    Note: Test on empty leaderboard collection.
    :return: true if all tests pass, and false if any tests fails
    """
    print("----START OF database_tools.py TEST-----", flush=True)
    initial_state = str(database_tools.get_leaderboard())

    # test add and get
    test_str = "Testing add_leaderboard and get_leaderboard.......   "
    database_tools.add_leaderboard("Bob", 1000, 2)
    if str(database_tools.get_leaderboard()) != "[{'name': 'Bob', 'score': 1000, 'level': 2}]":
        print(test_str + "FAILED", flush=True)
        return False
    else:
        print(test_str + "PASSED", flush=True)

    # test delete
    test_str = "Testing delete_leaderboard.......                    "
    database_tools.delete_leaderboard("Bob", 1000, 2)
    if database_tools.get_leaderboard() != initial_state:
        print(test_str + "FAILED", flush=True)
        return False
    else:
        print(test_str + "PASSED", flush=True)

    # all tests passed
    print("............................ALL TESTS PASSED..........................", flush=True)
    print("-----END OF database_tools.py TEST------", flush=True)
    return True
