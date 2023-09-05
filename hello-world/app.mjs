const firehose = new (require('aws-sdk/clients/firehose'))({ region: 'us-east-1' })
const uuid = require('uuid');

const tenants = ["meli", "tdnube", "ebaymtors"]

export const lambdaHandler = async (event, context) => {
    try {
        for (let i = 0; i < 10; i++) {
            record = generateRandomRecord();
            streamToKinesis(record);
        }
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

function streamToKinesis(record) {
    console.log(record)
    var params = {
        Record: { Data: JSON.stringify(record) },
        DeliveryStreamName: "myDeliveryStream"
    };

    firehose.putRecord(params, function (err, data) {
        if (err) {
            console.error("couldn't stream", err.stack);
        }
        else {
            console.log("INFO - successfully sent record to firehose");
        }
    });

}

function generateRandomRecord() {
    var now = new Date().toISOString()

    var record = {
        id: uuid.v1(),
        created: now,
        tenant: tenants.random,
        change: "changed attrib Name value: xxx to yyy"
    }

    return record;
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}