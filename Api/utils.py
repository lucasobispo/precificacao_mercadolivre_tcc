import pandas as pd 
import urllib.request as urllib2
import json
import boto3 as boto3
import credentials as cr
from botocore.exceptions import NoCredentialsError
from io import StringIO


def chamando_api(offset,category_id):
  r = urllib2.Request(f'https://api.mercadolibre.com/sites/MLB/search?category={category_id}&offset={offset}')
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
