$(function(){
    // 搜索的点击事件
    queryHistory();
    $('.btn-search').on('tap',function(){
        var search = $('.input-search').val();
        //跳转
        location = ('productlist.html?search='+search);

        // 输入框非空判断
        if(!search.trim()){
            alert('请输入要搜索的商品');
            return;
        }
        
        // 搜索的历史记录事件  localstorage方法
        // 点击搜索之后，浏览器调用localstorage记录

        // 本地存储有值就往里面加数据，没有就自定义空数组
        var history = JSON.parse(localStorage.getItem('letaoHistory')) || [];
        // history.push(search);
        // 如果本地存储中存在输入的数据，删掉再加   
        // indexOf()方法:如果数组中存在则返回下标，否则返回-1
        // array.splice(a,b) 删除下标a到b(要删除的项目数量)
        if(history.indexOf(search) != -1){
            history.splice(history.indexOf(search),1);
        }
        history.unshift(search);    
        console.log(history);
        localStorage.setItem('letaoHistory',JSON.stringify(history));
        queryHistory();
    })

    // X的点击事件
    $('.historyData').on('tap','.close',function(){
        // 获取当前要删除的索引
        var index = $(this).data('index');
        // console.log(index);
        var history = JSON.parse(localStorage.getItem('letaoHistory')) || [];
        history.splice(index,1);
        // 把删除完成后的数组重新保存到存储里面
        localStorage.setItem('letaoHistory',JSON.stringify(history));
        queryHistory();
    })

    // li标签的点击事件
    $('.historyData').on('tap','.tips',function(){
        var children = $(this).children();
        var tipsName = children[0].innerText;
        $('.input-search').val(tipsName);
    })

    // 清空记录的点击事件
    $('.clear').on('tap',function(){
        localStorage.removeItem('letaoHistory');
        queryHistory();
    })

    //渲染搜索记录模板的函数
    function queryHistory(){
        var history = JSON.parse(localStorage.getItem('letaoHistory')) || [];
        //数据是一个数组 模板引擎要求对象 需要包装
        history = {rows : history};
        var html = template('historyTpl',history);
        $('.historyData').html(html);
    }
    
})