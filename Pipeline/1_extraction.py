import _thread
import time
import pandas as pd 
from Pipeline.utils import AWSTools
from Pipeline.utils import API_ML
from urllib.error import HTTPError
import os
from datetime import datetime
from io import StringIO
import pytz

utc = datetime.now(tz=pytz.utc).strftime("%Y%m%d")

def pega_dados_by_category(category_id):
   df_concat = pd.DataFrame(columns=API_ML.chamando_api(0,category_id)[0].columns)

   # for id in category_id:
   total_pagina = API_ML.chamando_api(0,category_id)[1]['paging']['total']
   print(total_pagina)
   qtd_por_extracao = 50
   salva_ = 1000

   contador = 0
   max_offset = 10000
   
   if total_pagina <= 10000:
      max_offset = total_pagina

   for offset in range(0,max_offset+1,qtd_por_extracao):
      print(offset)
      try:
         df_extraido = API_ML.chamando_api(offset,category_id)[0]
         df_concat = df_concat.append(df_extraido,ignore_index=True)
      except HTTPError as err:
         print(f"Error on offset: {offset} --> {err}")

      if ((offset != 0) and ( offset % salva_ == 0)): #salva [salva_] registros e limpa
         AWSTools.toTextS3(f'dados-mercadolivre', f'{utc}/{category_id}/dados-{utc}-{category_id}-{contador}.csv',df_concat)
         contador+=1
         df_concat = pd.DataFrame(columns=df_concat.columns) #deixa o df vazio

   #como acima pegamos de 50 em 50, isso assegura que peguemos o resto se existir
   #Ex: se existir 153 registros, vão faltar 3, então setamos o offset para 150
   if( offset%qtd_por_extracao !=0):
      offset = total_pagina - (offset%qtd_por_extracao)
      df_extraido = API_ML.chamando_api(offset,category_id)[0]
      
      AWSTools.toTextS3(f'dados-mercadolivre', f'{utc}/{category_id}/dados-{utc}-{category_id}-{contador}.csv',df_extraido)

def pega_dados_by_brand_condition(brand, condition):
   df_concat = pd.DataFrame(columns=API_ML.chamando_api_brand_condition(0,brand, condition)[0].columns)

   # for id in category_id:
   total_pagina = API_ML.chamando_api_brand_condition(0,brand, condition)[1]['paging']['total']
   print(total_pagina)
   qtd_por_extracao = 50
   salva_ = 1000

   contador = 0
   max_offset = 10000
   
   if total_pagina <= 10000:
      max_offset = total_pagina

   for offset in range(0,max_offset+1,qtd_por_extracao):
      print(offset)
      try:
         df_extraido = API_ML.chamando_api_brand_condition(offset,brand, condition)[0]
         df_concat = df_concat.append(df_extraido,ignore_index=True)
      except HTTPError as err:
         print(f"Error on offset: {offset} --> {err}")

      if ((offset != 0) and ( offset % salva_ == 0)): #salva [salva_] registros e limpa
         # df_concat.to_csv(f'dados-00000000-{brand}/dados-00000000-{brand}-{contador}.csv')
         AWSTools.toTextS3(f'dados-mercadolivre', f'{utc}/{condition}/{brand}/dados-{utc}-{brand}-{contador}.csv',df_concat)
         contador+=1
         df_concat = pd.DataFrame(columns=df_concat.columns) #deixa o df vazio

   #como acima pegamos de 50 em 50, isso assegura que peguemos o resto se existir
   #Ex: se existir 153 registros, vão faltar 3, então setamos o offset para 150
   if( offset%qtd_por_extracao !=0):
      offset = total_pagina - (offset%qtd_por_extracao)
      df_extraido = API_ML.chamando_api_brand_condition(offset,brand, condition)[0]
      
      # df_concat.to_csv(f'dados-00000000-{brand}/dados-00000000-{brand}-{contador}.csv')
      AWSTools.toTextS3(f'dados-mercadolivre', f'{utc}/{condition}/{brand}/dados-{utc}-{brand}-{contador}.csv',df_extraido)
      