from Pipeline.utils.credentials import credentials as cr
from Pipeline.utils import AWSTools as aws

import pandas as pd 
import urllib.request as urllib2
import json




def getMlCredential():
    f = aws.fromObjS3('dados-mercadolivre','credentials.py')
    return f
exec(getMlCredential())



def chamando_api(offset,category_id):
  url = f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category={category_id}&offset={offset}'
  H_ = {'Authorization': f'Bearer {aws.ML_ACCESS_TOKEN}'}

  r = urllib2.Request(url, headers=H_)
  response = urllib2.urlopen(r)
  elevations = response.read()
  data = json.loads(elevations)
  df = pd.json_normalize(data['results'])
  return df,data

def chamando_api_brand_condition(offset, brand, condition):
  # https://api.mercadolibre.com/sites/MLB/search?category=MLB1055&BRAND=9344
  # https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category=MLB1055&BRAND=206&ITEM_CONDITION=2230581&offset=1050
  url = f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category=MLB1055&BRAND={brand}&ITEM_CONDITION={condition}&offset={offset}'
  H_ = {'Authorization': f'Bearer {aws.ML_ACCESS_TOKEN}'}

  r = urllib2.Request(url, headers=H_)
  response = urllib2.urlopen(r)
  elevations = response.read()
  data = json.loads(elevations)
  df = pd.json_normalize(data['results'])
  return df,data