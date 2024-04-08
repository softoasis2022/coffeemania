import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import time
import json

json.dumps

cred = credentials.Certificate('softoasis.json')

firebase_admin.initialize_app(cred,{
'databaseURL' : 'https://softoasis-763c2-default-rtdb.firebaseio.com/'
#'databaseURL' : '데이터 베이스 url'
})

firebaseref = db.reference('coffeemania')

def reset1():
    find_data = firebaseref.child("원두").child("판매자 알수 없음").get()
    for i in list(find_data):
        find_data_Key = firebaseref.child("원두").child("판매자 알수 없음").child(i).key
        find_data = list(firebaseref.child("원두").child("판매자 알수 없음").child(find_data_Key).get())[0]
        brend = str(find_data).split(" ")
        print(brend[0])
        product_name = str(find_data).replace(brend[0],"")
        product_name = product_name[1:]
        print(product_name)

def reset2():
    find_data = firebaseref.get()
    json_data = json.dumps(find_data)
    firebaseref.child("네이버").set(json_data)


firebaseref
