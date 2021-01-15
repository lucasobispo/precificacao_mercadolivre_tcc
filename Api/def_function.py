import pandas as pd 
from utils import *

category_id = ['MLB1051','MLB1055']
df_concat = pd.DataFrame(columns=chamando_api(0,'MLB1051')[0].columns)

for id in category_id:
  total_pagina = chamando_api(0,id)[1]['paging']['total']

  inicio = 0 
  qtd_por_extracao = 50
  

  while(inicio < total_pagina):
    if inicio >= 0 & inicio<50:
      df_concat = df_concat.append(chamando_api(0,id)[0],ignore_index=True)
      print(inicio)
      inicio =  inicio + qtd_por_extracao
    else:
      if (((total_pagina) - (inicio))  >= 50 ):  
        df_inicio = chamando_api(inicio,id)[0]
        df_concat = df_concat.append(df_inicio,ignore_index=True)
        print(inicio)
        inicio =  inicio + qtd_por_extracao
      else:  
        df_inicio = chamando_api(inicio,id)[0]
        df_concat = df_concat.append(df_inicio,ignore_index=True)
        print(inicio)
        inicio =  inicio + ((total_pagina) - (inicio))

toTextS3('dados-mercadolivre', 'dados1401',df_concat)

