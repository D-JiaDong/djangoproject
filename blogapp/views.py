from django.shortcuts import HttpResponse, render
from dao.blogclassdao import BlogClassDao
import json
# Create your views here.

# AJAX异步技术实现CURD

def goBlogClass(request):
    return render(request, 'blog/blogclass.html')
    pass


def getBlogClass(request):
    dictObj = json.loads(request.body.decode('utf-8'),strict=False)
    print("11111")
    print(dictObj)

    # 获取查询条件
    className = dictObj.get('className', '')
    classState = dictObj.get('classState', '')
    classId = dictObj.get('classId', '')
    opr = dictObj.get('opr', '')
    pageSize = dictObj.get('pageSize', 0)
    currentPage = dictObj.get('currentPage', 0)

    if pageSize == 0 or pageSize == "":
        pageSize = 3
        pass
    if currentPage == 0 or currentPage == "":
        currentPage = 1
        pass

    classDao = BlogClassDao()

    params = {'className': className,
              'classState': classState,
              'pageSize': int(pageSize),
              'currentPage': int(currentPage)}

    if opr == 'delClass':
        result = classDao.removeClass([classId])
        params['result'] = result
        pass

    if opr == 'update':
        uClass = classDao.findClassByClassId([classId])
        return HttpResponse(json.dumps({'params': params, 'uClass': uClass}), content_type='application/json')
        pass

    # 提交修改用户的个人信息
    if opr == 'submitUpdate':
        uName = dictObj.get('uName', '')
        result = classDao.updateClass([uName, classId])
        #点击保存只显示修改的单条信息
        #params['className']=uName
        pass

    if opr == 'add':
        aName = dictObj.get('aName', '')
        print(aName)
        result = classDao.createClass([aName])
        classDao.commit()
        pass

    counts = classDao.findClassCounts(params)
    totalPage = counts // int(pageSize) if counts % int(pageSize) == 0 else counts // int(pageSize) + 1
    print(totalPage)
    params['counts'] = counts
    params['totalPage'] = totalPage
    currentPage = int(currentPage) if int(currentPage) < totalPage else totalPage
    currentPage = 1 if currentPage <= 0 else currentPage
    params['currentPage'] = currentPage
    # 计算两个值：startRow
    startRow = (int(currentPage) - 1) * int(pageSize)
    params['startRow'] = startRow
    classList = classDao.findPageClassList(params)
    classDao.close()

    return HttpResponse(json.dumps({'data': classList, 'params': params},ensure_ascii=False), content_type='application/json')
    pass



