const redis = require('redis')

const client = redis.createClient({
  host: 'localhost',
  port: 7379,
})

client.on('error', (error) => {console.log({error})})

async function testRedis() {
  try{
    await client.connect()
    console.log("Connected To Redis")

    // Information in redis is stored in key, value pair. This is the method to retrieve information
    await client.set("key", "Value")
    await client.set("Name", "Abhinav")
    // This will override the value
    await client.set("Name", "Prajapati")
    const extractedValue = await client.get('Name')
    console.log(extractedValue)
    
    // A key can be deleted like this, this .del method returns the number of thingys it deleted when it was ran, it should always be one 
    const deleteCount = await client.del("Name")
    console.log(deleteCount)
    const extractedValue2 = await client.get('Name')
    console.log(extractedValue2)

    console.log("--------------------------------------")
    
    // Basic increment decrement Operations
    await client.set("count",200)
    const incrementCount = await client.incr('count')
    console.log(incrementCount)
    const incrementCount2 = await client.incrBy('count', 24)
    console.log(incrementCount2)
    
    console.log("--------------------------------------")


    


  }
  catch(e){
    console.log("Error connecting to Redis", e)
  }
  finally{
    await client.quit()
  }
}

testRedis()