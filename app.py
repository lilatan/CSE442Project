from flask import Flask, render_template
import os
import database.database_tools
import database.tests

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/leaderboard')
def leaderboard():
    database.tests.test_add_get()
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
