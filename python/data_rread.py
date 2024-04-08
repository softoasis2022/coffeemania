import os
import json

# 원본 파일이 있는 디렉토리 경로 설정
directory_path = 'D:/coffeemania/찾지 못한 매장'

# 데이터를 저장할 딕셔너리 초기화
data_dict = {}

# 지정된 디렉토리의 모든 파일을 순회
for filename in os.listdir(directory_path):
    # 파일 이름이 .json으로 끝나는 경우
    if filename.endswith('.json'):
        # JSON 파일의 전체 경로
        file_path = os.path.join(directory_path, filename)
        # JSON 파일 열기 및 데이터 로드
        with open(file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
            # 딕셔너리에 데이터 추가
            data_dict[filename] = data

# 결과 출력 (필요시)
# print(data_dict)
 
# 출력 파일이 저장될 디렉토리 설정
output_directory = 'D:/coffeemania/통합 디렉토리'
output_filename = 'combined_data.json'
output_path = os.path.join(output_directory, output_filename)

# 출력 디렉토리가 존재하지 않는 경우, 생성
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# 최종 딕셔너리를 JSON 파일로 저장
with open(output_path, 'w', encoding='utf-8') as json_file:
    json.dump(data_dict, json_file, ensure_ascii=False, indent=4)

# 저장 완료 메시지 출력
print(f'File saved to {output_path}')
