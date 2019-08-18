import * as request from 'request'
import * as cheerio from 'cheerio'
import { Teacher } from '../types'

export const getTeacherFromVamk = (
  id: string
): Promise<Teacher> => new Promise((resolve, reject) => {
  request('http://www.puv.fi/fi/contact/?person=' + id, (err, response, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const name = $('#main_content_right table tbody tr').children().eq(1).children().eq(0).text()
      if (name !== '') {
        return resolve({ id, name })
      } else {
        return reject()
      }
    } else {
      return reject()
    }
  })
})