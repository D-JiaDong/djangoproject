function blogClass(pageSize, currentPage, classId, opr){
    cName = document.classForm.className.value
    uName =  document.classForm.cName.value
    aName = document.classForm.aName.value
     try{
        page_Size=document.classForm.pageSize.value
       pageSize=page_Size
    //通常来讲，这里的代码会从头到尾而不会产生任何问题
    //但有时会抛出一个异常，要么是由throw语句直接抛出，要么通过调用一个方法间接抛出
}catch(e) {
       //当且仅当try语句块抛出了异常，才会执行这里的代码
       //这里可以通过局部变量e来获得对Error对象或者抛出的其他值的引用
       //这里的代码块可以基于某种原因处理这个异常，也可以忽略这个异常，还可以通过throw语句重新抛出异常
   }
    if(opr == 'submitUpdate' || opr == 'add'){
        currentPage = document.classForm.currentPage.value
        classId = document.classForm.cId.value
    }


    //  $ == jQuery  JSON对象
    $.ajax({
            url:'/classlist/',
            type: 'POST',
            data: JSON.stringify({
                className: cName,
                pageSize: pageSize,
                currentPage: currentPage,
                classId: classId,
                opr: opr,
                uName: uName,
                aName: aName
            }),
            dataType: 'json',
            success: function (data) {
                // data = JSON.parse(data)
                if(opr == 'update'){
                    $('#modal-update').modal()
                    uClass = data.uClass
                    params = data.params
                    document.classForm.cName.value = uClass.classname
                    document.classForm.cId.value =  uClass.classid
                    document.classForm.currentPage.value = params.currentPage

                    cArray = document.classForm.cState
                    for(i=0;i < cArray.length; i++){
                        if(data.uClass.classstate == i+1){
                            cArray[i].checked = 'checked'
                        }
                    }

                }else {
                    bodyObj = $('#bodyData')
                    params = data.params
                    text = ""
                    bodyObj.empty()
                    for (i = 0; i < data.data.length; i++) {
                        text += "<tr><td></td><td>" + data.data[i].classid + "</td><td>"
                            + data.data[i].classname + "</td>" + "<td></td>" +
                            "<td>" +
                            " <a href=\"javascript:blogClass(" + params.pageSize + ',' + params.currentPage + ' , ' + data.data[i].classid + ",\'update\')\">修改</a>" +
                            " <a href=\"javascript:blogClass(" + params.pageSize + ',' + params.currentPage + ' , ' + data.data[i].classid + ",\'delClass\')\">删除</a>" +
                            "</td>" +
                            "</tr>"
                    }
                    bodyObj.append(text)

                    // 实现分页显示
                    footObj = $('#pageData')
                    footObj.empty()
                    pageText = ' <tr align="right">' +
                        '                <td colspan="6">' +
                        '                   总共有' + params.counts + '条 总共有' + params.totalPage + '页' +
                        '                   当前第' + params.currentPage + '页' +
                        '                    <a href="javascript:blogClass(' + params.pageSize + ',' + 1 + ' , ' + params.totalPage + ',\'search\')" >首页</a>' +
                        '                    <a href="javascript:blogClass(' + params.pageSize + ',' + (params.currentPage <= 1 ? 1 : params.currentPage - 1) + ' , ' + params.totalPage + ',\'search\')" >上一页</a>' +
                        '                    <a href="javascript:blogClass(' + params.pageSize + ',' + (params.currentPage >= params.totalPage ? params.totalPage : params.currentPage + 1) + ' , ' + params.totalPage + ',\'search\')" >下一页</a>' +
                        '                    <a href="javascript:blogClass(' + params.pageSize + ',' + params.totalPage + ' , ' + params.totalPage + ',\'search\')">尾页</a>' +
                         '                    <select name="pageSize" id="pageSize">' +
                        '                    <option value=\'3\'>3</option>' +
                        '                    <option value=\'20\' >20</option>' +
                        '                        <option value=\'50\' >50</option>' +
                        '                        <option value=\'100\'>100</option>'+
                         '                    </select>' +
                        '                </td>' +
                        '            </tr>'
                    footObj.append(pageText) // DOM  innerHTML
                    document.classForm.currentPage.value = params.currentPage


                    //js实现selected
                    var obj = document.getElementById('pageSize');
                    for (i = 0; i < obj.length; i++) {
                        if (obj[i].value == params.pageSize)
                            obj[i].selected = true;
                    }
                }


                if(opr == 'submitUpdate' || opr == 'add'){
                    $('#modal-update').modal('hide')
                    $('#modal-add').modal('hide')
                }
           }
        }
    )
}
$(document).ready(
    function(){
        blogClass(3, 1, 0, 'search')
    }
)
