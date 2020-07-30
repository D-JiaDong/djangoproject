function blogClass(pageSize, currentPage, classId, opr){
    cName = document.classForm.className.value
    // $.==jQuery. JSON对象
    //jsonObj = {a:1, b:2}
    //jsonObj.a = 100   不需要jsonObj[a]
    $.ajax({
            url: '/classlist/',
            type: 'POST',
            //后端传入数据
            data: JSON.stringify({   //把JSON对象转成JSON文本
                className: cName,
                pageSize: pageSize,
                currentPage: currentPage,
                classId: classId,
                opr: opr
            }),
            dataType:'json',
        //传入成功 执行操作
            success:function(data){
                //data = JSON.parse(data)
                if(data.data.length > 0){
                    bodyObj = $('#bodyData')
                    text = ""
                    bodyObj.empty()
                    for(i=0;i<data.data.length;i++){
                        text += "<tr><td></td><td>" + data.data[i].classid +"</td><td>" + data.data[i].classname +"</td><td></td></tr>"
                    }
                    bodyObj.append(text)
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