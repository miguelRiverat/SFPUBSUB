'use strict'

const rp = require('request-promise')

let getClases = () => {
  return rp('https://us-central1-prime-principle-243417.cloudfunctions.net/clase')
  .then(response => {
      return response
  })
  .catch(err => {
      return err
  })
}

let compareClasification = () => {
  return rp('https://us-central1-prime-principle-243417.cloudfunctions.net/compare')
  .then(response => {
      return response
  })
  .catch(err => {
      return err
  })
}

let datesCasification = () => {
  return rp('https://us-central1-prime-principle-243417.cloudfunctions.net/fec-clasification')
  .then(response => {
      return response
  })
  .catch(err => {
      return err
  })
}

let clasification = clase => {
  let options = {
    method: 'POST',
    uri: 'https://us-central1-prime-principle-243417.cloudfunctions.net/clasification',
    body: {
      clase
    },
    json: true
  };
 
  return rp(options)
    .then(parsedBody => {
        return parsedBody
    })
    .catch(err => {
        return err
    })
}



module.exports = {
  getClases,
  clasification,
  datesCasification,
  compareClasification
}