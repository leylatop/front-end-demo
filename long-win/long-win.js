const fs = require('fs');
const dataList = require('./imock/composition.js')

function getFoundList() {
  const foundList = []
  dataList.forEach((item) => {
    item.compList.forEach((item2) => {
      if(item2.fund) {
        foundList.push(item2.fund)
      }
    })
  })
  return foundList
}
const foundListBasicData = []
function getFoundListBasicData(foundCode) {
  return new Promise((resolve, reject) => {
    const requestUrl = `https://qieman.com/bmdj/v1/fund/info/${foundCode}/detail?broker=0008`
    fetch(requestUrl).then((response) => response.json()).then((data) => {
      const basicData = {}
      basicData.foundCode = data.summary.fundCode
      basicData.foundName = data.summary.fundName
      basicData.uiSetupDate = data.summary.uiSetupDate
      basicData.netAsset = convertToBillions(data.summary.netAsset) + '亿'
      foundListBasicData.push(basicData)
      resolve()
    })
  })
 
}

function convertToBillions(number) {
  number = Number(number)
  // 将数字除以1亿，得到以亿为单位的结果
  let result = number / 100000000;
  // 使用toFixed()函数将结果保留两位小数
  result = result.toFixed(2);
  return result;
}
function generateFile() {
  let fileContent = `| code   | name                  | setupTime | size |\n| ------ | --------------------- | ---- | ---- |\n`
  foundListBasicData.forEach((item) => {
    fileContent += `| ${item.foundCode} | ${item.foundName} | ${item.uiSetupDate} | ${item.netAsset} |\n`
  })
  // console.log(fileContent)
  fs.writeFile('./long-win/output/foundList.md', fileContent, (err) => {})
}
function init() {
  const foundList = getFoundList()
  // 将forEach改为异步调用，否则会出现foundListBasicData为空的情况
  const asyncFuncs = []
  foundList.forEach((item) => {
    asyncFuncs.push(getFoundListBasicData(item.fundCode))
  })
  Promise.all(asyncFuncs).then(() => {
    // console.log(foundListBasicData)
    foundListBasicData.sort((a, b) => new Date(a.uiSetupDate) - new Date(b.uiSetupDate))
    console.log(foundListBasicData.map((item) => item.uiSetupDate))
    // console.log(foundListBasicData.length)
    generateFile()
  })
}

init()
