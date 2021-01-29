import pandas as pd 
from utils import *
import pandas as pd 
import urllib.request as urllib2
from urllib.error import HTTPError
import json
import boto3 as boto3
import credentials as cr
from botocore.exceptions import NoCredentialsError
from io import StringIO

# #GET Scroll ID --> https://developers.mercadolivre.com.br/pt_br/itens-e-buscas#Modo-de-busca-acima-de-1000-registros

# category_id = 'MLB1051'
# offset = 1050
# scroll_id = 'YXBpY29yZS1pdGVtcw==:ZHMtYXBpY29yZS1pdGVtcy0wMQ==:DXF1ZXJ5QW5kRmV0Y2gBAAAAABIu7AgWMXl6anF3SU5SMVNaQXFxTkZubHBqQQ=='
# H_ = {'Authorization': 'Bearer APP_USR-5263945428598049-012308-b52b8e7957acf5b8bbb5121ae4bbf456-169457532'}

# r = urllib2.Request(f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category={category_id}&offset={offset}', headers= H_)
# response = urllib2.urlopen(r)
# elevations = response.read()
# data = json.loads(elevations)
# print(data)
# # df_extraido = chamando_api(1050,"MLB1051")[0]

# # print("success")

import os
import _thread
import time
import httplib2

# def run():
#     time.sleep(5)
#     r = urllib2.urlopen(urllib2.Request("http://127.0.0.1:5000/"))

#     response = r.geturl()
#     print(response)
#     s = urllib2.urlopen((urllib2.Request(response)))

#     print(s.geturl())

import webbrowser

  # Go to example.com    

def getContentLocation(link):
    time.sleep(5)
    h = httplib2.Http(".cache")
    h.follow_all_redirects = True
    resp = h.request(link, "GET")[0]
    contentLocation = resp['content-location']
    return print(contentLocation)



try:
   _thread.start_new_thread(       
        os.system, ('flask run',)
   )
   _thread.start_new_thread(
        webbrowser.open, ("http://127.0.0.1:5000/",)
   )
   
except:
   print ("Error: unable to start thread")

while 1:
   pass



