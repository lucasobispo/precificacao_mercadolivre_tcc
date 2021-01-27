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
os.system('flask run')

# try:
#    _thread.start_new_thread( 
#       pega_dados_by_category, ('MLB1051',)
#    )
#    _thread.start_new_thread(
#       pega_dados_by_category, ('MLB1055',)
#    )
   
# except:
#    print ("Error: unable to start thread")

# while 1:
#    pass



