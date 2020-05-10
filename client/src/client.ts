const checkResponse = (res: Response): Promise<Response> => {
  if (!res.ok) {
    return res.text()
      .then((text) => {
        try {
          const jsonError = JSON.parse(text)
          if (jsonError.message) {
            return jsonError.message
          }
          return text
        }
        catch (e) {
          return text
        }
      })
      .then((message) => Promise.reject(new Error(`${message} (HTTP ${res.status.toString()})`)))
  }
  return Promise.resolve(res)
}
