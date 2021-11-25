const config = require("./config/config");
const aws = require("aws-sdk");
const crypto = require('crypto');

aws.config.update({
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_secret_access_key,
    region: config.region,
    sessionToken: config.aws_session_token
})
const docClient = new aws.DynamoDB.DocumentClient({});

const getAll = async (tableName, expressAttName, expressAttValue, filerExpress) => {
    try {
        let params = {
            TableName: tableName
        };
        if (expressAttName && expressAttValue){
            params.ExpressionAttributeNames = expressAttName;
            params.ExpressionAttributeValues = expressAttValue;
            params.FilterExpression = filerExpress;
        }
        const results = await docClient.scan(params).promise().then(res => res.Items);
        return results;
    } catch (e) {
        console.log("e:",e);
        return null;
    }
}

const getDetail = async (tableName, keyId, value) => {
    try {
        const params = {
            TableName: tableName,
            Key: {
                [keyId]: value
            }
        };
        const result = await docClient.get(params).promise().then(res => res.Item);
        return result;
    } catch (e) {
        console.log("e:",e);
        return null;
    }
}

const postData = async (tableName, keyId, value, data) => {
    try {
        const params = {
            TableName: tableName,
            Item: {
                [keyId]: value,
                ...data
            }
        };
        const result = await docClient.put(params).promise();
        return result;
    } catch (e) {
        console.log("e:",e);
        return null;
    }
}


const deleteData = async (tableName, keyId, value) => {
    try {
        const params = {
            TableName: tableName,
            Key: {
                [keyId]: value,
            }
        };
        console.log({ params})
        const result = await docClient.delete(params).promise();
        return result;
    } catch (e) {
        console.log("e:",e);
        return null;
    }
}

const dynamoService = {
    getAll,
    getDetail,
    postData,
    deleteData
}

module.exports = {
    dynamoService
}

module.exports.encodeData = async (payload) => {
    let payloadJsonStr = JSON.stringify(payload);
    let payloadInBase64 = Buffer.from(payloadJsonStr).toString('base64');
    let SECRET_KEY = 'secret_key@!';
    let hmac = crypto.createHmac('sha384', SECRET_KEY);
    hmac.update(payloadInBase64);
    let hashedPayload = hmac.digest('hex');
    return hashedPayload
}

module.exports.validateEncodeData = async (payload, payloadCompared) => {
    let payloadJsonStr = JSON.stringify(payload);
    let payloadInBase64 = Buffer.from(payloadJsonStr).toString('base64');
    let SECRET_KEY = 'secret_key@!';
    let hmac = crypto.createHmac('sha384', SECRET_KEY);
    hmac.update(payloadInBase64);
    let hashedPayload = hmac.digest('hex');
    return hashedPayload === payloadCompared;
}
const jwt = require("jsonwebtoken");

module.exports.authorizerToken = (req, res, next) => {
    // console.log(req.headers)
    let token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) return res.json({
        code: 400,
        message: "Lỗi định danh",
    });
    try {
        let decoded = jwt.verify(token, 'jwt_secret_key');
        req.user = decoded
        next();
        return;
    } catch (error) {
        console.log(error)
        return res.json({
            code: 403,
            message: "Lỗi định danh",
            err: error
        })
    }
    
}