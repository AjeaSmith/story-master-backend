function UserExistException(message) {
	const error = new Error(message);
	error.code = 409;
	return error;
}
function ProfileNotFoundException(message) {
	const error = new Error(message);
	error.code = 404;
	return error;
}
function ProfileUpdateException(message) {
	const error = new Error(message);
	error.code = 400;
	return error;
}
function AccountRemoveException(message) {
	const error = new Error(message);
	error.code = 400;
	return error;

	
}
module.exports = {
	UserExistException,
	ProfileNotFoundException,
	ProfileUpdateException,
	AccountRemoveException,
};
