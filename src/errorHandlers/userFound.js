function UserFoundException() {
	this.status = 409;
	this.message = 'User already exists';
}
function UserNotFoundException() {
	this.status = 404;
	this.message = 'User not found with credentials';
}
module.exports = {
	UserFoundException,
	UserNotFoundException,
};
