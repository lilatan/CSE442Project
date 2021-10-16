from flask import Flask, render_template, send_from_directory, request, jsonify
import pymongo
import os
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


@app.route("/get-leaderboard", methods=['GET'])
def getLeaderboard():
    return jsonify(database_tools.get_leaderboard())


@app.route("/update-leaderboard", methods=['GET', 'POST'])
def updateLeaderboard():
    content = request.json
    print(content)
    name = content['name']
    score = content['score']
    level = content['level']
    database_tools.add_leaderboard(name, score, level)
    return jsonify(success=True)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)
