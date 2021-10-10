// General imports
import { compare as bcompare } from 'bcrypt';
import { sanitize } from 'string-sanitizer';
import jwt from 'jsonwebtoken';

// Module imports
import { modules } from "../../../database/index.js";

// Hot tokens
const ledger = []

export function newsession(req, res) {

    const user = {
        username: sanitize(req.body.username),
        password: req.body.password
    }

    if (!user.username || !user.password) {
        return res.sendStatus(401);
    }

    modules.User.findOne({ where: { username: user.username }}).then((t) => {
        if (t === null) return res.sendStatus(401);

        bcompare(user.password, t.password).then((t, e) => {
            if (e || !t) return res.sendStatus(401);

            const data = {
                time: new Date().valueOf(),
                user: user.username
            }
            
            const token = {
                access: jwt.sign(data, process.env.JWT_ACC_SIG, {expiresIn: '20s'}),
                refresh: jwt.sign(data, process.env.JWT_REF_SIG, { expiresIn: '10m'})
            }

            ledger.push({
                user: data.user,
                token: token.refresh
            });

            return res.cookie("access-token", token.access, {httpOnly: true})
                      .cookie("refresh-token", token.refresh, {httpOnly: true})
                      .sendStatus(200);
            
        });
    }).catch(() => {
        res.sendStatus(204);
    });
}

export function valsession(req, res) {
    
    const acctoken = req.cookies["access-token"];

    jwt.verify(acctoken, process.env.JWT_ACC_SIG, (e, t) => {
        if (e) return res.sendStatus(401);
        
        const data = {
            time: new Date().valueOf(),
            user: t.user
        }

        return res.json(data);
    });
}

export function refsession(req, res) {

    const reftoken = req.cookies["refresh-token"];

    jwt.verify(reftoken, process.env.JWT_REF_SIG, (e, t) => {

        let d = false;
        ledger.map((m) => {
            if (m.token == reftoken) {
                d = true;
            }
        });

        if (e || !d) return res.sendStatus(401);

        const token = jwt.sign({
            time: new Date().valueOf(),
            user: t.user
        }, process.env.JWT_ACC_SIG, {
            expiresIn: '20s'
        })
        
        return res.cookie('access-token', token, {httpOnly: true})
                  .sendStatus(200);
    });
}

export function getuser(req, res) {
    const tokens = req.cookies;

    jwt.verify(tokens["access-token"], process.env.JWT_ACC_SIG, (e, t) => {
        if (e || t.user == undefined) return res.sendStatus(401);

        res.json({
            time: new Date().valueOf(),
            user: t.user
        });
    });
}

export function clearsession(req, res) {
    res.clearCookie("access-token")
       .clearCookie("refresh-token")
       .sendStatus(200);
}