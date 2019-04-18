function filterTable(tableData, filtes) {
  return tableData.filter(item => {
    let par = ''
    for (let key in filtes){
      par += `&&(item.${key}.indexOf(filtes.${key})>-1)`
    }
    return eval(par.slice(2))
  })
}

export default filterTable