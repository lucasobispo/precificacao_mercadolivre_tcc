import utils.credentials as cr

import pandas as pd 
import urllib.request as urllib2
from urllib.error import HTTPError
import json
import boto3 as boto3
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






