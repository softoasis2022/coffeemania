import os
import json

# JSON 파일의 경로 설정
input_directory = 'D:/coffeemania/통합 디렉토리'
input_filename = 'combined_data.json'
input_path = os.path.join(input_directory, input_filename)

# 딕셔너리를 초기화
data_dict = {}

# JSON 파일 열기 및 데이터 로드
with open(input_path, 'r', encoding='utf-8') as json_file:
    data_dict = json.load(json_file)

# 데이터 출력 (필요시)
data = list(data_dict)


brend_list = []
for i in data:
    #print(data_dict[i]) # ['platform']
    #print(data_dict[i]) # ['store_name']
    #print(str(data_dict[i]['product_name']).split(" ")[0]) # 
    #print(data_dict[i]) # ['price']
    #print(data_dict[i]) # ['delivery_price']
    #print(data_dict[i]) # ['link']
    brend_list.append(str(data_dict[i]['product_name']).split(" ")[0])
print(brend_list)
brand_list = list(set(brend_list))
