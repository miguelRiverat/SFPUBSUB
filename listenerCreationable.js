// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const { getClases, clasification, datesCasification, compareClasification } = require('./restClient')


const pubsub = new PubSub()
const subscriptionName = 'subscription-table-creation'
const timeout = 30

const subscription = pubsub.subscription(subscriptionName)

let messageCount = 0;
const messageHandler = async message => {
  console.log(`Received message ${message.id}:`)
  console.log(`\tData: ${message.data}`)
  console.log(`\tAttributes: ${message.attributes}`)
  messageCount += 1
  message.ack()
  let clases = JSON.parse(await getClases())
  for (let ii = 0 ; ii < clases.length ; ii++) {
  //for (let ii = 0 ; ii < 1 ; ii++) {
    console.log('Start Clasification K-MEANS for: ', clases[ii].clase)
    let clasResult = await clasification(clases[ii].clase)
    console.log('END Clasification K-MEANS for: ', clases[ii].clase, clasResult)
  }
  console.log('Clasification DATES')
  let datesClas = await datesCasification()
  console.log('Clasification TENDS')
  let compare = await compareClasification()
  
}

subscription.on(`message`, messageHandler);

setTimeout(() => {
  //subscription.removeListener('message', messageHandler)
  console.log(`${messageCount} message(s) received.`)
}, timeout * 1000)


