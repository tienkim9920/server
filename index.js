require("dotenv").config();
const express = require('express')
const app = express()
const http = require('http').Server(app);

const cors = require("cors");

var upload = require('express-fileupload');
const port = 8000

const ProductAPI = require('./API/Router/product.router')
const UserAPI = require('./API/Router/user.router')
const OrderAPI = require('./API/Router/order.router')
const Detail_OrderAPI = require('./API/Router/detail_order.router')
const CommentAPI = require('./API/Router/comment.router')
const CategoryAPI = require('./API/Router/category.router')
const NoteAPI = require('./API/Router/note.router')

const ProductAdmin = require('./API/Router/admin/product.router')
const CategoryAdmin = require('./API/Router/admin/category.router')
const Order = require('./API/Router/admin/order.router')
const Coupon = require('./API/Router/admin/coupon.router')
const Sale = require('./API/Router/admin/sale.router')

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://minhhieu:ZPCKa1ZMZfiAOe7w@cluster0.hrvuv.mongodb.net/Clothes?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database ')
})
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });


app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/Product', ProductAPI)
app.use('/api/User', UserAPI)
app.use('/api/Payment', OrderAPI)
app.use('/api/Comment', CommentAPI)
app.use('/api/Note', NoteAPI)
app.use('/api/DetailOrder', Detail_OrderAPI)
app.use('/api/Category', CategoryAPI)

app.use('/api/admin/Product', ProductAdmin)
app.use('/api/admin/Category', CategoryAdmin)
app.use('/api/admin/Order', Order)
app.use('/api/admin/Coupon', Coupon)
app.use('/api/admin/Sale', Sale)


http.listen(port, () => {
  console.log('listening on *: ' + port);
});