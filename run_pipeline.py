# import pandas as pd 
# from utils import AWSTools
# from utils import API_ML
# from urllib.error import HTTPError
# import os
# from datetime import datetime
# from io import StringIO
# import pytz

from Pipeline import extraction
# 2230581 Usado
# 2230284 Novo
conditions = [2230581, 2230284]
#Motorola 	2503
#Apple 		9344
#Samsung 	206
#Xiaomi 	59387
#LG 		215
#Huawei 	8784
brands =[2503,9344,206,59387,215,8784]

for c in conditions:
    for b in brands:
        extraction.pega_dados_by_brand_condition(b,c)




