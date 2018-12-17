$(function(){
    //调用区域滚动的初始化
    // mui('.mui-scroll-wrapper').scroll({
    //     indicators: false //是否显示滚动条
    // });
    var searchName = decodeURI((window.location.search).split('=')[1]);
    console.log(searchName);
    queryProduct();

    function queryProduct(){
        // 根据urll里的参数，请求数据
        $.ajax({
            url:'/product/queryProduct',
            data:{page : 1 , pageSize : 4 , proName : searchName},
            success:function(obj){
                console.log(obj);
                var html = template('productListTpl',obj);
                $('.productLists').html(html);
            }
        })
    }

    // 点击价格和销量的升降序排列
    $('#condition ul li a').on('tap',function(){
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
        // 获取排序方式
        var sortType = $(this).data('sort-type');
        // console.log(sortType);
        // 获取当前的排序方式
        var sort = $(this).data('sort');
        sort = sort == 1 ? 2 : 1;
        // console.log(sort)
        // 改变完后要重新改变页面的值
        $(this).data('sort',sort);
        // 声明一个对象存储数据，并且动态的为这个对象添加键和值,
        // 通过[]的方法添加
        var params = {page : 1 , pageSize : 4 , proName : searchName};
        params[sortType] = sort;

        $.ajax({
            url:'/product/queryProduct',
            data: params,
            success:function(obj){
                console.log(obj);
                var html = template('productListTpl',obj);
                $('.productLists').html(html);
            }
        })
    })

    // 点击按钮跳转购买页面，并将该商品的id带过去
    $('.productLists').on('tap','.product-buy',function(){
        var id = $(this).data('id');
        // console.log(id);
        location = 'detail.html?id='+id;
    })

    // 定义一个全局变量page，用于下拉之后每次++
    var page = 1;

    // 1. 初始化下拉上拉刷新的效果
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            // 初始化下拉
            down: {    
                contentdown: "你正在进行下拉还可以继续拉...", 
                contentover: "你已经拉到了可以刷新的位置 可以松手了",
                contentrefresh: "正在给你拼命刷新数据...", 
                callback: function() { //下拉刷新的回调函数 进行数据请求 下拉松手后就会还执行
                    //本地速度很快 加一个定时器延迟1秒钟执行请求和结束下拉效果
                    setTimeout(function() {
                        // 2. 拉了之后请求数据刷新页面 发请求刷新数据即可
                        queryProduct();
                        // 3. 当数据请求完毕页面刷新完毕后 结束下拉刷新  函数版本不一样 函数名不一样 注意当前结束函数
                        // endPulldownToRefresh
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        // 9. 下拉完成后 重置这个上拉加载的效果
                        mui('#refreshContainer').pullRefresh().refresh(true);
                        // 10. 把page也要重置为1
                        page = 1;
                    }, 1000);
                }
            },
            up:{
                contentnomore: '再下实在是给不了更多!',
                contentrefresh: "正在给你拼命刷新数据...", 
                // 下拉之后的回调函数
                callback:function(){
                    setTimeout(function(){
                        //下拉之后请求页数++
                        page++;
                        $.ajax({
                            url:'/product/queryProduct',
                            data:{page : page , pageSize : 4 , proName : searchName},
                            success:function(obj){
                                console.log(obj);
                                if(obj.data.length > 0){
                                    var html = template('productListTpl',obj);
                                    $('.productLists').append(html);
                                    // 7.3 加载完成后结束上拉加载的效果 MUI 结束上拉的函数endPullupToRefresh
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                                }else{
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        })
                    },1000)
                }
            }
        }
    });

    
 
        

    
})