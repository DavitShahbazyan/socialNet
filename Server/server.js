import fs from 'fs';
import express from 'express';
import jwt from 'jsonwebtoken'
import cors from 'cors';

const app = express();

app.use(express.json({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}))

const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
const postsdb = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));

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

app.post("/api/auth/register", (req, res) => {
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
app.post("/api/auth/login", (req, res) => {
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

app.get("/api/posts", (req, res) => {
  setTimeout(() => {
    res.status(200).json(postsdb.posts);
  }, 500);
});

app.get("/api/allusers", (req, res) => {
  setTimeout(() => {
    res.status(200).json(userdb.users);
  }, 500);
});

app.post('/api/posts', (req, res) => {
  const { createdDate, imgUrl, content, createdBy, createdById } = req.body
  let postsData = {}
  fs.readFile("./posts.json", (err, data) => {
    postsData = JSON.parse(data.toString());

    postsData.posts.unshift({
      id: Date.now(),
      imgUrl,
      content,
      createdDate,
      createdBy,
      createdById,
      likes: [],
      comments: []
    })
    const writeData = fs.writeFile("./posts.json", JSON.stringify(postsData), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(200).json({ status, message });
        return;
      }
    });
    res.status(200).json(postsData);
  })
})

app.post('/api/comment', (req, res) => {
  let postsData = {}
  const {
    commentsById,
    commentsByName,
    content,
    id,
    postId
  } = req.body;


  fs.readFile("./posts.json", (err, data) => {
    postsData = JSON.parse(data.toString());

    postsData.posts.forEach(post => {
      if (post.id === postId) {
        post.comments.push({
          commentsById,
          commentsByName,
          content,
          id,
          postId
        })
      }
    });
    fs.writeFile("./posts.json", JSON.stringify(postsData), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(200).json({ status, message });
        return;
      }
    });
    res.status(200).json(postsData);
  })

})

app.post('/api/postLike', (req, res) => {
  let postsData = {}
  const {
    userFullName,
    userId,
    postId
  } = req.body;

  fs.readFile("./posts.json", (err, data) => {
    postsData = JSON.parse(data.toString());

    postsData.posts.forEach(post => {
      if (post.id === postId) {
        if (post.likes.length === 0) {
          post.likes.push({
            userFullName,
            userId,
          })
        } else {
          for (let i = 0; i < post.likes.length; i++) {
            if (post.likes[i].userId === userId) {
              post.likes.splice(i, 1);
              break;
            } else if (i === post.likes.length - 1) {
              post.likes.push({
                userFullName,
                userId,
              })
              break;
            }
          }
        }
      }
    });

    fs.writeFile("./posts.json", JSON.stringify(postsData), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(200).json({ status, message });
        return;
      }
    });
    res.status(200).json(postsData);
  })

})

app.post('/api/uploadProfilePicture', (req, res) => {
  let currentUser = {}
  const {
    avatar,
    userId,
  } = req.body;

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(200).json({ status, message });
      return;
    }

    data = JSON.parse(data.toString());



    data.users.forEach(user => {
      if (user.id === userId) {
        user.avatar = avatar;
        currentUser = user;
      }
    });

    let writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(200).json({ status, message });
        return;
      }
    });

    res.status(200).json({ currentUser, allUsers: data });
  });
})

app.listen(5000, () => {
  console.log("Running Social Network Server");
});
