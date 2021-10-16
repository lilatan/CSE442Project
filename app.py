<<<<<<< HEAD
from flask import Flask, render_template, send_from_directory
import pymongo
=======
from flask import Flask, render_template
>>>>>>> Leaderboard
import os
from database import database_tools, tests

app = Flask(__name__, template_folder='templates')


@app.route('/')
def homepage():
    return render_template('main.html')


<<<<<<< HEAD
@app.route("/static/<path:name>")
def staticFolder(name):
    return send_from_directory(
        'static', name
    )
=======
@app.route('/leaderboard')
def leaderboard():
    scores = database_tools.get_leaderboard()
    return render_template('leaderboard.html', list=scores)
>>>>>>> Leaderboard


# @app.route("/static/src/<path:name>")
# def source(name):
#     return send_from_directory(
#         'src', name
#     )


<<<<<<< HEAD

# @app.route('/leaderboard')
# def leaderboard():
#     collection = db['testData']
#     # Code to add data to a specific collection on mongodb
#     # data = [
#     #     {"name": "Cheese"}
#     # ]
#     # collection.insert(data)
#     print("Testing print functionality in the heroku server logs", flush=True)
#     print(collection.find_one(), flush=True)
#     return render_template('leaderboard.html')


# @app.route('/load')
# def load():
#     return render_template('load.html')


# @app.route('/static/<path:filename>')
# def jscript(filename):
#     return render_template('static', filename)
=======
@app.route('/test_db')
def test_db():
    if tests.basic_test():
        return "test passed"
    else:
        return "test failed"


@app.route('/test_leaderboard')
def test_leaderboard():
    if tests.test_database_tools():
        return "all tests passed"
    else:
        return "test(s) failed...check logs and remember this test should be done on an empty collection"


@app.route('/static/<path:filename>')
def jscript(filename):
    return render_template('static', filename)
>>>>>>> Leaderboard


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)
