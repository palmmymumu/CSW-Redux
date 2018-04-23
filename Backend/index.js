const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.listen(80);
app.use(cors()); // เรียกใช้ผ่านโดเมนอื่นได้
app.use(bodyParser.json()); // สำหรับอ่านข้อมูลจาก Axios
app.use(bodyParser.urlencoded({ extended: true })); // ให้ผู้ใช้ป้อนข้อมูลเข้ามาได้

// CRUD
// Create
// Read
// Update
// Delete

var Countries = [],
  Id = 1;

app.get('/api/countries', (req, res) => { // ดึงค่าประเทศทุกประเทศ
  res.send(Countries);
});

app.post('/api/countries', (req, res) => { // เพิ่มประเทศใหม่
  var name = req.body.name;

  Countries.push({
    id: Id++,
    name: name
  });
  res.send(Countries);
});

app.put('/api/countries/:country_id', (req, res) => { // อัพเดทประเทศจากไอดี
  var id = req.params.country_id,
     name = req.body.name;

  Countries.map(Country => {
    if (Country.id == id) {
      Country.name = name;
    }
  });
  res.send(Countries);
});

app.delete('/api/countries/:country_id', (req, res) => { // ลบประเทศจากไอดี
  var id = req.params.country_id,
    tmp = [];

  Countries.map(Country => {
    if (Country.id != id) {
      tmp.push(Country);
    }
  });
  Countries = tmp;
  res.send(Countries);
});
