const Router = require("express").Router;
const Users = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();
const sign = require("../jwt").sign;

//Check if User
const requireUser = (req, res, next) => {
  if (req.user) next();
  else
    res.status(401).send({
      message: "Please login"
    });
};

// All users, only for testing.
router.get("/users", requireUser, (req, res) => {
  const users = Users.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({ message: "There was a server error" });
    });
});

// Get a user by id
router.get("/users/:id", requireUser, (req, res) => {
  const userId = req.params.id;
  const users = Users.findById(userId)
    .then(user => {
      if (user) {
        res.status(201);
        res.send({
          id: user.id,
          email: user.email,
          username: user.info.username,
          location: user.info.location,
          age: user.info.age,
          preferences: [],
          jwt: sign(user.id)
        });
      } else {
        res.status(404);
        res.json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Something went wrong`,
        err
      });
    });
});

// Create a new user
// http post http :4002/users email="bob@example.com" password=alice
router.post("/users", (req, res) => {
  const user = {
	  email: req.body.email,
	  password: bcrypt.hashSync(req.body.password, 10)
  }
  Users
  .create(user)
  .then(entity => {
  	res.send({
  		id: entity.id,
  		email: entity.email
  	})
  })
  .catch(err => {
  	console.error(err)
  	res.status(500).send({
  		message: 'Something went wrong'
  	})
  })
});

// Update User
//http put :4002/users/1 put users
router.put('/users/:id', requireUser, (req, res) => {
    const usersId = Number(req.params.id)
    const updates =  {
			info: req.body.preferences,
		}

  Users.findById(req.params.id)
    .then(entity => {
      if (entity) {
        return entity.update(updates);
      } else {
        res.status(404);
        res.json({ message: "User not found, can't update." });
      }
    })
    .then(final => {
      // return update
      res.status(200);
      res.send(final);
    })
    .catch(error => {
      res.status(500);
      res.json({
        message: "There was an error. No update."
      });
    });
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(entity => {
      if (bcrypt.compareSync(req.body.password, entity.password)) {
        res.send({
          id: entity.id,
          jwt: sign(entity.id),
          email: entity.email,
          message: "You logged in successfully"
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

router.delete('/users/:id', requireUser, (req, res) => {
  const userId = Number(req.params.id)
  Users.findById(req.params.id)
  .then(entity => {
    return entity.destroy()
  })
  .then(_ => {
    res.send({
      message: 'The user was deleted succesfully'
    })
  })
  .catch(error => {
    res.status(500).send({
      message: `Something went wrong`,
      error
    })
  })
})

module.exports = router;
