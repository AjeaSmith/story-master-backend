const express = require('express');
const { validate } = require('../../middleware/validations');
const router = express.Router();
const UserService = require('./UserService');
const passport = require('passport');

router.post('/:storyId/comment/add', validate, async (req, res) => {

});
router.delete('/:commentId', async (req, res) => {

})

module.exports = router;
