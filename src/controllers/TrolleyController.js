import { reset } from 'nodemon';
import { db } from '../setup/db.js';

const trolley = {
    postProduct: async function(req,res){
        const { costumer } = res.locals;
        const product = req.body;
        try{
            await db.collection('trolley-products').insertOne({...product, userId: costumer._id})
            res.sendStatus(200);
        }catch(error){
            console.log("[Error] - postProduct Trolley Controller");
            res.sendStatus(500);
        }
    },
    getProducts: async function(req,res){
        const { costumer } = res.locals;
        try{
            const costumerTrolley = await db.collection('trolley-products').find({userId: costumer._id},{projection:{_id:0, userId:0}}).toArray();
            if(!costumerTrolley){return res.sendStatus(401)};

            res.send(costumerTrolley);
        }catch(error){
            console.log("[Error] - getProducts Trolley Controller");
            res.sendStatus(500);
        }
    },
}