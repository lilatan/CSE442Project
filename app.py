from flask import Flask, render_template, send_from_directory
import pymongo
import os
import json
from database import database_tools, tests

app = Flask(__name__, template_folder='templates')


@app.route('/')
def homepage():
    return render_template('main.html')


@app.route("/static/<path:name>")
def staticFolder(name):
    return send_from_directory(
        'static', name
    )


@app.route("/get-leaderboard")
def getLeaderboard():
    return json.dumps(database_tools.get_leaderboard())


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)
