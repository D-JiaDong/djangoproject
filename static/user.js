function checkUserName(){
    uName = document.regForm.userName.value
    // $.==jQuery. JSON对象
    //jsonObj = {a:1, b:2}
    //jsonObj.a = 100   不需要jsonObj[a]
    $.ajax({
            url: '/checkUserName/',
            type: 'POST',
            data: JSON.stringify({   //把JSON对象转成JSON文本
                userName: uName
            }),
            dataType:'json',
            success:function(data){
                //data = JSON.parse(data)
                if(data.result == 1){
                    alert("用户名已经存在！")
                }
            }
        }
    )
}