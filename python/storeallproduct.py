
import json
import time
import requests
import random

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import chromedriver_autoinstaller
from bs4 import BeautifulSoup
import bs4
from bs4 import BeautifulSoup as bs

from selenium import webdriver
from selenium import common
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from selenium import webdriver 
import chromedriver_autoinstaller
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import warnings
import pandas as pd
from openpyxl import load_workbook
import os
from urllib.parse import urljoin
import string

driver = webdriver.Chrome()
productsetdata = []
database = "D:/database/"
filename= []


storelist = []
#현재 인의 적인 url, 추후 json파일내의 url 로 받아옴
storeurl = ""

def scroll():

    #1 페이지 라면 스크롤 끝까지 내림

    # 스크롤하기 전의 높이
    
    while True:
        # 페이지 끝까지 스크롤
        last_height = driver.execute_script("return document.body.scrollHeight")
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # 페이지 로딩을 기다림
        time.sleep(1)

        # 스크롤 후의 높이를 계산하여 이전 높이와 비교
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
    print("스크롤 완료")
def htmlparsing(htmlsource):
    parsingdata = bs4.BeautifulSoup(htmlsource,'html.parser')
    return parsingdata
def settingurl(url):
    url = urljoin(driver.current_url,url)
    driver.get(url)
def randomstring(n):
    rand_str = ''
    for i in range(n):
        rand_str += str(random.choice(string.ascii_uppercase + string.digits))
    return rand_str
def data_save(taget_fileroot,fileroot,filename,data):
    if taget_fileroot != "":
        for i in fileroot:
            folder_rootpath = os.path.join(i)
        folder_path = os.path.join(database,folder_rootpath)
    else:     #타겟 루트가 있으면
        for i in fileroot:
            folder_rootpath = os.path.join(i)
        folder_path = os.path.join(database,taget_fileroot,folder_rootpath)

    # 안전한 경로 구성
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # 파일 경로 설정
    file_path = os.path.join(folder_path, filename+".json")

    # 파일 쓰기
    with open(file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=6)

def list_folder_without_extension(directory):
    folderlist = []

    for root, dirs, files in os.walk(directory):
        for subdir in dirs:
            folderlist.append(subdir)
    return folderlist
def list_file_without_extension(directory):
    filelist = []

    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isfile(item_path) and item.endswith('.json'):
            with open(item_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                filelist.append(data)

    return data
    


def productdata(product_miniinfo):
    #print(len(list(product_miniinfo)))
    for i in list(product_miniinfo):
        productIinfo = htmlparsing(str(i))
        product_url = str(productIinfo.find("a")["href"])
        product_allurl = urljoin(driver.current_url, product_url)
        product_name= productIinfo.find("strong","_26YxgX-Nu5").text
        productdata = {
            "product_allurl" : product_allurl,
            "product_name" : product_name
        }
        productsetdata.append(productdata)
        filename = randomstring(30)
        fileroot = ["product"]
        data_save("",fileroot,filename,productdata)


def findallproduct(productlist,maxpage):
    print(maxpage)
    pageainproduct_alllist = htmlparsing(productlist)
    #print(bs4.BeautifulSoup(str(pageainproduct_alllist.find("ul","wOWfwtMC_3 _3cLKMqI7mI")),'html.parser').find_all("li"))
    #st=POPULAR&dt=BIG_IMAGE&page=2&size=40
    for i in range(maxpage):
        driver.get(driver.current_url.replace("?cp=1", "?st=POPULAR&dt=BIG_IMAGE&"+"page="+str(i)+"&size=40"))
        pageainproduct_miniinfo = htmlparsing(str(pageainproduct_alllist.find("ul","wOWfwtMC_3 FR2H3hWxUo"))).find_all("li")
        productdata(pageainproduct_miniinfo)


def findallproductspace():
    pageallinfo = htmlparsing(driver.page_source)
    #print(str(len(list(pageallinfo.find_all("div","_24ymbi99eC")))))
    storeallitemlist = htmlparsing(str(pageallinfo.find_all("div","_24ymbi99eC")))
    #print(str(len(list(storeallitemlist.find_all("div", '_1HJarNZHiI _2UJrM31-Ry')))))
    maxpage=len(list(storeallitemlist.find_all("a", 'UWN4IvaQza')))
    #print(maxpage)
    findallproduct(str(pageallinfo.find_all("div","_24ymbi99eC")),maxpage)

def findstoreallproduct(pagesource):
    targetclassname=[
        "_2jm5JW3D5W type_white_gnb YI_nVHGI_0 N=a:lca.all",
        "_2auCM7OXk9 N=a:lca.all",
        
    ]
    targetclassname_number = 0
    pageallinfo = htmlparsing(pagesource).find_all("li",targetclassname[targetclassname_number])
    try:
        btn_allproduct = htmlparsing(str(pageallinfo)).find("a")["href"]
        # 여기에 추가적인 처리를 수행합니다.
    except (TypeError, KeyError, AttributeError) as e:
        print("첫 번째 에러 발생:", e)
        targetclassname_number = targetclassname_number+1
        print("clasnumber "+ str(targetclassname_number))
        pageallinfo = htmlparsing(pagesource).find_all("li",targetclassname[targetclassname_number])
        
        try:
            btn_allproduct = htmlparsing(str(pageallinfo)).find("a")["href"]
        except (TypeError, KeyError, AttributeError) as e:
            return
        
    #print(str(btn_allproduct))
    settingurl(str(btn_allproduct))
    findallproductspace()

def storecrolling(storeurl):
    #print(storeurl)
    driver.get(storeurl)
    scroll() #매 페이지 마다 스크롤을 해준다
    soup = htmlparsing(driver.page_source)
    pagesource = htmlparsing(str(soup))
    findstoreallproduct(str(pagesource))

def localproductdata_crolling_start():
    product_tagetdataroot= os.path.join(database,"매장 및 제품정보", "원두","네이버")
    storelist = list_folder_without_extension(product_tagetdataroot)
    for i in storelist:
        product_tagetdataroot_path = os.path.join(product_tagetdataroot,i)
        localproductdata= list_file_without_extension(product_tagetdataroot_path) 
        print(localproductdata["link"])
        storecrolling(localproductdata["link"])
    
localproductdata_crolling_start()
