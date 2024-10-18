import hashlib
import time


def get_hex(name):
    with open(f'app/data/{name}', 'rb') as f:
        byt = f.read()
    md5hash = hashlib.md5(byt)
    return md5hash.hexdigest()


print(get_hex('трава.jpeg'))
print(get_hex('трава2.jpeg'))
print(get_hex('трава3.jpeg'))

