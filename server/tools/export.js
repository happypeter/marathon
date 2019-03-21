const mongoose = require('mongoose')
const fs = require('fs')
const Excel = require('exceljs')
const moment = require('moment')
const path = require('path')

const User = require('../models/user')
const config = require('../config')

mongoose.Promise = global.Promise
mongoose.connect(config.url, { useNewUrlParser: true })

const fields = [
  'name',
  'gender',
  'phone',
  'identity',
  'contact',
  'contactPhone',
  'birthday',
  'bloodType',
  'size',
  'createdAt'
]

const getUserColumns = () => {
  return [
    { header: '注册时间', key: 'createdAt', width: 32 },
    { header: '姓名', key: 'name', width: 32 },
    { header: '性别', key: 'gender', width: 32 },
    { header: '手机号', key: 'phone', width: 32 },
    { header: '身份证号', key: 'identity', width: 32 },
    { header: '紧急联系人', key: 'contact', width: 32 },
    { header: '紧急联系人电话', key: 'contactPhone', width: 32 },
    { header: '出生日期', key: 'birthday', width: 32 },
    { header: '血型', key: 'bloodType', width: 32 },
    { header: 'T恤尺寸', key: 'size', width: 32 }
  ]
}

const getUserRowValues = (data, columns) => {
  let rowValues = []
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i]
    const value = data[col.key]
    switch (col.key) {
      case 'createdAt':
        rowValues[i] = value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : ''
        break
      default:
        rowValues[i] = value
        break
    }
  }
  return rowValues
}

const createUserExcel = async () => {
  // create a workbook
  const workbook = new Excel.Workbook()
  workbook.creator = 'admin'
  workbook.created = new Date()

  // create a worksheet with name 'users'
  const sheet = workbook.addWorksheet('users', {
    properties: { tabColor: { argb: 'FF00FF00' } }
  })

  sheet.properties.defaultRowHeight = 60

  // get worksheet by id
  let worksheet = workbook.getWorksheet(sheet.id)

  const columns = getUserColumns()
  // add column headers
  worksheet.columns = columns
  let users = []
  try {
    users = await User.find({}).sort('-createdAt')
  } catch (err) {
    console.log('get matched users err...', err)
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    worksheet.addRow(getUserRowValues(user, columns))
  }

  try {
    const dir = path.join(__dirname, '../download')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(path.join(__dirname, '../download'))
    }
    return workbook.xlsx.writeFile(`${dir}/users.xlsx`)
  } catch (err) {
    console.log('write excel file err...', err)
  }
}

createUserExcel()
  .then(() => {
    console.log('done!')
    process.exit(1)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
