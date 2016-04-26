$(function(){
    
    // 三个按钮按顺序出现
    setTimeout(function(){
        $(".reset").addClass("animated bounceInDown").show();   
    },300);
    setTimeout(function(){
        $(".stop").addClass("animated bounceInDown").show();   
    },800);
    setTimeout(function(){
        $(".begin").addClass("animated bounceInDown").show();   
    },1300);

    // 循环出现数组里的元素
    var target = $('#wrap');
    var btn1 = $('.begin');
    var btn2 = $('.stop');
    var btn3 = $('.reset');

    var list = ["白一","刘二","张三","李四","王五","赵六","孙七","梁八","辛九","唐十"];

    var interval = 100;
    var i = 0;

    // 核心程序
    function myfuc(){
      target.html(list[i]);
      i++;
      if (i>=list.length) {
        i=0;
      };
    }

    // 单击第一个按钮后，每隔一段时间，执行核心程序
    btn1.click(function(){
      mytime = setInterval(myfuc,interval);
    })

    // 单击第二个按钮后，清除按钮一的效果
    btn2.click(function(){
      clearInterval(mytime);
    })

    // 单击第三个按钮后，清零并返回初始值
    btn3.click(function(){
      i = 0;
      target.html('Let\'s Go');
    })

});