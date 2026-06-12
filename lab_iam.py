import boto3
import json

iam = boto3.client('iam')
s3  = boto3.client('s3')
sts = boto3.client('sts')

ACCOUNT_ID  = boto3.client('sts').get_caller_identity()['Account']
BUCKET_NAME = f"aws-prep-lab-{ACCOUNT_ID}"
ROLE_NAME   = "lab-lambda-s3-readonly"

# Crear bucket
try:
    s3.create_bucket(Bucket=BUCKET_NAME)
    print(f"Bucket creado: {BUCKET_NAME}")
except s3.exceptions.BucketAlreadyOwnedByYou:
    print("Bucket ya existe, continuando...")

# Subir objeto de prueba
s3.put_object(Bucket=BUCKET_NAME, Key="test.txt", Body=b"hola desde el lab")

# Trust policy: quién puede asumir este role
trust_policy = {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Principal": {"Service": "lambda.amazonaws.com"},
        "Action": "sts:AssumeRole"
    },
    {
        "Effect": "Allow",
        "Principal": {"AWS": f"arn:aws:iam::{ACCOUNT_ID}:user/devadmin"},
        "Action": "sts:AssumeRole"
    } 
    ]
}

# Permission policy: qué puede hacer — solo GetObject en ESE bucket
permission_policy = {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": "s3:GetObject",
        "Resource": f"arn:aws:s3:::{BUCKET_NAME}/*"
        # Nota: ARN específico, no "*"
    }]
}

# Crear role — skip si ya existe
try:
    role = iam.create_role(
        RoleName=ROLE_NAME,
        AssumeRolePolicyDocument=json.dumps(trust_policy),
        Description="Lab: Lambda solo puede leer de un bucket específico"
    )
    print("Role creado")
except iam.exceptions.EntityAlreadyExistsException:
    print("Role ya existe, actualizando trust policy...")

#update pq ya se agrego y fallo porque no estaba devadmin
iam.update_assume_role_policy(
    RoleName=ROLE_NAME,
    PolicyDocument=json.dumps(trust_policy)
)

role_arn = iam.get_role(RoleName=ROLE_NAME)['Role']['Arn']
print(f"Role ARN: {role_arn}")

#Crear y attachar la policy inline
iam.put_role_policy(
    RoleName=ROLE_NAME,
    PolicyName="s3-readonly-specific-bucket",
    PolicyDocument=json.dumps(permission_policy)
)
print("Policy attachada")
import time
time.sleep(10)  # IAM necesita unos segundos para propagar

# Asumir el role como si fuéramos la Lambda
assumed = sts.assume_role(
    RoleArn=role_arn,
    RoleSessionName="lab-test"
)
creds = assumed['Credentials']

# Cliente S3 con las credenciales del role
s3_as_role = boto3.client(
    's3',
    aws_access_key_id=creds['AccessKeyId'],
    aws_secret_access_key=creds['SecretAccessKey'],
    aws_session_token=creds['SessionToken']
)

# ✅ Debería funcionar
obj = s3_as_role.get_object(Bucket=BUCKET_NAME, Key="test.txt")
print("GET object:", obj['Body'].read())

# ❌ Debería fallar — PutObject no está permitido
try:
    s3_as_role.put_object(Bucket=BUCKET_NAME, Key="intruso.txt", Body=b"hack")
    print("PutObject: PERMITIDO (mal!)")
except Exception as e:
    print(f"PutObject bloqueado: {e.response['Error']['Code']}")  # AccessDenied

# ❌ Debería fallar — no puede listar todos los buckets
try:
    s3_as_role.list_buckets()
    print("ListBuckets: PERMITIDO (mal!)")
except Exception as e:
    print(f"ListBuckets bloqueado: {e.response['Error']['Code']}")  # AccessDenied