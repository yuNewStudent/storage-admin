const menus = [
  {
    title: '系统管理',
    name: 'systemsetup',
    icon: '@/assets/icon/系统管理ic.png',
    group: [
      { label: '过期预警', name: 'overduewarning'},
      { label: '操作日志', name: 'operatelog'},
      { label: '人员管理', name: 'personmanage'},
      { label: '商品管理', name: 'goodsmanage'},
      { label: '仓库管理', name: 'storemanage'},
      { label: '供应商管理', name: 'suppliermanagement'},
      { label: '客户管理', name: 'customermanage'},
      { label: '仓库地图', name: 'repositorymap'}
    ]
  },
  {
    title: '产品入库',
    name: 'productstorage',
    icon: '@/assets/icon/产品入库ic.png',
    group: [
      { label: '填写订货单', name: 'writeorder'},
      { label: '订货单审核', name: 'outorderaudit'},
      { label: '历史订货单', name: 'historyorder'},
      { label: '采购入库', name: 'purchase'},
      { label: '归还入库', name: 'reverseretirement'}
    ]
  },
  {
    title: '产品出库',
    name: 'productexit',
    icon: '@/assets/icon/产品出库ic.png',
    group: [
      { label: '填写出库单', name: 'writewarehousereceipt'},
      { label: '出库单审核', name: 'exitorderaudit'},
      { label: '历史申请单', name: 'exithistory'},
      { label: '商品出库', name: 'goodsout'}
    ]
  },
  {
    title: '商品盘存',
    name: 'productcheck',
    icon: '@/assets/icon/商品盘存ic.png',
    group: [
      { label: '货物盘点', name: 'goodscounting'},
      { label: '货物移库', name: 'goodsmove'},
      { label: '仓库环境', name: 'repertoryenvironment'}
    ]
  },
  {
    title: '系统查询',
    name: 'systemquery',
    icon: '@/assets/icon/系统查询ic.png',
    group: [
      { label: '入库单查询', name: 'purchaseordersquery'},
      { label: '归还入库查询', name: 'returnquery'},
      { label: '出库单查询', name: 'outorderquery'},
      { label: '库存查询', name: 'stockquery'},
      { label: '移库查询', name: 'goodsmovequery'},
      { label: '盘点查询', name: 'goodscountingquery'}
    ]
  }
]

export default menus