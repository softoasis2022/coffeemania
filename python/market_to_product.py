import os
import json
from datetime import datetime
import random
import string


directory_path = 'D:/company/database/매장및제품정보'
example='./page/'

file_names = os.listdir(example)

def productnumber():
    datetime.today()            # 현재 날짜 가져오기

    datetime.today().year        # 현재 연도 가져오기
    datetime.today().month      # 현재 월 가져오기
    datetime.today().day        # 현재 일 가져오기
    datetime.today().hour        # 현재 시간 가져오기
    datetime.today().minute      # 현재 분 가져오기
    datetime.today().second
    litime = str(datetime.today().year)+str(datetime.today().month)+str(datetime.today().day)+str(datetime.today().hour)+str(datetime.today().minute)+str(datetime.today().second)
    rdst = randomstring(25)
    return str(litime) + rdst
    
def randomstring(n):
    rand_str = ''
    for i in range(n):
        rand_str += str(random.choice(string.ascii_uppercase + string.digits))
    return rand_str

print(file_names)
for i in file_names:
    market_list = example+i
    pronum = productnumber()
    print(market_list)
    print(pronum)


