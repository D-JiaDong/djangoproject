function role(pageSize, currentPage, blogId, opr) {
    userId = document.classForm.userId.value
    userName=document.classForm.userName.value
    userRole=document.classForm.userRole.value

    // if (document.classForm.pageSize.value)
    //     pageSize=document.classForm.pageSize.value
    //     alert(pageSize)
    try {
        page_Size = document.classForm.pageSize.value
        pageSize = page_Size
        //通常来讲，这里的代码会从头到尾而不会产生任何问题
        //但有时会抛出一个异常，要么是由throw语句直接抛出，要么通过调用一个方法间接抛出
    } catch (e) {
        //当且仅当try语句块抛出了异常，才会执行这里的代码
        //这里可以通过局部变量e来获得对Error对象或者抛出的其他值的引用
        //这里的代码块可以基于某种原因处理这个异常，也可以忽略这个异常，还可以通过throw语句重新抛出异常
    }
    state = 0
    if (opr == 'publish') {
        state = 1
    } else if (opr == 'cancel') {
        alert(4)
        state = 4
    }
    //  $ == jQuery  JSON对象
    $.ajax({
            url: '/rolelist/',
            type: 'POST',
            data: JSON.stringify({
                userId: userId,
                userName:userName,
                userRole:userRole,
                pageSize: pageSize,
                currentPage: currentPage,
                blogState: state,
                opr: opr,
            }),
            dataType: 'json',
            success: function (data) {
                // data = JSON.parse(data)
                if (opr == 'update') {

                } else {
                    bodyObj = $('#bodyData')
                    params = data.params
                    text = ""
                    bodyObj.empty()
                    for (i = 0; i < data.data.length; i++) {
                        text += "<tr><td>" + data.data[i].userid + "</td>" +
                            "<td>" + data.data[i].username + "</td>" +
                            "<td>" + data.data[i].role + "</td>"
                        if (data.data[i].role == 1) {
                            text += "<td>管理员</td>"
                        } else if (data.data[i].role == 2) {
                            text += "<td>普通用户</td>"
                        }

                        // text += "<td>" +
                        //     "<button type='button'  class='btn-primary btn-sm' onclick=\"javascript:document.location.href='/goupdateblog/?blogId=" + data.data[i].blogid + "&opr=update\';\">修改</button>" +
                        //     "<button  type='button'  class='btn-info btn-sm' onclick=\"role(" + params.pageSize + ',' + params.currentPage + ' , ' + data.data[i].blogid + ",'publish')\">发布</button>" +
                        //     "<button  type='button'  class='btn-danger btn-sm' onclick=\"role(" + params.pageSize + ',' + params.currentPage + ' , ' + data.data[i].blogid + ",'cancel')\">撤销</button>" +
                        //     "</td>" +
                        //     "</tr>"
                    }
                    bodyObj.append(text)

                    // 实现分页显示
                    footObj = $('#pageData')
                    footObj.empty()
                    pageText = ' <tr align="right">' +
                        '                <td colspan="8">' +
                        '                   总共有' + params.counts + '条 总共有' + params.totalPage + '页' +
                        '                   当前第' + params.currentPage + '页' +
                        '                    <a href="javascript:role(' + params.pageSize + ',' + 1 + ' , ' + params.totalPage + ',\'search\')" >首页</a>' +
                        '                    <a href="javascript:role(' + params.pageSize + ',' + (params.currentPage <= 1 ? 1 : params.currentPage - 1) + ' , ' + params.totalPage + ',\'search\')" >上一页</a>' +
                        '                    <a href="javascript:role(' + params.pageSize + ',' + (params.currentPage >= params.totalPage ? params.totalPage : params.currentPage + 1) + ' , ' + params.totalPage + ',\'search\')" >下一页</a>' +
                        '                    <a href="javascript:role(' + params.pageSize + ',' + params.totalPage + ' , ' + params.totalPage + ',\'search\')">尾页</a>' +
                        '                    <select name="pageSize" id="pageSize">' +
                        '                    <option value=\'3\'>3</option>' +
                        '                    <option value=\'20\' >20</option>' +
                        '                        <option value=\'50\' >50</option>' +
                        '                        <option value=\'100\'>100</option>' +
                        '                    </select>' +
                        '                </td>' +
                        '            </tr>'
                    footObj.append(pageText) // DOM  innerHTML


                    var obj = document.getElementById('pageSize');
                    for (i = 0; i < obj.length; i++) {
                        if (obj[i].value == params.pageSize)
                            obj[i].selected = true;
                    }
                    document.classForm.currentPage.value = params.currentPage
                }
            }
        }
    )
}
$(document).ready(
    function(){
        role(3,1,0,"search")
    }
)