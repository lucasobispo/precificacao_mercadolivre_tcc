import pandas as pd 
import urllib.request as urllib2
from urllib.error import HTTPError
import json
import boto3 as boto3
import credentials as cr
from botocore.exceptions import NoCredentialsError
from io import StringIO


def chamando_api(offset,category_id):
  #GET Scroll ID --> https://developers.mercadolivre.com.br/pt_br/itens-e-buscas#Modo-de-busca-acima-de-1000-registros
  # r = urllib2.Request(f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category={category_id}&offset={offset}')
  # response = urllib2.urlopen(r)
  # elevations = response.read()
  # data = json.loads(elevations)

  url = f'https://api.mercadolibre.com/sites/MLB/search?search_type=scan&category={category_id}&offset={offset}'
  H_ = {'Authorization': 'Bearer APP_USR-5263945428598049-012308-b52b8e7957acf5b8bbb5121ae4bbf456-169457532'}

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