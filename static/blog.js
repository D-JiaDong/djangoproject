function blog(pageSize, currentPage, blogId, opr){
    cName = document.classForm.blogTitle.value

    // if (document.classForm.pageSize.value)
    //     pageSize=document.classForm.pageSize.value
    //     alert(pageSize)
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
    state = 0
    alert("blog运行")
    if(opr == 'publish'){
        state = 1
    }else if(opr == 'cancel'){
        state = 4
    }
    //  $ == jQuery  JSON对象
    $.ajax({
            url:'/bloglist/',
            type: 'POST',
            data: JSON.stringify({
                blogTitle: cName,
                pageSize: pageSize,
                currentPage: currentPage,
                blogState: state,
                blogId: blogId,
                opr: opr,
            }),
            dataType: 'json',
            success: function (data) {
                // data = JSON.parse(data)
                if (opr == 'update') {

                } else {
                    bodyObj = $('#bodyData')
                    params = data.params
                    alert(params.pageSize == '20')
                    text = ""
                    bodyObj.empty()
                    for (i = 0; i < data.data.length; i++) {
                        text += "<tr><td>" + data.data[i].blogid + "</td>" +
                            "<td>" + data.data[i].blogtitle + "</td>" +
                            "<td>" + data.data[i].blogsummary + "</td>" +
                            "<td>" + data.data[i].blogtips + "</td>" +
                            "<td>" + data.data[i].classid__classname + "</td>" +
                            "<td>" + data.data[i].userid__username + "</td>"
                        if (data.data[i].blogstate == 1) {
                            text += "<td>已发布</td>"
                        } else if (data.data[i].blogstate == 2) {
                            text += "<td>审核中</td>"
                        } else if (data.data[i].blogstate == 3) {
                            text += "<td>草稿</td>"
                        } else if (data.data[i].blogstate == 4) {
                            text += "<td>已撤销</td>"
                        } else {
                            text += "<td>0</td>"
                        }

                        text += "<td>" +
                            "<button type='button'  class='btn-primary btn-sm' onclick=\"javascript:document.location.href='/goupdateblog/?blogId=" + data.data[i].blogid + "&opr=update\';\">修改</button>" +
                            "<button  type='button'  class='btn-info btn-sm' onclick=\"blog(" + params.pageSize + ',' + params.currentPage + ' , ' + data.data[i].blogid + ",'publish')\">发布</button>" +
                            "<button  type='button'  class='btn-danger btn-sm' onclick=\"blog(" + params.pageSize + ',' + params.currentPage + ' , ' + data.data[i].blogid + ",'cancel')\">撤销</button>" +
                            "</td>" +
                            "</tr>"
                    }
                    bodyObj.append(text)

                    // 实现分页显示
                    foot_choose_Obj = $('#pagechoose')
                    foot_choose_Obj.empty()
                    pageText = ' <tr align="right">' +
                        '                <td colspan="8">' +
                        '                   总共有' + params.counts + '条 总共有' + params.totalPage + '页' +
                        '                   当前第' + params.currentPage + '页' +
                        '                    <a href="javascript:blog(' + params.pageSize + ',' + 1 + ' , ' + params.totalPage + ',\'search\')" >首页</a>' +
                        '                    <a href="javascript:blog(' + params.pageSize + ',' + (params.currentPage <= 1 ? 1 : params.currentPage - 1) + ' , ' + params.totalPage + ',\'search\')" >上一页</a>' +
                        '                    <a href="javascript:blog(' + params.pageSize + ',' + (params.currentPage >= params.totalPage ? params.totalPage : params.currentPage + 1) + ' , ' + params.totalPage + ',\'search\')" >下一页</a>' +
                        '                    <a href="javascript:blog(' + params.pageSize + ',' + params.totalPage + ' , ' + params.totalPage + ',\'search\')">尾页</a>' +
                        '                </td>' +
                        '            </tr>'
                    foot_choose_Obj.append(pageText) // DOM  innerHTML

                    //实现多页选择
                    foot_fy_Obj = $('#pagenum')
                    foot_fy_Obj.empty()
                    pageText = '                    <option value=\'3\'>3</option>' +
                        '                    <option value=\'20\' >20</option>' +
                        '                        <option value=\'50\' >50</option>' +
                        '                        <option value=\'100\'>100</option>'
                    foot_fy_Obj.append(pageText)
                    var obj = document.getElementById('pagenum');
                    for (i = 0; i < obj.length; i++) {
                        if (obj[i].value == params.pageSize)
                            obj[i].selected = true;
                    }
                    alert(pageText)
                    document.classForm.currentPage.value = params.currentPage
                    }
                }
            }
    )
}
$(document).ready(
    function(){
        blog(3, 1, 0, 'search')
    }
)