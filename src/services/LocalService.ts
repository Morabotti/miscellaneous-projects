import * as jsonfile from 'jsonfile'

import config from '../config'

export const getData = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(config.dbServersPath, (err, obj) => {
      if(err) reject(err)
      resolve(obj.data)
    })
  })
}

export const setData = (data: any) => {
  const settableData = {data: data}
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(config.dbServersPath, settableData, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}