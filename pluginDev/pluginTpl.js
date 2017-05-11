/**
 * 定义jQuery插件的模板【通过$.fn 向jQuery添加新的方法】
 * 
 * 使用方法：$('#domName').fucName({})
 * 
 * 使用备注：
 * 
 * $.extend方法是在jQuery全局对象上扩展方法，
 * $.fn.extend方法是在$选择符选择的jQuery对象上扩展方法。
 * 所以扩展jQuery的公共方法一般用$.extend方法，
 * 定义插件一般用$.fn.extend方法。
 * 
 */

// 1、定义jQuery作用域
(function($) {

	// 2、设置默认参数
    var defaults = {
        item: ''
    }

    //6、在插件里定义方法   
    var showLink = function(obj) {
        $(obj).append(function() {
            return "(" + $(obj).attr("href") + ")" 
        });
    }

    // 3、定义插件的扩展方法
    $.fn.fucName = function(options) {

        // 4、合并用户自定义属性，默认属性
        // 一个好的做法是将一个新的空对象做为$.extend的第一个参数，
        // defaults和用户传递的参数对象紧随其后，
        // 这样做的好处是所有值被合并到这个空对象上，
        // 保护了插件里面的默认值。
        var options = $.extend({}, defaults, options);

        //5、在这里面,this指的是用jQuery选中的元素 
        this.each(function() {

            //7、调用插件里自己定义的方法
            showLink(this);
        });

        // 支持链式调用
        return this;
    }

})(jQuery)
