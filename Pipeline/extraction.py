import _thread
import time
import pandas as pd 
import utils.API_ML as api
import os

from urllib.error import HTTPError


cronometro_inicio = time.time_ns()

def pega_dados_by_category(category_id):
   # category_id = ['MLB1051','MLB1055']
   df_concat = pd.DataFrame(columns=api.chamando_api(0,category_id)[0].columns)

   # for id in category_id:
   total_pagina = api.chamando_api(0,category_id)[1]['paging']['total']
   print(total_pagina)
   qtd_por_extracao = 50
   salva_ = 10000

   contador = 0
 
   for offset in range(0,total_pagina + 1,qtd_por_extracao):
      print(offset)
      try:
         df_extraido = api.chamando_api(offset,category_id)[0]
         df_concat = df_concat.append(df_extraido,ignore_index=True)
      except HTTPError as err:
         print(f"Error on offset: {offset} --> {err}")

      if ((offset != 0) and ( offset % salva_ == 0)): #salva [salva_] registros e limpa
         pasta = f"dados-00000000-{category_id}"
         if not os.path.exists(pasta):
            os.mkdir(pasta)
         df_concat.to_csv(f'dados-00000000-{category_id}/dados-00000000-{category_id}-{contador}.csv') #salva
         contador+=1
         df_concat = pd.DataFrame(columns=df_concat.columns) #deixa o df vazio
         print(f"Tempo total(s): {(time.time_ns() - cronometro_inicio)/1000000000}")

   #como acima pegamos de 50 em 50, isso assegura que peguemos o resto se existir
   #Ex: se existir 153 registros, vão faltar 3, então setamos o offset para 150
   if( offset%qtd_por_extracao !=0): 
      offset = total_pagina - (offset%qtd_por_extracao)
      df_extraido = api.chamando_api(offset,category_id)[0]
      df_extraido.to_csv(f'dados-00000000-{category_id}/dados-00000000-{category_id}-{contador}.csv')


# Create two threads as follows
try:
   _thread.start_new_thread( 
      pega_dados_by_category, ('MLB1051',)
   )
   _thread.start_new_thread(
      pega_dados_by_category, ('MLB1055',)
   )
   
except:
   print ("Error: unable to start thread")

while 1:
   pass