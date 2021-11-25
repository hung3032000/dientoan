require('dotenv').config();

module.exports = {
    aws_access_key_id: process.env.aws_access_key_id || "ASIAQMYHQNBV5IPKR6J6",
    aws_secret_access_key: process.env.aws_secret_access_key || "Sz9FPiPR+Xg+z2j56mFYLMW2tdFA8pWvSObXmkxB",
    aws_session_token: process.env.aws_session_token || '',
    region: process.env.region || "us-east-1"
}