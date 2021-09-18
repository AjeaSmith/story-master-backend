function UserExistException() {
	this.status = 409;
	this.message = 'User already exists';
}
function UserNotFoundException() {
	this.status = 404;
	this.message = 'User not found with credentials';
}
function ProfileNotFoundException() {
	this.status = 404;
	this.message = 'Profile does not exist';
}
function ProfileUpdateException() {
	this.status = 400;
	this.message = 'Could not update profile';
}
function AccountRemoveException() {
	this.status = 400;
	this.message = 'Could not remove account';
}
module.exports = {
	UserExistException,
	UserNotFoundException,
	ProfileNotFoundException,
	ProfileUpdateException,
	AccountRemoveException,
};
