const { Router } = require('express');
const router = Router();

router.route('/')
.get((req, res) => res.send('Products route.'))

module.exports = router;