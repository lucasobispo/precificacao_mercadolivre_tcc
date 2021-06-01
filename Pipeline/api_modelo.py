import numpy as np
from flask import Flask, request, jsonify
import pickle
import os
import json
from pandas import json_normalize
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*":{"origins":"*"}})

# predicao = modelo.predict(np.array([list(dados.values())]))


# modelo = pickle.load(open(r"C:\Users\lucab\Documents\FTT\EC\precificacao_mercadolivre>
modelo = pickle.load(open(r"./precificacao_xboostFinal.pk1",'rb'))


@app.route("/")
def verifica_api_online():
  return "API ONLINE v1.0", 200


@app.route('/predict', methods=['POST'])
def predict():
    dados = request.get_json(force=True)
    print(dados)
    json_string = json.dumps(dados)
    data = json.loads(json_string)
    dados = json_normalize(data)
    predicao = modelo.predict(dados)

    resultado = predicao[0]

    resposta = {'PRECO': float(resultado)}
    return jsonify(resposta)


if __name__ == "__main__":
    porta = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=porta)

