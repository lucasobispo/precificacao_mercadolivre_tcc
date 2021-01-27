import os
import json
import requests as req
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
    # CODE = "TG-6010b2512f79800006ead291-169457532"
    

    if CODE != '':
        # url_template = 'https://api.mercadolibre.com/oauth/token?grant_type=authorization_code&client_id={}&client_secret={}&code={}&redirect_uri=http://localhost:5000/get_token'

        # r = req.post(
        #     url_template.format(
        #         APP_ID,
        #         SECRET_KEY,
        #         token
        #     ),
        #     allow_redirects=False
        # )
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
        credential_PATH = r"C:\Users\gabri\OneDrive\Documentos\GitHub\precificacao_mercadolivre_tcc\Api\credentials.py"

        my_file = open(credential_PATH)
        string_list = my_file.readlines()
        my_file.close()

        indice = [linha for linha, s in enumerate(string_list) if 'ML_ACCESS_TOKEN' in s][0]
        print(indice)                
        string_list[indice] = f"ML_ACCESS_TOKEN = \"{new_token}\""

        my_file = open(credential_PATH, "w")
        new_file_contents = "".join(string_list)        
        my_file.write(new_file_contents)
        my_file.close()
        
            

        return Response(
            json.dumps(r.json(), indent=4, sort_keys=True),
            mimetype='application/json'
        )

    return 'No token found'