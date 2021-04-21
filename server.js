const express = require("express");
const fetch = require("node-fetch");
require('dotenv')

const app = express();

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
          res.send({data:exist, status: false});
      }else{
          res.send({status:true});
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => console.log("Listening on port: " + port));
