import pandas as pd 
import urllib.request as urllib2
import json

def chamando_api(offset):
  r = urllib2.Request(f'https://api.mercadolibre.com/sites/MLB/search?category=MLB1055&offset={offset}')
  response = urllib2.urlopen(r)
  elevations = response.read()
  data = json.loads(elevations)
  df = pd.json_normalize(data['results'])
  return df,data 
