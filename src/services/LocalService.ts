import * as jsonfile from 'jsonfile'

export const getData = (path: string) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(path, (err, obj) => {
      if(err) reject(err)
      resolve(obj)
    })
  })
}

export const setData = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(path, data, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}