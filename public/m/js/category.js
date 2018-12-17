$(function(){
    //调用区域滚动的初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

    $.ajax({
        url:'/category/queryTopCategory',
        success:function(obj){
            // console.log(obj);
            var html = template('categoryLeftTpl',obj);
            $('.category-left ul').html(html);
        }
    
    })

    // 为分类标签添加点击事件  用事件冒泡的方法（因为标签是通过事件后生成的）
    $('.category-left ul').on('tap','li a',function(){
        $(this).parent().addClass('active').siblings().removeClass('active');
        // 拿到data-id获取对应盒子  data方法
        var id = $(this).data('id');
        console.log(id);
        queryCategory(id);
    })

    // 请求右侧函数的数据
    function queryCategory(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id : id},
            success:function(obj){
                var html = template('categoryRightTpl',obj);
                $('.category-right ul').html(html);
            }
        })
    }

    queryCategory(1);
})