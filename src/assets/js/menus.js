const menus = [
  {
    title: '系统管理',
    name: 'systemsetup',
    icon: '',
    group: [
      { label: '人员管理', name: 'personmanage'},
      { label: '商品管理', name: 'goodsmanage'},
      { label: '仓库管理', name: 'storemanage'},
      { label: '供应商管理', name: 'suppliermanagement'},
      { label: '客户管理', name: 'customermanage'}
    ]
  },
  {
    title: '产品入库',
    name: 'productstorage',
    icon: '',
    group: [
      { label: '填写订货单', name: 'writeorder'},
      { label: '采购入库', name: 'purchase'},
      { label: '反退入库', name: 'reverseretirement'}
    ]
  },
  {
    title: '产品出库',
    name: 'productexit',
    icon: '',
    group: [
      { label: '填写出库单', name: 'writewarehousereceipt'},
      { label: '商品出库', name: 'goodsout'}
    ]
  },
  {
    title: '产品盘点',
    name: 'productcheck',
    icon: '',
    group: [
      { label: '货物移库', name: 'goodsmove'},
      { label: '货物盘点', name: 'goodscounting'},
      { label: '仓库环境', name: 'repertoryenvironment'}
    ]
  },
  {
    title: '系统查询',
    name: 'systemquery',
    icon: '',
    group: [
      { label: '采购单查询', name: 'purchaseordersquery'},
      { label: '归还入库查询', name: 'returnquery'},
      { label: '出库单查询', name: 'outorderquery'},
      { label: '库存查询', name: 'stockquery'},
      { label: '移库查询', name: 'goodsmovequery'}
    ]
  }
]

export default menus