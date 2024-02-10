from flask import Blueprint, request

from database.processos import PROCESSOS

processo_route = Blueprint('processos', __name__)

"""
Rota de processos

    - /processos/ (GET) - Listar os processos existentes

    - /processos/create (POST) - Adiciona novo processo ao servidor
        params
            name: nome do processo
            number: numero do processo
            time: prazo do processo

    - /processos/get (GET) - Obtem dados de um processo
        params
            processo_id: id do processo

    - /processos/update (PUT) - Edita os dados de um processo
        params
            processo_id: id do processo
            name: nome do processo
            number: numero do processo
            time: prazo do processo

    - /processos/delete (DELETE) - Deleta um processo
        params
            processo_id: id do processo

"""


@processo_route.route('/', methods=['POST'])
def lista_processos():
    data_processos = []
    for processo in PROCESSOS:
        processo['url'] = processo_url(processo['numero'])
        data_processos.append(processo)
    processes_len = len(PROCESSOS)
    return {'recordsFiltered': processes_len, 'data': data_processos}


@processo_route.route('/create', methods=['POST'])
def create_processo():
    data = request.json
    new_processo = {
        'id': len(PROCESSOS) + 1,
        'nome': data['name'],
        'numero': data['number'],
        'prazo': data['time']
    }
    PROCESSOS.append(new_processo)
    return {'status': True, 'data': new_processo}


@processo_route.route('/get')
def get_processo():
    processo = None
    processo_id = request.args.get('processo_id')
    for p in PROCESSOS:
        if p['id'] == int(processo_id):
            processo = p
    return {'status': True, 'data': processo}


@processo_route.route('/update', methods=['POST'])
def update_processo():
    processo = None
    data = request.json
    processo_id = request.json.get('processo_id')
    for p in PROCESSOS:
        if p['id'] == int(processo_id):
            p['nome'] = data['name']
            p['numero'] = data['number']
            p['prazo'] = data['time']
            processo = p
    return {'status': True, 'data': processo}


@processo_route.route('/delete')
def delete_processo():
    global PROCESSOS
    processo_id = request.args.get('processo_id');
    PROCESSOS = [p for p in PROCESSOS if p['id'] != int(processo_id)]
    return {'status': True}


def processo_url(numero_processo):
    return (
        'https://esaj.tjsp.jus.br/cpopg/search.do?'
        'conversationId&'
        'cbPesquisa=NUMPROC&'
        'numeroDigitoAnoUnificado&'
        'foroNumeroUnificado&'
        'dadosConsulta.valorConsultaNuUnificado&'
        'dadosConsulta.valorConsultaNuUnificado=UNIFICADO&'
        f'dadosConsulta.valorConsulta={numero_processo}&'
        'dadosConsulta.tipoNuProcesso=SAJ'
    )
