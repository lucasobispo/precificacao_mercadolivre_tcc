import os
import json
import requests as req
from flask import Flask, Response, redirect, request

app = Flask(__name__)

APP_ID = os.environ.get("APP_ID", default="")
SECRET_KEY = os.environ.get("SECRET_KEY", default="")

print(APP_ID)
print(SECRET_KEY)

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
    # token = request.args.get('code', '')
    token = "TG-600bdd310c1465000793a07d-169457532"
    print(token)

    if token is not '':
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
                'code':token,
                'redirect_uri':'http://localhost:5000/get_token'
            },           
            
        allow_redirects=False
        )

        # new_token = r.json()['access_token']
        # new_token = r.json()

        # url_template = "https://api.mercadolibre.com/users/{user_id}?access_token={token}"

        # url = url_template.format(user_id='me', token=new_token)

        # r = req.get(url)

        return Response(
            json.dumps(r.json(), indent=4, sort_keys=True),
            mimetype='application/json'
        )

    return 'No token found'