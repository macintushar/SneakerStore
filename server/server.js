const {Configuration, OpenAIApi} = require('openai');

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = 5001;

const supabaseUrl = 'https://tixdemwfyezgfnyypdqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGRlbXdmeWV6Z2ZueXlwZHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyODA2MTEsImV4cCI6MTk4ODg1NjYxMX0.44tg_UE1mSUfzGeN8_oZsybgmwTvwFnosvqNaVzK_sQ';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.get('/data', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
  
  if (error) {
    res.status(500).send(error);
    console.error(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }
});

app.get('/datas/ids', async (req, res) => {
  const { data, error } = await supabase
  .from('products')
  .select('product_id,product_name, sku')
  .order('product_id', {ascending:true})

  if (error) {
    res.status(500).send(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }
});


app.get('/data/asc', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order("current_price", {ascending: true});
  
  if (error) {
    res.status(500).send(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }
});

app.get('/data/desc', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order("current_price", {ascending: false});
  
  if (error) {
    res.status(500).send(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }
});

app.get('/searches', async (req,res) => {
  const { data, error } = await supabase
    .from('shoes')
    .select()
    .like('brand_name','N%')
    .order('product_id', {ascending:true})

    console.log(data)

    if (error) {
      res.status(500).send(error);
    } 
    
    else {
      res.json(data);
    }
  });

app.get('/search', async (req,res) => {
  var search = req.body.search;
  console.log(search);

  const configuration = new Configuration( {apiKey: "API KEY"} );
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "user", 
        "content": "Read the following sentence and convert it into a JSON object and make sure to highlight keywords like brand, shoe_name, color and size. Do not return any \. Input: " + search}
  ]});
    
  var ansGPT = await completion.data.choices[0].message["content"];
  
  res.json(ansGPT);
  });

app.get('/shoe/:shoe', async (req, res) => {
  var name = req.params.shoe;
  const { data, error } = await supabase
    .from('products')
    .select('*, inventory(size)')
    .eq('sku', name)

  console.log(data)

  if (error) {
    res.status(500).send(error);
  } 
  
  else {
    res.json(data);
  }
});

app.get('/size/:shoe', async (req, res) => {
  var name = req.params.shoe;
  const { data, error } = await supabase
    .from('inventory')
    .select('size')
    .eq('sku',name)

  console.log(data)

  if (error) {
    res.status(500).send(error);
  } 
  
  else {
    res.json(data);
  }
});

app.get('/shoe/quantity/:id', async (req,res) => {

  var sku = req.params.id;
  console.log(sku)
  const {data, error} = await supabase
    .from('inventory')
    .select('quantity')

  if (error) {
    res.status(500).send(error);
    console.error(error)
  } 
  
  else {
    res.send(data);
    console.log("Qty:"+JSON.stringify(data))
  }
});


app.post('/checkout', async (req, res) => {
  var card_number = req.body.cardnumber;
  var expiry = req.body.expiry;
  var cvc = req.body.cvc;
  var wallet_address = req.body.wallet_address;

  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;

  var cart = req.body.cart;
  var user_id = req.body.user_id;

  console.log(card_number,expiry,cvc)
  console.log(name,email,phone,address,city,state,zip)
  console.log(cart, user_id)

  var totalAmount = 0;

  for(let i=0; i<cart.length; i++) {
    console.log(cart[i].price)
    totalAmount = totalAmount + cart[i].price;

    console.log("Total Amount:", totalAmount);
  }

  var user_id = await createUser(name,email,phone,address)
  console.log(user_id)

  var buyer_id = await createBuyer(user_id);
  console.log(buyer_id)

  var order_id = await createOrder(totalAmount, buyer_id, address, city, state, zip)
  console.log(order_id)

  var payment_id = await MakePayment(card_number,expiry,cvc,wallet_address, order_id);
  console.log(payment_id)

  var order_details = await addOrderDetails(cart, order_id)
  res.status(200).send([{"order_id":order_id}])
});

async function createUser(name,email,phone,address) {
  const { data, error } = await supabase
  .from('users')
  .upsert({ "user_type":"Buyer", "username":name, "password":"password", "email":email, "phone":phone, "name":name, "address":address }, {ignoreDuplicates: false, onConflict: "email"})
  .eq("email",email)
  .select("user_id")

  if(!error) {
    var user_id = data[0].user_id;
    return user_id;
  } 
  
  else {
    console.error(error)
  }
}

async function createBuyer(user_id) {
  const { data, error } = await supabase
  .from('buyers')
  .upsert({ "user_id":user_id }, {ignoreDuplicates: false, onConflict: "user_id"})
  .eq("user_id",user_id)
  .select("buyer_id")

  if(!error) {
    var buyer_id = data[0].buyer_id;
    return buyer_id;
  } 
  
  else {
    console.error(error)
  }
}

async function MakePayment(card,expiry,cvc,wallet, order_id) {

  const { data, error } = await supabase
  .from('payment')
  .upsert({ card:card, expiry:expiry, cvc:cvc, wallet_address:wallet, order_id:order_id })
  .eq('order_id', order_id)
  .select('payment_id')

  if(!error) {
    var payment_id = data[0].payment_id;
    return payment_id;
  } 
  
  else {
    console.error(error)
  }

}

async function createOrder(total_amount, buyer_id, address, city, state, zip) {
  const { data, error } = await supabase
  .from('orders')
  .insert({ total_amount: total_amount, buyer_id: buyer_id, address: address, city: city, state: state, zip: zip })
  .select("order_id")

  if(!error) {
    var order_id = data[0].order_id;
    return order_id;
  } 
  
  else {
    console.error(error)
  }
}

async function addOrderDetails(cart,order_id) {

  for(let i=0; i<cart.length; i++) {
    console.log(cart[i].sku, order_id)
    const { data, error } = await supabase
    .from('product_order')
    .insert({ sku: cart[i].sku, order_id:order_id, quantity:cart[i].quantity })

    if(!error) {
      console.log("Done")
    } 
    
    else {
      console.error(error)
    }
  }
  return({"message":"Order Placed!", "order_id":order_id})
}

app.get('/order/:id', async (req, res) => {
  var oid = req.params.id;

  var resp = [];
  var products = [];

  var orderDetail = await orderDetails(oid);

  resp = orderDetail;

  for(let x = 0; x<orderDetail.length; x++) {
    console.log(orderDetail[x].sku);
    var details = await productDetails(orderDetail[x].sku);
    details = details[0];
    products.push(details);
    
    var cur_price = details.current_price
    var ori_price = details.original_price
    var discount = ori_price - cur_price;

    details.discount = discount;
    orderDetail[x].product = details;
  }

  console.log(products)
  res.json(resp);

});

async function orderDetails(oid){
  const { data, error } = await supabase
  .from('product_order')
  .select('*, orders(total_amount, buyer_id, order_date, address, city, state, zip)')
  .eq("order_id", oid)

  if (error) {
    return error
  } 
  
  else {
    
    return data
  }
}

async function productDetails(sku){
  const { data, error } = await supabase
  .from('products')
  .select('product_name,current_price, original_price')
  .eq("sku", sku)

  if (error) {
    return error
  } 
  
  else {
    return data
  }
}

app.post('/login', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  const { data, error } = await supabase
    .from('users')
    .select('user_id')
    .eq('email',email)
    .eq('password', password)
  
  if (error) {
    res.send(error);
  } 
  
  else {
    if(data.length>0) {
      res.json(data[0]);
      console.log(data)
    }
    else {
      res.json("User not found")
    }
  }
});

app.get('/user/:id', async (req, res) => {
  var uid = req.params.id;

  let { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('user_id', uid)

  if(data) {
    console.log(data)
    res.json(data)
  }

  if(error) {
    console.error(error)
  }
});

app.get('/user/orders/:id', async (req, res) => {
  var uid = req.params.id;
  var buyerID = await fetchBuyerID(uid)

  let { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('buyer_id', buyerID)
  .order('order_id', {ascending: true})

  if(data) {
    console.log(data)
    res.json(data)
  }

  if(error) {
    console.error(error)
  }
});

async function fetchBuyerID(uid) {
  let { data, error } = await supabase
  .from('buyers')
  .select('buyer_id')
  .eq('user_id', uid)

  if(data) {
    try {
      console.log(data[0].buyer_id)
      return data[0].buyer_id
    } 
    catch (error) {
      console.error(error)
    }
  }

  if(error) {
    console.error(error)
  }
}

app.post('/admin/login', async (req,res) => {
  let formData = req.body;
  console.log(formData);

  var email = formData.email;
  var pwd = formData.password;

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pwd
  })

  if (error) {
    res.json(error);
    console.log(error);
  } 
  
  else {
    const session_token = {"token":data.session.access_token};
    res.json(session_token);
    console.log(session_token)
  }

});

app.post('/sign-up', async (req,res) => {
  let formData = req.body;
  console.log(formData);

  var email = formData.email;
  var pwd = formData.password;

  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: pwd
  })

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(200);
    console.log(data)
  }

});

app.get('/admin/sign-up', async (req,res) => {
  let { data, error } = await supabase.auth.signUp({
    email: 'tusharselvakumar@gmail.com',
    password: 'Tusharsk911'
  })

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(200);
    console.log(data)
  }

});

app.get('/admin/manage/home', async (req,res) => {

  var openOrders = await OpenOrders();
  var shippedOrders = await ShippedOrders();
  var deliveredOrders = await DeliveredOrders();
  var totalRevenueSum = await TotalRevenue();

  var deets = {
    "open":openOrders.length,
    "shipped":shippedOrders.length,
    "delivered":deliveredOrders.length,
    "total":totalRevenueSum
  }

  res.send(deets)

});

async function OpenOrders() {
  const { data, error } = await supabase
  .from('orders')
  .select('order_id')
  .eq('status','Unfulfilled')

  if (error) {
    return error;
  } 
  
  else {
    return data;
  }
}

async function ShippedOrders() {
  const { data, error } = await supabase
  .from('orders')
  .select('order_id')
  .eq('status','Shipped')

  if (error) {
    return error;
  } 
  
  else {
    return data;
  }
}

async function DeliveredOrders() {
  const { data, error } = await supabase
  .from('orders')
  .select('order_id')
  .eq('status','Delivered')

  if (error) {
    return error;
  } 
  
  else {
    return data;
  }
}

async function TotalRevenue() {
  const { data, error } = await supabase
  .from('orders')
  .select('total_amount')

  if (error) {
    return error;
  } 
  
  else {
    return SumOfRevenue(data);
  }
}

function SumOfRevenue(total) {
  let sum = 0;
  for(let i=0; i<total.length; i++) {
    sum = sum + total[i].total_amount;
  }

  return sum
}

app.get('/admin/manage/products/all', async (req,res) => {
  const { data, error } = await supabase
  .from('products')
  .select('*')

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
  }

});

app.get('/admin/manage/products/edit/:id', async (req,res) => {
  var id = req.params.id;
  console.log(id)
  const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('product_id', id)

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.post('/admin/manage/products/edit/update/:id', async (req,res) => {
  console.log(req.body);
  let body = req.body;

  var pid = body.product_id;
  var name = body.product_name;
  var description = body.description;
  var image = body.image;
  var category = body.category;
  var sku = body.sku;
  var current_price = body.current_price;
  var original_price = body.original_price;
  var discount = body.discount;
  var brand = body.brand;
  var seller = body.seller;

  console.log(pid,name,description,image,category,sku,current_price,original_price,discount,brand,seller)

  const { data, error } = await supabase
  .from('products')
  .update([
    {
      product_name: name,
      description: description,
      image: image,
      brand: brand,
      category: category,
      seller_id: seller,
      sku: sku,
      height: "Low",
      current_price: current_price,
      original_price: original_price,
      discount: discount
    },
  ])
  .eq("product_id",pid)

  if(error) {
    res.json(error)
    console.error(error)
  }

  else{
    res.json(data)
    console.log(data)
  }

});

app.post('/admin/manage/products/new', async (req,res) => {
  console.log(req.body);
  let body = req.body;

  var name = body.product_name;
  var description = body.description;
  var image = body.image;
  var category = body.category;
  var sku = body.sku;
  var current_price = body.current_price;
  var original_price = body.original_price;
  var discount = body.discount;
  var brand = body.brand;
  var seller = body.seller;

  console.log(name,description,image,category,sku,current_price,original_price,discount,brand,seller)

  const { data, error } = await supabase
  .from('products')
  .insert([
    {
      product_name: name,
      description: description,
      image: image,
      brand: brand,
      category: category,
      seller_id: seller,
      sku: sku,
      height: "Low",
      current_price: current_price,
      original_price: original_price,
      discount: discount
    },
  ])

  if(error) {
    res.json(error)
    console.error(error)
  }

  else{
    res.json(data)
    console.log(data)
  }

});

app.get('/admin/manage/products/delete/:id', async (req,res) => {
  var id = req.params.id;
  console.log(id)
  const { data, error } = await supabase
  .from('products')
  .delete()
  .eq('product_id', id)

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.get('/admin/manage/inventory/all', async (req,res) => {
  const { data, error } = await supabase
  .from('inventory')
  .select('*')
  .order('inventory_id', {ascending: true})

  if (error) {
    res.json(error);
  } 
  
  else {
    console.log(data)
    res.json(data);
  }

});

app.get('/admin/manage/inventory/edit/:id', async (req,res) => {
  var id = req.params.id;
  console.log(id)
  const { data, error } = await supabase
  .from('inventory')
  .select('*')
  .eq('inventory_id', id)

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.post('/admin/manage/inventory/edit/update/:id', async (req,res) => {
  console.log(req.body);
  let body = req.body;
  var iid = req.params.id;

  var pid = body.product_id;
  var sku = body.sku;
  var size = body.size;
  var quantity = body.quantity;

  console.log(iid,pid,size,quantity,sku)

  const { data, error } = await supabase
  .from('inventory')
  .update({
      product_id:pid,
      inventory_id:iid,
      sku:sku,
      size:size,
      quantity:quantity
    })
  .eq('inventory_id', iid)

  if(error) {
    res.json(error)
    console.error(error)
  }

  else{
    res.json(data)
    console.log("//",data)
  }

});

app.post('/admin/manage/inventory/add/:id', async (req,res) => {
  console.log(req.body);
  let body = req.body;
  var pid = req.params.id;

  var sku = body.sku;
  var size = body.size;
  var quantity = body.quantity;

  console.log(pid,size,quantity,sku)

  const { data, error } = await supabase
  .from('inventory')
  .insert({
      product_id:pid,
      sku:sku,
      size:size,
      quantity:quantity
    })

  if(error) {
    res.json(error)
    console.error(error)
  }

  else{
    res.json(data)
    console.log("//",data)
  }

});

app.post('/admin/manage/products/new', async (req,res) => {
  console.log(req.body);
  let body = req.body;

  var name = body.product_name;
  var description = body.description;
  var image = body.image;
  var category = body.category;
  var sku = body.sku;
  var current_price = body.current_price;
  var original_price = body.original_price;
  var discount = body.discount;
  var brand = body.brand;
  var seller = body.seller;

  console.log(name,description,image,category,sku,current_price,original_price,discount,brand,seller)

  const { data, error } = await supabase
  .from('products')
  .insert([
    {
      product_name: name,
      description: description,
      image: image,
      brand: brand,
      category: category,
      seller_id: seller,
      sku: sku,
      height: "Low",
      current_price: current_price,
      original_price: original_price,
      discount: discount
    },
  ])

  if(error) {
    res.json(error)
    console.error(error)
  }

  else{
    res.json(data)
    console.log(data)
  }

});


app.get('/admin/manage/sellers/all', async (req,res) => {
  const { data, error } = await supabase
  .from('sellers')
  .select('*')

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.get('/admin/manage/sellers/users/all', async (req,res) => {
  const { data, error } = await supabase
  .from('sellers')
  .select('*, users(*)')

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.get('/admin/manage/sellers/users/edit/:id', async (req,res) => {
  var id = req.params.id;
  console.log(id);

  const { data, error } = await supabase
  .from('sellers')
  .select('*, users(*)')
  .eq('seller_id', id)

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.post('/admin/manage/sellers/users/edit/update/:id', async (req,res) => {
  var body = req.body;
  
  var sid = req.params.id;
  var company_name = body.company_name;
  var company_description = body.company_description;
  var uid = body.user_id;
  var username = body.users.username;
  var password = body.users.password;
  var email = body.users.email;
  var phone = body.users.phone;
  var name = body.users.name;
  var last_name = body.users.last_namee;
  var address = body.users.address;

  console.log("Body: "+ JSON.stringify(body))

  updateUsers(uid, username,password,email,phone,name,last_name,address)
  updateSellers(sid,company_name,company_description,uid)

});

app.get('/admin/manage/orders/all', async (req,res) => {
  const { data, error } = await supabase
  .from('orders')
  .select('*')
  .order('order_id', { ascending: true })

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.get('/admin/manage/orders/unfulfilled/:id', async (req,res) => {
  var id = req.params.id;
  
  const { data, error } = await supabase
  .from('orders')
  .update({ status: 'Unfulfilled' })
  .eq('order_id', id)


  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.get('/admin/manage/orders/delivered/:id', async (req,res) => {
  var id = req.params.id;
  
  const { data, error } = await supabase
  .from('orders')
  .update({ status: 'Delivered' })
  .eq('order_id', id)


  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.get('/admin/manage/orders/shipped/:id', async (req,res) => {
  var id = req.params.id;
  
  const { data, error } = await supabase
  .from('orders')
  .update({ status: 'Shipped' })
  .eq('order_id', id)


  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

async function updateSellers(sid,name,desc,uid) {
  const { error } = await supabase
  .from('sellers')
  .update({ company_name: name, company_description:desc, user_id:uid})
  .eq('seller_id', sid)

  if(error) {
    return error
  }

  else {
    return "Updated"
  }
}

async function updateUsers(uid,username,password,email,phone,name,addr) {
  const { error } = await supabase
  .from('users')
  .update(
    {
      username: username,
      password: password,
      email: email,
      phone: phone,
      name: name,
      address: addr
    }
  )
  .eq('user_id', uid)

  if(error) {
    return error
  }

  else {
    return "Updated"
  }
}

app.post('/admin/manage/sellers/new', async (req,res) => {
  console.log(req.body);
  let body = req.body;
  
  var name = body.name;
  var phone = body.phone;
  var email = body.email;

  const { data, error } = await supabase
  .from('sellers')
  .insert([
    { seller_name: name, phone: phone, email:email },
  ])

  if(error) {
    res.json(error)
  }

  else{
    res.json(data)
  }

});

app.get('/admin/manage/sellers/delete/:id', async (req,res) => {
  var id = req.params.id;
  console.log(id)
  const { data, error } = await supabase
  .from('sellers')
  .delete()
  .eq('seller_id', id)

  if (error) {
    res.json(error);
  } 
  
  else {
    res.json(data);
    console.log(data)
  }

});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
