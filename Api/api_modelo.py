import numpy as np
from flask import Flask, request, jsonify
import pickle
import os

app = Flask(__name__)

# modelo = pickle.load(open(r"C:\Users\lucab\Documents\FTT\EC\precificacao_mercadolivre_tcc\Jupyer-Notebooks\precificacao.pk1",'rb'))
modelo = pickle.load(open(r"/Users/Ssilva3/Documents/GitHub/precificacao_mercadolivre_tcc/Jupyer-Notebooks/precificacao.pk1",'rb'))


@app.route("/")
def verifica_api_online():
  return "API ONLINE v1.0", 200


@app.route('/predict', methods=['POST'])
def predict():
  dados = request.get_json(force=True)
  predicao = modelo.predict(np.array([list(dados.values())]))
  resultado = predicao[0]

  resposta = {'PRECO': float(resultado)}
  return jsonify(resposta)


if __name__ == "__main__":
    porta = int(os.environ.get("PORT", 5000))
    app.run(host='127.0.0.1', port=porta)