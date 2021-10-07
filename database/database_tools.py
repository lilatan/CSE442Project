"""
File: database_tools.py
Author: Chaktim Wong
Date Created: 10 October 2021
Last Modified: 10 October 2021

Description:
  This file contains the api functions for this project's MongoDB database.

References:
    https://www.mongodb.com/blog/post/getting-started-with-python-and-mongodb
"""

import os
import pymongo

# Connect to database
client = pymongo.MongoClient(os.environ['DATABASE_URL'])
db = client.test


# Leaderboard functions
def add_leaderboard(name, score, level):
    """
    add_leaderboard adds an entry to the leaderboard collection with the params.

    :param name: Name of user
    :param score: User's high score
    :param level: User's level/stage
    :return: None
    """
    collection = db['leaderboard']  # creates collection if non-existent
    data = {
        "name": name,
        "score": score,
        "level": level
    }
    collection.insert_one(data)


def get_leaderboard():
    """
    get_leaderboard retrieves the leaderboard collection from the database and
    returns it sorted (ascending) by score.

    :return: list (ascending order)
    """
    collection = db['leaderboard']
    result = collection.find().sort("score", 1)
    return result
