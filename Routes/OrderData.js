const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = [...req.body.order_data]; // Create a copy of order_data
        data.splice(0, 0, { Order_date: req.body.order_date }); // Add order_date at the beginning of the array
        
        let eId = await Order.findOne({ 'email': req.body.email }); // Check if the email already exists
        console.log(eId);

        // If email doesn't exist, create a new order
        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            return res.status(200).json({ success: true });
        } 
        
        // If email exists, update the order by pushing new data
        await Order.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } }
        );
        return res.status(200).json({ success: true });
        
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error: " + e.message);
    }
});

router.post('/orderHistory/',async (req,res)=>{
    try {
        const userEmail=req.body.email
        const orderHistory=await Order.findOne({'email':userEmail})
        if(orderHistory!==null) {
            res.json({orderHistory:orderHistory.order_data})
        }else {
            res.json({orderHistory:[]})
        }
    } catch(e) {
        console.error("hi",e.message);
        res.status(500).send("Server Error " + e.message);
    }
})

module.exports = router;
