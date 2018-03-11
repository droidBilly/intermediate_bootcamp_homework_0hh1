const Router = require("express").Router;
const router = new Router();
const Games = require("./model");

const requireUser = (req, res, next) => {
  if (req.user) next();
  else
    res.status(401).send({
      message: "Please login"
    });
};

router.post("/games", requireUser, (req, res) => {
  const games = {
	  board: req.body.board,
	  sidebar: req.body.sidebar,
    locked: req.body.locked,
    userId: req.user.id
  }
  Games
  .create(game)
  .then(entity => {
  	res.send({
  		gameId: entity.id,
  		board: entity.board,
  		sidebar: entity.sidebar,
  		locked: entity.locked,
      userId: entity.userId
  	})
  })
  .catch(err => {
  	console.error(err)
  	res.status(500).send({
  		message: 'Something went wrong'
  	})
  })
});

module.exports = router;
