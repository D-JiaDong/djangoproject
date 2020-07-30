import hashlib

from django.shortcuts import render,redirect,HttpResponse
import os
from dao.userDao import UserDao
# Create your views here.
#作为整个网站的入口
def index(request):
    return render(request,'index.html')


#跳转登陆页
def gologin(request):
    return render(request,'login.html')

#跳转注册页面
def goNewUser(request):
    return render(request,"newuser.html")

#用户注册
def reNewUser(request):
    #普通的表单项
    userName=request.POST.get('userName','')
    userPwd=request.POST.get('userPwd','')
    userPhone=request.POST.get('userPhone','')
    userIntro=request.POST.get('userIntro','')
    userPicPath=""#保存路径
    print(userName)
    print(userPwd)
    print(userPhone)
    print(userIntro)

    #加密密码
    userPwd=hashlib.md5(userPwd.encode(encoding='utf-8')).hexdigest()
    #文件上传
    if request.POST:
        fileObj=request.FILES.get('userPic',None)
        if fileObj:
            print("pic成功")
            userPicPath='/static/upload/'+fileObj.name
            print(userPicPath)
            filePath=os.path.join(os.getcwd(),'static/upload/'+fileObj.name)
            with open(filePath,'wb+') as fp:
                for chunk in fileObj.chunks():
                    fp.write(chunk)

    userDao=UserDao()
    result=userDao.createUser([userName,userPwd,userPhone,userPicPath,userIntro])
    userDao.commit()
    userDao.close()
    #如果写入成功 跳转到登陆页
    if result==1:
        return render(request,'login.html',{'success':1 })
        pass
    else:
        return render(request,'newuser.html',{'success':0})

import json
#用户登陆
def checkUserName(request):
    print("asdfasdf")
    dictObj=json.loads(request.body.decode('utf-8'))
    userName=dictObj['userName']
    userDao=UserDao()
    result=userDao.findUserByUserName([userName])
    rDict={}
    if result:
        rDict['result']=1
    else:
        rDict['result']=0
    return HttpResponse(json.dumps(rDict),content_type='application/json')
    pass

# 用户登陆
def login(request):
    userName = request.POST.get('userName', '')
    userPwd = request.POST.get('userPwd', '')
    remeberme=request.POST.get('remeberme','')
    #密码加密处理
    userPwd = hashlib.md5(userPwd.encode(encoding='utf-8')).hexdigest()
    userDao=UserDao()
    result=userDao.loginParams([userName,userPwd])
    userDao.close()
    if result:
        user={}
        user['userName']=userName
        user['userId']=result[0]['userid']
        user['userPic']=result[0]['userpic']
        request.session['user']=user
        return render(request,'index.html')
    else:
        return redirect('/login/')
    pass

