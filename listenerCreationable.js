// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const { getClases, clasification, datesCasification, compareClasification } = require('./restClient')
const { dates } = require('./utils')
const pubsub = new PubSub()
const subscriptionName = 'subscription-table-creation'
const timeout = 30
process.env.GOOGLE_APPLICATION_CREDENTIALS="/home/mrivera/GC/gc.json"

const subscription = pubsub.subscription(subscriptionName)

let messageCount = 0;
const messageHandler = async message => {
  console.log(`Received message ${message.id}:`)
  console.log(`\tData: ${message.data}`)
  console.log(`\tAttributes: ${message.attributes}`)
  messageCount += 1
  message.ack()
  
  let [from, to] = dates(message.data)
  //let clases = JSON.parse(await getClases())
  //for (let ii = 0 ; ii < clases.length ; ii++) {
  //for (let ii = 0 ; ii < 1 ; ii++) {
    let clase = 'J01E' // clases[ii].clase
    console.log('Start Clasification K-MEANS for: ', clase, from, to)
    let clasResult = await clasification(clase)(from)(to)
    console.log('END Clasification K-MEANS for: ', clase, from, to, clasResult)
  //}
  console.log('Clasification DATES')
  let datesClas = await datesCasification()
  console.log('Clasification TENDS', datesClas)
  let compare = await compareClasification()
  console.log('END', compare)
  
}

subscription.on(`message`, messageHandler);

setTimeout(() => {
  //subscription.removeListener('message', messageHandler)
  console.log(`${messageCount} message(s) received.`)
}, timeout * 1000)


