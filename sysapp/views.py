from django.shortcuts import render
from dao.userDao import UserDao
import os
# Create your views here.
def getUserList(request):
    userDao=UserDao()
    # 获取查询条件
    userName = request.POST.get('userName', '')
    userPhone = request.POST.get('userPhone', '')
    userState = request.POST.get('userState', '')
    pageSize = request.POST.get('pageSize', '0')
    currentPage = request.POST.get('currentPage', '0')
    userId = request.POST.get('userId', '')
    print(userId)
    opr=request.POST.get('opr','')
    if pageSize=="0" or pageSize=="":
        pageSize="3"
    if currentPage=="0" or currentPage=="":
        currentPage="1"



    print(type(pageSize))
    params={'userName':userName,'userPhone':userPhone,'userState':userState,
            'pageSize':int(pageSize),'currentPage':int(currentPage)}




    if opr=='delUser':
        result=userDao.removeUser(userId)
        params['result']=result

    #查询用户的个人信息
    if opr=='update':
        uUser=userDao.findUserByUserId([userId])
        return render(request,'sysmgr/updateuser.html',{'params':params,'uUser':uUser})
        pass


    #提交用户的个人信息
    if opr=='submitUpdate':
        print("修改")
        print(userId)
        userIntro=request.POST.get('userIntro','')
        # 文件上传
        userPicPath=""
        if request.POST:
            fileObj = request.FILES.get('userPic', None)
            if fileObj:
                userPicPath = '/static/upload/' + fileObj.name
                filePath = os.path.join(os.getcwd(), 'static/upload/' + fileObj.name)
                with open(filePath, 'wb+') as fp:
                    for chunk in fileObj.chunks():
                        fp.write(chunk)
        result=userDao.updateUser([userPhone,userPicPath,userIntro,userId])
        pass

    counts=userDao.findUserCounts(params)
    totalePage=counts // int(pageSize) if counts%int(pageSize)==0 else counts//int(pageSize)+1
    params['counts']=counts
    params['totalPage']=totalePage
    #计算两个值 startRow
    startRow=(int(currentPage)-1)*int(pageSize)
    params['startRow']=startRow
    userList=userDao.findPageUserList(params)
    userDao.commit()
    userDao.close()
    return render(request,'sysmgr/userinfo.html',{'userList':userList,'params': params})
    pass
