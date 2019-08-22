// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const { getClases, getMolec, clasification, datesCasification, compareClasification } = require('./restClient')
const { clasification: clasic } = require('./clasifications')
const { dates } = require('./utils')
const pubsub = new PubSub()
const subscriptionName = 'subscription-table-creation'
const timeout = 30
//process.env.GOOGLE_APPLICATION_CREDENTIALS="/home/mrivera/GC/gc.json"

const subscription = pubsub.subscription(subscriptionName)

let messageCount = 0;
const messageHandler = async message => {

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  console.log('mensaje reci')
  await sleep(90000)
  console.log('iniciando')

  console.log(`Received message ${message.id}:`)
  console.log(`\tData: ${message.data}`)
  console.log(`\tAttributes: ${message.attributes}`)
  messageCount += 1
  message.ack()
  
  let [from, to] = dates(message.data)
  let clases = ["J01K","J01B","J01D","J01F","J01G","J01C","J01E","J01H"] //JSON.parse(await getClases())

  //for (let ii = 0 ; ii < clases.length ; ii++) {
  //for (let ii = 0 ; ii < 1 ; ii++) {
    let clase = 'J01C' //clases[ii] //clases[ii].clase
    console.log('Start Clasification K-MEANS for: ', clase, from, to)
    let clasResult = await clasic(clase, from, to)
    console.log('END Clasification K-MEANS for: ', clase, from, to)
  //}

  //let moleculas = await getMolec()
  /*for (let ii = 0 ; ii < moleculas.length ; ii++) {
    let molecula = moleculas[ii]     
    let datesClas = await datesCasification()
    console.log('Dates', datesClas)
    let compare = await compareClasification(from, to, molecula)
    console.log('Compare', compare)
  }*/
}

subscription.on(`message`, messageHandler);

setTimeout(() => {
  //subscription.removeListener('message', messageHandler)
  console.log(`${messageCount} message(s) received.`)
}, timeout * 1000)


