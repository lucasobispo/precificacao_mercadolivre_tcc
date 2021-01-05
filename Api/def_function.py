import pandas as pd 

from utils import *


total_pagina = chamando_api(0)[1]['paging']['total']

inicio = 0 
qtd_por_extracao = 50
df_concat = pd.DataFrame(columns=chamando_api(0)[0].columns)

while(inicio < 2500):
  if inicio >= 0 & inicio<50:
   df_concat = df_concat.append(chamando_api(0)[0],ignore_index=True)
   print(inicio)
   inicio =  inicio + qtd_por_extracao
  else:
    if (((total_pagina) - (inicio))  >= 50 ):  
      df_inicio = chamando_api(inicio)[0]
      df_concat = df_concat.append(df_inicio,ignore_index=True)
      print(inicio)
      inicio =  inicio + qtd_por_extracao
    else:  
      df_inicio = chamando_api(inicio)[0]
      df_concat = df_concat.append(df_inicio,ignore_index=True)
      print(inicio)
      inicio =  inicio + ((total_pagina) - (inicio))  




