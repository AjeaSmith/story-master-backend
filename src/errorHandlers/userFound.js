function UserFoundException() {
	this.status = 409;
	this.message = 'User already exists';
}
module.exports = {
	UserFoundException,
};
