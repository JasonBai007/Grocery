/**
 * 通过$.extend()来扩展jQuery
 * 
 * 使用方法：$.sayHello('Wayou');
 * 
 * 使用备注：这种方式无法利用jQuery强大的选择器带来的便利
 */

$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'Dude') + '!');
    }
})

