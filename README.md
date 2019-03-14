# adminlte-tree
A Bootstrap Treeview Generator for AdminLte Sidebar Menu.

在使用AdminLTE 2过程中，需要将数据库-菜单表中的数据转化成对应AdminLte菜单，就简单做一个封装，希望给新手些思路。

必要的css引用
<link href="css/bootstrap-3.3.7.min.css" rel="stylesheet" />
<link href="css/font-awesome.min.css" rel="stylesheet">
<link href="css/ionicons.min.css" rel="stylesheet">
<link href="css/AdminLTE.min.css" rel="stylesheet" />

HTML菜单部分
<aside class="main-sidebar">
  <section class="sidebar">
    <ul class="sidebar-menu" data-widget="tree">
      <li class="header"><i class="fa fa-list"></i>&nbsp;&nbsp;功能菜单</li>
    </ul>
  </section>
</aside>

必要的js引用
<script src="js/jquery3.min.js"></script>
<script src="js/bootstrap-3.3.7.min.js"></script>
<script src="js/adminlte.min.js"></script>
<script src="js/adminlte-menu.js"></script>

使用方式
<script>
    var $menu = $('ul.sidebar-menu');
    $menu.initMenu({
      data : [ {
        menuId : 1,
        parentId : 0,
        menuName : "菜单一",
        href : "1.html",
        icon : "fa-500px"
      },
        {
          menuId : 2,
          parentId : 0,
          menuName : "菜单二",
          href : "2.html",
          icon : "fa-amazon"
        },
        {
          menuId : 3,
          parentId : 0,
          menuName : "菜单三",
          href : "3.html",
          icon : "fa-balance-scale"
        },
        {
          menuId : 4,
          parentId : 1,
          menuName : "菜单1_1",
          href : "1_1.html",
          icon : "fa-battery-0"
        },
        {
          menuId : 5,
          parentId : 1,
          menuName : "菜单1_2",
          href : "1_2.html",
          icon : "fa-battery-0"
        },
        {
          menuId : 6,
          parentId : 1,
          menuName : "菜单1_3",
          href : "1_3.html",
          icon : "fa-battery-0"
        },
        {
          menuId : 7,
          parentId : 2,
          menuName : "菜单2_1",
          href : "2_1.html",
          icon : "fa-object-ungroup"
        },
        {
          menuId : 8,
          parentId : 2,
          menuName : "多级2_2",
          href : "2_2.html",
          icon : "fa-adjust"
        },
        {
          menuId : 9,
          parentId : 8,
          menuName : "多级2_2_1",
          href : "2_2_1.html",
          icon : "fa-adjust"
        },
        {
          menuId : 10,
          parentId : 8,
          menuName : "多级2_2_2",
          href : "2_2_2.html",
          icon : "fa-adjust"
        } ]
    });
</script>

生成的菜单
<ul class="sidebar-menu tree" data-widget="tree">
  <li class="header"><i class="fa fa-list"></i>&nbsp;&nbsp;功能菜单</li>
  <li class="treeview menu-open"><a href="1.html"><i class="fa fa-500px"></i> <span>菜单一</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span></a>
    <ul class="treeview-menu" style="display: block;">
      <li><a href="1_1.html"><i class="fa fa-battery-0"></i> 菜单1_1</a></li>
      <li><a href="1_2.html"><i class="fa fa-battery-0"></i> 菜单1_2</a></li>
      <li><a href="1_3.html"><i class="fa fa-battery-0"></i> 菜单1_3</a></li>
    </ul></li>
  <li class="treeview"><a href="2.html"><i class="fa fa-amazon"></i> <span>菜单二</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span></a>
    <ul class="treeview-menu">
      <li><a href="2_1.html"><i class="fa fa-object-ungroup"></i> 菜单2_1</a></li>
      <li class="treeview"><a href="2_2.html"><i class="fa fa-adjust"></i> <span>多级2_2</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span></a>
        <ul class="treeview-menu">
          <li><a href="2_2_1.html"><i class="fa fa-adjust"></i> 多级2_2_1</a></li>
          <li><a href="2_2_2.html"><i class="fa fa-adjust"></i> 多级2_2_2</a></li>
        </ul>
      </li>
    </ul>
  </li>
  <li><a href="3.html"><i class="fa fa-balance-scale"></i> 菜单三</a></li>
</ul>
