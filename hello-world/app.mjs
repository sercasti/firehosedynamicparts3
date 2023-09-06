import { FirehoseClient, PutRecordCommand } from "@aws-sdk/client-firehose"; 
import { v4 as uuidv4 } from 'uuid';

const tenants = ["meli", "tdnube", "ebaymtors"]
const firehoseClient = new FirehoseClient({ region: "us-east-1" });

export const lambdaHandler = async (event) => {
    var params = {
        DeliveryStreamName: "myDeliveryStream",
        Record: {
          Data: "",
        },
    };
   
    for (let i=0; i<10; i++) {
      params.Record.Data = Buffer.from(JSON.stringify(generateRecord()));
      let input = new PutRecordCommand(params);
      try {
        let response = await firehoseClient.send(input);
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
        console.log("INFO - successfully sent record to firehose");
      } catch (error) {
        console.error("couldn't stream", error.stack);
      }
    }

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'done',
        })
    }
};

function generateRecord() {
    return {
        id: uuidv4(),
        created: new Date().toISOString(),
        tenant: tenants.random(),
        change: "changed attrib Name value: xxx to yyy"
    }
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}