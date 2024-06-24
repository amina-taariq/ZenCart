const myConnectionToDB = require("./db");
myConnectionToDB();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

// API creation

app.get("/", (req, res) => {
  res.send("Express app is Running")
});

// image storage engine

const storage = multer.diskStorage({                                                      // Configuración el almacenamiento en disco para los archivos subidos.
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({ storage: storage });                             // Se crea una instancia de multer utilizando la configuración de almacenamiento definida previamente.

// Crating endpoint for images
app.use("/images", express.static("upload/images"))                      // Se configura una ruta estática para acceder a los archivos subidos http://localhost:4000/images
app.post("/upload", upload.single("product"), (req, res) => {            // endpoint POST en /upload // upload.single("product"): Middleware de multer para manejar la subida de un solo archivo con el campo de formulario llamado product. 
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
      let last_product = products.slice(-1)[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Creating API for deleting products
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
      success: true,
      id: req.body.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Schema Creating for user Model
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default:Date.now,
  }
});
// Endpoint to register user
app.post('/signup', async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with the same email"
      });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: {}
    });

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to login user
app.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, errors: "Wrong Email address" });
    }

    const passMatch = req.body.password === user.password;
    if (!passMatch) {
      return res.json({ success: false, errors: "Wrong Password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint for new collections
app.get('/newCollections', async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection fetched");
    res.send(newcollection);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint for popular products in clothing
app.get('/popularproducts', async (req, res) => {
  try {
    let products = await Product.find({ category: 'clothing' });
    let popularproducts = products.slice(0, 4);
    console.log("Popularproducts fetched");
    res.send(popularproducts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: 'Please authenticate using a valid login' });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// Endpoint to add products to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    console.log("Added", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 0;
    }

    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    res.json({ message: "Added", cartData: userData.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to remove product from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
  try {
    console.log("Removed", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });

    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
      await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    }

    res.send("Removed");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
  try {
    console.log('Get Cart');
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Endpoint to clear the cart
app.post('/clearcart', fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData = {};
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error:", error);
  }
});
