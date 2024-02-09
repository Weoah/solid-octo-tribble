from flask import Flask, render_template, session

from routes.login import login_route

app = Flask(__name__)
app.register_blueprint(login_route, url_prefix='/ajax/login')


@app.route('/')
def index():
    if 'user' not in session:
        return render_template('login.html')
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
