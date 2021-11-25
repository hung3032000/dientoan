const express = require("express");
const router = express.Router();
const config = require("./config/config");
const utils = require("./utils");
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.json({
                code:400,
                message: "Thiếu thông tin đăng nhập."
            })
        }
        const user = await utils.dynamoService.getDetail("users", "username", username);
        if(!user || !user.password){
            return res.json({
                code: 400,
                message: "User không tồn tại"
            })
        }
        const checkPassword = await utils.validateEncodeData(password, user.password);
        if (!checkPassword){
            return res.json({
                code: 400,
                message: "Thông tin đăng nhập không chính xác"
            })
        }
        let payload = {
            username,
            ...user.extraData
        };
        let token = jwt.sign(payload, 'jwt_secret_key');
        return res.json({
            code: 200,
            token: token,
            ...user.extraData
        })
    }catch(err){
        return res.json({
            code: 500,
            message: "Thất bại.",
            err:err
        })
    }
})

router.post('/sign-up', async (req, res) => {
    try {
        const { username, password, ...rest } = req.body;
        if (!username || !password) {
            return res.json({
                code: 400,
                message: "Thiếu thông tin đăng nhập."
            })
        }
        const user = await utils.dynamoService.getDetail("users", "username", username);
        if (user) {
            return res.json({
                code: 400,
                message: "User đã tồn tại"
            })
        }
        const hashPwd = await utils.encodeData(password);
        let params = {
            password: hashPwd,
            extraData: rest
        }
        await utils.dynamoService.postData("users", "username", username, params)
        let payload = {
            username,
            ...rest
        };
        let token = jwt.sign(payload, 'jwt_secret_key');
        return res.json({
            code: 200,
            token: token
        })
    } catch (err) {
        return res.json({
            code: 500,
            message: "Thất bại.",
            err: err
        })
    }
})

router.get('/mon-hoc', async (req, res) => {
    try {
        const listMonhoc = await utils.dynamoService.getAll("mon-hoc");
        return res.json({
            code: 200,
            data: listMonhoc
        })
    } catch (err) {
        return res.json({
            code: 500,
            message: "Thất bại.",
            err: err
        })
    }
})

router.get('/dkhp', utils.authorizerToken, async (req, res) => {
    try {
        if (!req.user || !req.user.username) {
            return res.json({
                code: 400,
                message: "Lỗi định danh",
                err: err
            })
        }
        let expressAttName = {
            '#keyId': 'keyId'
        };
        let expressAttValue = {
            ':keyId': `${req.user.username}-`
        }
        let filerExpress = 'contains (#keyId, :keyId)'
        let promiseList = [
            utils.dynamoService.getAll("dkhp", expressAttName, expressAttValue, filerExpress),
            utils.dynamoService.getAll("mon-hoc")
        ];
        let [list, monHocList] = await Promise.all(promiseList);
        let monHocMap = {};
        if(monHocList && monHocList.length > 0){
            monHocMap = monHocList.reduce((obj, e) => {
                obj[e.monHocId] = e;
                return obj;
            }, {})
        }
        if (list && list.length > 0){
            list = list.map(dkhp => {
                let monHocId = dkhp.keyId ? dkhp.keyId.split('-')[1] : '';
                if(monHocId){
                    dkhp = {
                        ...dkhp,
                        ...monHocMap[monHocId]
                    }
                }
                return dkhp
            })
        }
        return res.json({
            code: 200,
            data: list
        })
    } catch (err) {
        return res.json({
            code: 500,
            message: "Thất bại.",
            err: err
        })
    }
})

router.post('/dkhp', utils.authorizerToken, async (req, res) => {
    try {
        let { monHoc, ...rest } = req.body;
        if(!req.user || !req.user.username){
            return res.json({
                code: 400,
                message: "Lỗi định danh",
                err: err
            })
        }
        if (!monHoc || monHoc.length < 1){
            return res.json({
                code: 400,
                message: "Thiếu thông tin đăng ký",
                err: err
            })
        }
        let promiseList = []
        monHoc.forEach(e => {
            let params = {
                ngayTao: (new Date()).toJSON(),
                monHocId: e,
                trangThai: 1,
                ...rest
            }
            promiseList.push(utils.dynamoService.postData("dkhp", "keyId", `${req.user.username}-${e}`, params))
        })
        if(promiseList.length > 0){
            await Promise.all(promiseList)
        }
        return res.json({
            code: 200,
            data: {}
        })
    } catch (err) {
        return res.json({
            code: 500,
            message: "Thất bại.",
            err: err
        })
    }
})

router.delete('/dkhp/:monHocId', utils.authorizerToken, async (req, res) => {
    try {
        let { monHocId } = req.params;
        if (!req.user || !req.user.username) {
            return res.json({
                code: 400,
                message: "Lỗi định danh",
                err: err
            })
        }
        if (!monHocId) {
            return res.json({
                code: 400,
                message: "Thiếu thông tin",
                err: err
            })
        }
        
        await utils.dynamoService.deleteData("dkhp", "keyId", `${req.user.username}-${monHocId}`)
        return res.json({
            code: 200,
            data: {}
        })
    } catch (err) {
        return res.json({
            code: 500,
            message: "Thất bại.",
            err: err
        })
    }
})

module.exports = router;