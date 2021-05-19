import os
import json
import requests as req
import pandas as pd
from Pipeline.utils import AWSTools as aws
from flask import Flask, Response, redirect, request

app = Flask(__name__)

APP_ID = os.environ.get("APP_ID", default="")
SECRET_KEY = os.environ.get("SECRET_KEY", default="")

@app.route("/")
def index():
    '''
        Start page
    '''

    # you will need to change only here to the authorization endpoint for the right country
    url = "https://auth.mercadolivre.com.br/authorization?response_type=code&client_id={}&redirect_uri=http://localhost:5000/get_token".format(
        APP_ID
    )    
    
    return redirect(url)


@app.route("/get_token")
def get_token():
    '''
        Other page
    '''
    CODE = request.args.get('code')   

    if CODE != '':
        url_template = 'https://api.mercadolibre.com/oauth/token'

        r = req.post(
            url_template, 
            headers = {'accept':'application/json', 'content-type': 'application/x-www-form-urlencoded'},
            data={
                'grant_type':'authorization_code',
                'client_id':APP_ID,
                'client_secret':SECRET_KEY,
                'code':CODE,
                'redirect_uri':'http://localhost:5000/get_token'
            },           
            
        allow_redirects=False
        )

        new_token = r.json()['access_token']
        credential_PATH = r"C:\Users\gabri\OneDrive\Documentos\GitHub\precificacao_mercadolivre_tcc\Pipeline\ml_credentials.txt"

        my_file = open(credential_PATH)
        string_list = my_file.readlines()
        my_file.close()

        indice = [linha for linha, s in enumerate(string_list) if 'ML_ACCESS_TOKEN' in s][0]           
        string_list[indice] = f"ML_ACCESS_TOKEN = \"{new_token}\"\n"
            
        my_file = open(credential_PATH, "w")
        new_file_contents = "".join(string_list)        
        my_file.write(new_file_contents)
        my_file.close()

        aws.upload_to_aws("ml_credentials.txt", "dados-mercadolivre", "ml_credentials.py")                
        return Response(
            json.dumps(r.json(), indent=4, sort_keys=True),
            mimetype='application/json'
        )

    return 'No token found'