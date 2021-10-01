from flask import Flask, send_from_directory, render_template
import pymongo
import os

app = Flask(__name__)


@app.route('/')
def homepage():
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
    return render_template('index.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')


@app.route('/load')
def load():
    return render_template('load.html')


@app.route('/static/<path:filename>')
def jscript(filename):
    return render_template('static', filename)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)
