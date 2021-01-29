import pandas as pd 
import urllib.request as urllib2
from urllib.error import HTTPError
import json
import boto3 as boto3
import credentials as cr
from botocore.exceptions import NoCredentialsError
from io import StringIO
import csv

ML_ACCESS_TOKEN = ''

def fromObjS3(my_bucket,my_file):
    # client = boto3.client('s3',aws_access_key_id=cr.ACCESS_KEY,
    #                   aws_secret_access_key=cr.SECRET_KEY,
    #                   aws_session_token=cr.AWS_SESSION_TOKEN)

    # my_bucket = resource.Bucket(my_bucket)
    s3 = boto3.resource('s3', aws_access_key_id=cr.ACCESS_KEY,
                      aws_secret_access_key=cr.SECRET_KEY,
                      aws_session_token=cr.AWS_SESSION_TOKEN)

    # fileobj = client.get_object(Bucket=my_bucket,Key=my_file)
    fileobj = s3.Object(my_bucket,my_file).get()['Body'].read()
    # grid_sizes = pd.read_csv(fileobj['Body'])
    return fileobj

def getMlCredential():
    f = fromObjS3('dados-mercadolivre','credentials.py')
    return f

exec(getMlCredential())

def chamando_api(offset,category_id):
  #GET Scroll ID --> https://developers.mercadolivre.com.br/pt_br/itens-e-buscas#Modo-de-busca-acima-de-1000-registros
  # r = urllib2.Request(f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category={category_id}&offset={offset}')
  # response = urllib2.urlopen(r)
  # elevations = response.read()
  # data = json.loads(elevations)



  url = f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category={category_id}&offset={offset}'
  H_ = {'Authorization': f'Bearer {ML_ACCESS_TOKEN}'}

  r = urllib2.Request(url, headers=H_)
  response = urllib2.urlopen(r)
  elevations = response.read()
  data = json.loads(elevations)
  df = pd.json_normalize(data['results'])
  return df,data 

def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=cr.ACCESS_KEY,
                      aws_secret_access_key=cr.SECRET_KEY,
                      aws_session_token=cr.AWS_SESSION_TOKEN)

    try:
        s3.upload_file(local_file, bucket, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

def toTextS3(_bucket,_csv_name, _df):
    bucket = _bucket # already created on S3
    csv_buffer = StringIO()
    _df.to_csv(csv_buffer)
    s3_resource = boto3.resource('s3', aws_access_key_id=cr.ACCESS_KEY,
                      aws_secret_access_key=cr.SECRET_KEY,
                      aws_session_token=cr.AWS_SESSION_TOKEN)

    s3_resource.Object(bucket, _csv_name).put(Body=csv_buffer.getvalue())






