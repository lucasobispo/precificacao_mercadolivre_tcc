import scrapy

from scrapy.spidermiddlewares.httperror import HttpError
from twisted.internet.error import DNSLookupError
from twisted.internet.error import TimeoutError, TCPTimedOutError

import pandas as pd
import boto3 as boto3
from io import StringIO
from io import BytesIO
import pyarrow.parquet as pq
import s3fs
from utils import AWSTools  
import time
# import utils.AWSTools as aws

# ACCESS_KEY = "ASIASEOMK5ILVHD67HH6"
# SECRET_KEY = "zm27yYf3okho3OJ+nVFII01pWqbLffxAksJ7xSt/"
# AWS_SESSION_TOKEN = "IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDukOhKt5ntRC7BBiY2kh0XRQYshKtvE/66kfyL+Y6RiQIhAJsKFRyModw9HJqZDG6WXYH/jKjKkFtU+ters/ecM5gBKroCCN///////////wEQABoMMTQ2OTk0MjkzMjcxIgz8PUtjMXw2Lpo54oEqjgLw2/Bq2GlLmohhr28o8F4EcIsIfUEkVTlnxXijUoHtW0KjBwNpLjny4taMKZud6yxghcAu9Ih5f9c3U7tbVSk89XZGUOi6YFe3LmOsO3gQGOADMXlr0O1wb8o2tWoDpYS/9wgbRPErHHRZLt/p0LI1bsPfvgCNttvGL0o3bwDqKJKZ91qvmrqRZDXiv9ZLCSA+lOVGL5nY/+4kuRcb7G5k/kk4U5ojW2MLq+i3dZ3I2QVHFaVAIng/dqFRDaUm/Wdi48M7y+TA5T1Qfr/qqCLPAH7UFEKFZtNdL7olmGGKHJ1EDukZMIUwSiBo9/jAaIN5OjY1xyhUB5Ql4Pl3KVJZFydxl3s9nONdF69hHE4wqveMhAY6nAHNu1e2ShsjMA4cyS56Wz4EmFVKCJxKAGw413Ge5vCokfW1YgQm2dO+nQUWYZyMWKqTAemLopWxQsiyn4MQ6yfs4JLAp+N1gRhCSFQ5oFgSZ3yokJWfNdR8k0MTbxbhY3FYE2kbx7S9dMOZc9Nzi0JPwnRifPqGWz/ijXmg82yH+QblabuywDWcHYSMbmYGu0TCHECf22okk5CXzyA="

# def pd_read_s3_parquet(key, bucket, s3_client=None, **args):
#         if s3_client is None:
#             s3_client = boto3.client('s3', aws_access_key_id=ACCESS_KEY,aws_secret_access_key=SECRET_KEY,aws_session_token=AWS_SESSION_TOKEN)
#             obj = s3_client.get_object(Bucket=bucket, Key=key)
#         return pd.read_parquet(BytesIO(obj['Body'].read()), **args)

# def toParquetS3(_bucket,_parquet_name, _df):
#     bucket = _bucket # already created on S3
#     parquet_buffer = BytesIO()
#     _df.to_parquet(parquet_buffer)
#     s3_resource = boto3.resource('s3', aws_access_key_id=ACCESS_KEY,
#                       aws_secret_access_key=SECRET_KEY,
#                       aws_session_token=AWS_SESSION_TOKEN)
    
#     s3_resource.Object(bucket, _parquet_name).put(Body=parquet_buffer.getvalue())

class MySpider(scrapy.Spider):
    name = "webscraping_ML"

    df_atributes_part = pd.DataFrame()
    
    tamanho = 1000   

    def start_requests(self):

        # base_links = AWSTools.pd_read_s3_parquet("20210422/dados-teste-links20210422.parquet","dados-transformados-mercadolivre")
        # base_links = AWSTools.fromCSVS3("dados-transformados-mercadolivre", "20210507/links_filtrados.csv")
        print("Base de links...")
        base_links = pd.read_csv(r"C:\Users\gabri\Downloads\data.csv")

        # time.sleep(300)

        # id = base_links['id'].tolist()
        urls = base_links['permalink'].tolist()
        print("Base de links adquirida - Iniciando...")
        

        global tamanho_total
        tamanho_total = len(urls)

        # base = zip(id, urls)
        base = urls

        i = 1
        j = 1
        for url in base:            
            print(f"URL {j} de {tamanho_total}")
            j+=1
            if i >= MySpider.tamanho + 1:
                # .meta['proxy']
                if type(url) == str:                    
                    s = scrapy.Request(url=url, callback=self.parse, errback=self.errback_http, )
                    yield s                 
                # s.meta['proxy'] = None
            else: i+=1

    
    def parse(self, response):
        titulo_xpath = response.xpath("//h1[@class='ui-pdp-title']/text()")
        caracteristica_name = response.xpath("//th[@class='andes-table__header andes-table__header--left ui-vpp-striped-specs__row__column ui-vpp-striped-specs__row__column--id']/text()")
        caracteristica_value = response.xpath("//span[@class='andes-table__column--value']/text()")
        descricao = response.xpath("//p[@class='ui-pdp-description__content']/text()")
        


        titulo = titulo_xpath.get()        
        names = caracteristica_name.getall()
        values = caracteristica_value.getall()
        str_descricao = " ".join(str(x) for x in descricao.getall())

        names.insert(0, "titulo")         
        # names.insert(0, "id")   
        names.insert(1, "link")
        names.append("descricao")

        values.insert(0, titulo)
        # values.insert(0, id_atual)
        values.insert(1, response.request.url)
        values.append(str_descricao)

        # print(str_descricao)
        caracteristicas_all = zip(names, values)
        # print(list(caracteristicas_all))        
        tuple_as_dictionary = dict((col, val) for (col, val) in caracteristicas_all)        
        row = pd.DataFrame([tuple_as_dictionary])        
        # print(row)
        # MySpider.df_atributes_part = MySpider.df_atributes_part.append(row)
        
        # tamanho = len(MySpider.df_atributes_part.index)
        utc = "20210507"
        # print(f"tamanho = {tamanho}")
        # if tamanho%50 == 0:             
        #     print(MySpider.df_atributes_part)

        parte = 1000
        if MySpider.tamanho%parte !=0 or len(MySpider.df_atributes_part.index) == 0:
            MySpider.df_atributes_part = MySpider.df_atributes_part.append(row)
            MySpider.tamanho += 1
            print(f"item:{MySpider.tamanho} de {tamanho_total}")
            time.sleep(1)
               
        elif MySpider.tamanho%parte == 0:
            MySpider.df_atributes_part = MySpider.df_atributes_part.append(row)
            # AWSTools.toParquetS3(f'dados-transformados-mercadolivre', f'{utc}/dados-caracteristicas-{MySpider.tamanho}.parquet',MySpider.df_atributes_part)
            MySpider.df_atributes_part.to_csv(f'dados-caracteristicas-{MySpider.tamanho}.csv')
            MySpider.df_atributes_part = pd.DataFrame()
            print(f"item:{MySpider.tamanho} de {tamanho_total}")
            print("Pausa pra não dar erro 403")
            time.sleep(100)

        elif MySpider.tamanho == tamanho_total - 1:
            MySpider.df_atributes_part = MySpider.df_atributes_part.append(row)
            # AWSTools.toParquetS3(f'dados-transformados-mercadolivre', f'{utc}/dados-caracteristicas-{MySpider.tamanho}.parquet',MySpider.df_atributes_part)
            MySpider.df_atributes_part.to_csv(f'dados-caracteristicas-{MySpider.tamanho}.csv')
            print(f"item:{MySpider.tamanho} de {tamanho_total}")

        # print(list(caracteristicas_all))
        # print(descricao.getall())
        # print(names)
        # camera_px = response.xpath("//h1[@class='ui-pdp-color--BLACK ui-pdp-size--XSMALL ui-pdp-family--SEMIBOLD']/text()")
        # preco = response.xpath("//h2[@class='sc-1wimjbb-0 JzEH sc-ifAKCX cmFKIN']/text()")
        # lista_imagem = response.xpath("//div[@class='sc-28oze1-5 bQbWAr']/img/@src")
        # descricao = response.xpath("//span[@class='sc-1sj3nln-1 eOSweo sc-ifAKCX cmFKIN']/text()")

        # html = ""        
        # html += f"[Titulo = {titulo.get()}, Preco = {preco.get()}, Lista_imagem = {lista_imagem.getall()}, Descricao = {descricao.get()}]\n"

        # html += f"[Titulo = {titulo.get()}, Preco = {preco.get()}, Lista_imagem = {lista_imagem.getall()}, Descricao = {descricao.get()}]\n"

        # with open("anuncios.html", "a") as page:
        #     page.write(html)
        #     page.close()

    def errback_http(self, failure):
        # log all failures
        self.logger.error(repr(failure))

        # in case you want to do something special for some errors,
        # you may need the failure's type:

        if failure.check(HttpError):

            # these exceptions come from HttpError spider middleware
            # you can get the non-200 response
            response = failure.value.response
            self.logger.error('HttpError on %s', response.url)
            time.sleep(30)


        elif failure.check(DNSLookupError):
            # this is the original request
            request = failure.request
            self.logger.error('DNSLookupError on %s', request.url)

        elif failure.check(TimeoutError, TCPTimedOutError):
            request = failure.request
            self.logger.error('TimeoutError on %s', request.url)

            if failure.check(HttpError):
                # these exceptions come from HttpError spider middleware
                # you can get the non-200 response
                response = failure.value.response
                self.logger.error('HttpError on %s', response.url)




