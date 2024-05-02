
import json
import time
import requests

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


driver = webdriver.Chrome()
productsetdata = []

#현재 인의 적인 url, 추후 json파일내의 url 로 받아옴
storeurl = "https://smartstore.naver.com/blackbeans/products/310288062?n_media=11068&n_query=%EC%9B%90%EB%91%90&n_rank=3&n_ad_group=grp-a001-02-000000024283216&n_ad=nad-a001-02-000000160651984&n_campaign_type=2&n_mall_id=coffeblack&n_mall_pid=310288062&n_ad_group_type=2&n_match=3&NaPm=ct%3Dlvotnwpk%7Cci%3D0yK0001B%2D3bAUyC%5F%5FKZt%7Ctr%3Dpla%7Chk%3D6924c522f04c75abdb4f91cddf76d6a6830eeb70"

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
    print(maxpage)
    findallproduct(str(pageallinfo.find_all("div","_24ymbi99eC")),maxpage)

def findstoreallproduct(pagesource):
    pageallinfo = htmlparsing(pagesource).find_all("li","_2jm5JW3D5W type_white_gnb YI_nVHGI_0 N=a:lca.all")
    btn_allproduct = htmlparsing(str(pageallinfo)).find("a")["href"]
    print(str(btn_allproduct))
    settingurl(str(btn_allproduct))
    findallproductspace()


def storecrolling(storeurl):
    print(storeurl)
    driver.get(storeurl)
    scroll() #매 페이지 마다 스크롤을 해준다
    soup = htmlparsing(driver.page_source)
    pagesource = htmlparsing(str(soup))
    findstoreallproduct(str(pagesource))

storecrolling(storeurl)
print(len(productsetdata))