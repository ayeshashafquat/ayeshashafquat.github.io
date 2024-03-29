const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
  const baseURL = 'https://api.umd.io/v0/courses/list';
  fetch(baseURL)
    .then(r => r.json())
    .then(r => r.filter(c => {if (c.dept_id=="INST")return c.name}))
    .then((data) => {
           console.log(data);
           res.send({ data: data });
    })
        .catch((err) => {
         console.log(err);
         res.redirect('/error'); 
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
