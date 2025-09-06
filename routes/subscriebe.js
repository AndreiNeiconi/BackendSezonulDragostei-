const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
      subscribe_list: {
        1: {
          name: "jhone",
          email: "jhondon@gmail.com",
        },
        2: {
          name: "jhoned",
          email: "jhoneddon@gmail.com",
        },
      },
    });
})
router.get('/new', (res, req) => {
    req.render('index')
})

module.exports = router;