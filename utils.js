'use strict'

let dates = dates => {
  let from = new Date(dates)
  from.setMonth(from.getMonth()-3)
  from.setHours(12)
  from.setDate(1)
  let to = new Date(dates)
  to.setHours(12)
  to.setDate(1)
  return [from.toISOString().split("T")[0], to.toISOString().split("T")[0]]
}

module.exports = {
  dates
}