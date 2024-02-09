from flask import Blueprint, request, session

from database.login import LOGINS

login_route = Blueprint('login', __name__)

"""
Rota de login

    - /login/ (POST) - Verifica se há usuário e senha no servidor
        params
            user: usuário de login
            pass: senha do usuário

    - /login/create (POST) - Adiciona novo usuário ao servidor
        params
            user: usuário de login
            pass: senha do usuário

    - /login/logout (GET) - Remove a sessão

"""


@login_route.route('/', methods=['POST'])
def login():
    response = False
    data = request.json
    for login in LOGINS:
        if data['user'] == login['user'] and data['pass'] == login['pass']:
            response = True
            session['id'] = login['id']
            session['user'] = data['user']
    return {'status': response}


@login_route.route('/create', methods=['POST'])
def create_user():
    data = request.json
    new_user = {
        'id': len(LOGINS) + 1,
        'user': data['user'],
        'pass': data['pass']
    }
    LOGINS.append(new_user)
    return {'status': True, 'response': new_user}


@login_route.route('/logout')
def logout():
    if 'user' in session:
        session.clear()
    return {'status': True}
