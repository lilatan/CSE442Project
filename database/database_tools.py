"""
File: database_tools.py
Author: Chaktim Wong
Date Created: 7 October 2021
Last Modified: 1 December 2021
Description:
  This file contains the api functions for this project's MongoDB database.
References:
    https://www.mongodb.com/blog/post/getting-started-with-python-and-mongodb
"""

import os
import pymongo

# Connect to database
client = pymongo.MongoClient(os.environ['DATABASE_URL'])
db = client.crewel


# Leaderboard functions
def add_leaderboard(name, score, level, time):
    """
    add_leaderboard adds an entry to the leaderboard collection with the params.
    :param name: Name of user
    :param score: player's high score
    :param level: current level that player is on
    :param time: total time elapsed in each level
    :return: None
    """
    collection = db['leaderboard']  # creates collection if non-existent
    data = {
        "name": name,
        "score": score,
        "level": level,
        "time": time
    }
    collection.insert_one(data)


def get_leaderboard():
    """
    get_leaderboard retrieves the leaderboard collection from the database and
    returns it sorted (ascending) by score.
    :return: list (descending order)
    """
    collection = db['leaderboard']
    result = list(collection.find({}, {'_id': False}).sort("score", -1))
    return result


# def delete_leaderboard(name, score, level):
#     """
#     delete_leaderboard deletes an entry to the leaderboard collection with the params.
#     :param name: Name of user
#     :param score: User's high score
#     :param level: User's level/stage
#     :return: None
#     """
#     collection = db['leaderboard']
#     data = {
#         "name": name,
#         "score": score,
#         "level": level
#     }
#     collection.delete_one(data)
