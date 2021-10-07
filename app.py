from flask import Flask, render_template
import os
from database import database_tools, tests

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')


@app.route('/load')
def load():
    return render_template('load.html')


@app.route('/test_leaderboard')
def test_leaderboard():
    if tests.test_database_tools():
        return "all tests passed"
    else:
        return "test(s) failed...check logs"


@app.route('/static/<path:filename>')
def jscript(filename):
    return render_template('static', filename)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)
