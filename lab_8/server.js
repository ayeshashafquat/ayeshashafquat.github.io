const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
  const baseURL = 'https://api.umd.io/v0/courses/list';
  courses = []
  fetch(baseURL)
    .then(r => r.json())
    .then(r => r.map(c => c.name))
    .then(name => {
      fetch(baseURL)
        .then(r => r.json())
        .then(r => r.filter(c => c.dept_id))
        .then(dept_id => {
          for(let i=0; i<dept_id.length; i+=1) {
            if(dept_id[i]==="INST") {
              courses += dept_id[i] + "\n"
            }
          }
           console.log(courses);
           res.send({ courses: courses })
        .catch((err) => {
         console.log(err);
         res.redirect('/error'); 
        });
      });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
