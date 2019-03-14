// 需加载jQuery
if (typeof jQuery === 'undefined') {
  throw new Error('adminlte-tree requires jQuery')
}
/** 
 * 生成adminlte树型菜单的html
 * @Usage: $('.sidebar-menu').initMenu(options)
 */
+function($) {
  'use strict';
  var defaults = {
    // json格式的菜单列表
    data : null,
    // 获取菜单列表接口的url
    ajax : null,
    // 获取菜单列表接口的返回值
    ajaxResult : {
      // 返回值的状态标志
      status : 'status',
      // 成功的状态标志
      statusSuccess : '0',
      // 异常描述
      desc : 'desc',
      // json格式的菜单列表
      data : 'data'
    },
    // 一级菜单默认使用的图标
    defaultIcon : '<i class="fa fa-search"></i>',
    // 菜单类
    menu : {
      // 菜单标志对应的字段
      menuId : 'menuId',
      // 父菜单标志对应的字段
      parentId : 'parentId',
      // 菜单名称
      menuName : 'menuName',
      // 菜单跳转链接
      href : 'href',
      // 菜单的图标
      icon : 'icon'
    }
  }
  $.fn.initMenu = function(options) {
    var options = $.extend(defaults, options);
    return this.each(function() {
      var $this = $(this);
      // 参数校验
      // 判断配置选项是否空
      if (!options.data && !options.ajax)
        throw new Error('待转化菜单数据为空');
      // 判断菜单数据是否空
      if ($.isArray(options.data)) {
        $this.append(_treeMenu(options.data, 0));
      }
      // 尝试异步加载菜单数据
      else {
        // 异步获取菜单数据
        $.get(options.ajax, function(result) {
          // 校验返回值
          // 判断空
          if (jQuery.isEmptyObject(result))
            throw new Error('获取菜单列表失败');
          if (!result[options.ajaxResult.status])
            throw new Error('获取菜单列表状态失败');
          // 获取成功
          if (options.ajaxResult.statusSuccess == result[options.ajaxResult.status]) {
            if (jQuery.isArray(result[options.ajaxResult.data])) {
              $this.append(_treeMenu(result[options.ajaxResult.data], 0));
            }
          } else {
            throw new Error('获取菜单列表失败:' + result[options.ajaxResult.desc]);
          }
        });
      }
    });
    /**
     * 递归生成菜单树
     * @param {array} arrayMenu - 菜单列表组
     * @param {number} parentId - 父菜单标志
     * @return {string} 菜单树
     */
    function _treeMenu(arrayMenu, parentId) {
      var tree = '';
      // 搜索所有父节点ID等于参数的条目并绘制该层
      for (var i = 0; i < arrayMenu.length; i++) {
        var menu = arrayMenu[i];
        // 如果父菜单ID等于参数绘制该条
        if (menu[options.menu.parentId] == parentId) {
          // 叶子节点
          if (_isLeaf(menu[options.menu.menuId], arrayMenu)) {
            // 判断是否配置了图标（叶子节点默认无图标）
            var icon = '';
            if (menu[options.menu.icon]) {
              icon = '<i class="fa ' + menu[options.menu.icon] + '"></i>'
            }
            tree += '<li><a href="' + menu[options.menu.href] + '">' + icon + ' ' + menu[options.menu.menuName] + '</a></li>'
          }
          // 非叶子节点
          else {
            // 判断是否配置了图标（非叶子节点默认使用设定图标）
            var icon = options.defaultIcon;
            if (menu[options.menu.icon]) {
              icon = '<i class="fa ' + menu[options.menu.icon] + '"></i>'
            }
            tree += '<li class="treeview"><a href="' + menu[options.menu.href] + '">' + icon + ' <span>' + menu[options.menu.menuName] + '</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span></a>';
            tree += '<ul class="treeview-menu">' + _treeMenu(arrayMenu, menu[options.menu.menuId]) + '</ul></li>';
          }
        }
      }
      return tree;
    }
    // 非叶子节点合集
    var __set = null;
    /**
     * 判断是否叶子节点
     * @param {number} menuId - 菜单标志
     * @param {array} arrayMenu - 菜单列表组
     * @return {boolean} 是否叶子节点
     */
    function _isLeaf(menuId, arrayMenu) {
      var set = __set;
      if (!set) {
        set = new Set();
        for (var i = 0; i < arrayMenu.length; i++) {
          set.add(arrayMenu[i][options.menu.parentId]);
        }
        __set = set;
      }
      return !(set.has(menuId));
    }
  }
}(jQuery);
