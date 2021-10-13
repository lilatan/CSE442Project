from flask import Flask, render_template, send_from_directory
import pymongo
import os

app = Flask(__name__)

# Connect to database
client = pymongo.MongoClient(os.environ['DATABASE_URL'])
db = client.test


@app.route('/')
def homepage():
    return render_template('main.html')


@app.route("/static/<path:name>")
def staticFolder(name):
    return send_from_directory(
        'static', name
    )


# @app.route("/static/src/<path:name>")
# def source(name):
#     return send_from_directory(
#         'src', name
#     )



@app.route('/leaderboard')
def leaderboard():
    collection = db['testData']
    # Code to add data to a specific collection on mongodb
    # data = [
    #     {"name": "Cheese"}
    # ]
    # collection.insert(data)
    print("Testing print functionality in the heroku server logs", flush=True)
    print(collection.find_one(), flush=True)
    return render_template('leaderboard.html')


@app.route('/load')
def load():
    return render_template('load.html')


# @app.route('/static/<path:filename>')
# def jscript(filename):
#     return render_template('static', filename)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)
