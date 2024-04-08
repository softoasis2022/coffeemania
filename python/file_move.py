import os
import shutil

# 원본 및 대상 디렉토리 경로 설정
source_dir = r'D:\coffeemania\네이버'
target_dir = r'D:\coffeemania\찾지 못한 매장'

# 대상 디렉토리가 존재하지 않는 경우 생성
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

# 원본 디렉토리에서 JSON 파일 목록을 가져옴
for filename in os.listdir(source_dir):
    if filename.endswith('.json'):  # JSON 파일만 선택
        source_file = os.path.join(source_dir, filename)
        target_file = os.path.join(target_dir, filename)

        # 파일 이동 (파일명 충돌을 피하기 위해 대상 파일이 이미 존재하면 덮어쓰지 않음)
        if not os.path.exists(target_file):
            shutil.move(source_file, target_file)
        else:
            print(f"파일 {filename}은(는) 이미 대상 디렉토리에 존재합니다.")