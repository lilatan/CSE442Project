from flask import Flask, send_from_directory, render_template

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


@app.route('/static/<path:filename>')
def jscript(filename):
    return render_template('static', filename)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)