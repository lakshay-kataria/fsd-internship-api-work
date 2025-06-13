const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/Product')

const app = express();

app.use(bodyParser.json());

mongoose.connect
    ( 
        'mongodb://localhost:27017/store' , 
        {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }
    ).then
    (
        () => console.log("connection to mongoDB is successful")
    ).catch
    (
        (err) => console.error(err)
    )


app.get( '/' , (req , res)=>
    {
        res.send('server is up and running')
    })


app.listen
    (
        '3000' , 
        () => console.log('server is up and running on PORT 3000') 
    );

    //api creation
    //create

    app.post
    (
        '/products' , async (req , res)=>
            {
                try
                {
                    const product = new Product(req.body)
                    await product.save();
                    res.status(201).send(product);
                }
                catch(err)
                {
                    res.status(500).send(err);
                }
            } 
    );

    //get
    app.get
    (
        '/products' , async(req , res)=>
        {
            try
            {
                const products = await Product.find();
                res.send(products);
            }
            catch(err)
            {
                res.status(500).send(err);
            }
        }
    );

    //get by id
    app.get
    (
        '/products/:id' , async(req , res)=>
        {
            try
            {
                const products = await Product.findById(req.params.id);
                res.send(products);
                if(!products)
                {
                    res.status(404).send('NOT FOUNND');
                }
            }
            catch(err)
            {
                res.status(500).send(err);
            }
        }
    );

    //update
    app.put(
        '/products/:id' , async(req , res)=>
        {
            try
            {
                const products = await Product.findByIdAndUpdate(req.params.id , req.body , {new:true});
                res.send(products);
            }
            catch(err)
            {
                res.status(500).send(err);
            }
        }
    )
    //delete

        app.put(
        '/products/:id' , async(req , res)=>
        {
            try
            {
                const products = await Product.findByIdAndDelete(req.params.id);
                res.send(products);
            }
            catch(err)
            {
                res.status(500).send(err);
            }
        }
    )