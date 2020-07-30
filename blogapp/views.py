from django.shortcuts import HttpResponse, render
from dao.blogclassdao import BlogClassDao
import json
# Create your views here.

# AJAX异步技术实现CURD

def goBlogClass(request):
    return render(request, 'blog/blogclass.html')
    pass


def getBlogClass(request):
    dictObj = json.loads(request.body.decode('utf-8'))

    # 获取查询条件
    className = dictObj.get('className', '')
    classState = dictObj.get('classState', '')
    classId = dictObj.get('classId', '')
    opr = dictObj.get('opr', '')
    pageSize = dictObj.get('pageSize', 0)
    currentPage = dictObj.get('currentPage', 0)

    if pageSize == 0 or pageSize == '':
        pageSize = 5
        pass
    if currentPage == 0 or currentPage == '':
        currentPage = 1
        pass

    classDao = BlogClassDao()

    params = {'className': className,
              'classState': classState,
              'pageSize': int(pageSize),
              'currentPage': int(currentPage)}

    if opr == 'delClass':
        result = classDao.removeclass([classId])
        params['result'] = result
        pass

    if opr == 'updateClass':
        uClass = classDao.findClassByClassId([classId])
        pass

    if opr == 'submitUpdate':
        result = classDao.updateClass([className, classId])
        pass

    counts = classDao.findClassCounts(params)
    totalPage = counts // int(pageSize) if counts % int(pageSize) == 0 else counts // int(pageSize)+1
    params['counts'] = counts
    params['totalPage'] = totalPage
    startRow = (int(currentPage)-1)*int(pageSize)
    params['startRow'] = startRow
    classList = classDao.findPageClassList(params)
    classDao.close()

    return HttpResponse(json.dumps({'data': classList, 'params': params}), content_type='application/json')
    pass



