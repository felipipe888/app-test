var cors = require('cors')
const express = require("express");
const fetch = require("node-fetch");
require('dotenv')

const app = express();

app.use(cors())

const port = process.env.PORT || 3000

app.get('/', (req,res)=>res.send('Hello'))

app.get("/customer", (req, res) => {
  fetch("https://andres-test-gradiweb.myshopify.com/admin/api/2021-04/customers.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": "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",
    }  
    })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
    //   console.log("data returned:\n", data);
      let {customers} = data;

      let exist = customers.find((user)=>user.email === req.query.email)

      if(exist){
          res.send({data:exist, status: true});
      }else{
          res.send({status:false});
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


app.get("/discount/:id", (req, res) => {
  fetch(`https://mykabuto.com/admin/api/2021-04/discount_codes/lookup.json?code=${req.params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": "a91336d9d661d607f5233bbbaf55b2c5",
    }  
    })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      res.send({data});
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/price-rules/:id", (req, res) => {
  fetch(`https://mykabuto.myshopify.com/admin/api/2021-04/price_rules/${req.params.id}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": "a91336d9d661d607f5233bbbaf55b2c5",
    }  
    })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      res.send({data});
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/variants/:id", (req, res) => {
  fetch(`https://mykabuto.myshopify.com/admin/api/2021-04/products/${req.params.id}/variants.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": "a91336d9d661d607f5233bbbaf55b2c5",
    }  
    })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      res.send({data});
    })
    .catch((error) => {
      console.log(error);
    });
});



app.listen(port, () => console.log("Listening on port: " + port));
