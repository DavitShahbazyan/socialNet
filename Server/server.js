const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
const postsdb = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function isRegisterAuthenticated({ email }) {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
}

function getUser({ email }) {
  return userdb.users.find((user) => user.email === email);
}

server.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, email, password, } = req.body;

  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    res.status(200).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(200).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    let last_item_id = data.users.length;

    data.users.push({
      id: last_item_id + 1,
      firstName,
      lastName,
      email,
      password,
    });

    let writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(200).json({ status, message });
        return;
      }
    });
  });
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});


// LOGIN ///-------------------------
server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";

    setTimeout(() => {
      res.status(200).json({ status, message });
    }, 2000);
    return;
  }

  const user = getUser({ email });

  const access_token = createToken({ email, password });
  setTimeout(() => {
    res.status(200).json({
      user,
      access_token
    });
  }, 2000);
});

server.get("/api/login", (req, res) => {

  setTimeout(() => {
    res.status(200).json(postsdb.posts);
  }, 2000);
});


server.listen(5000, () => {
  console.log("Running Social Network Server");
});
