function StoriesNotFoundException(message) {
	const error = new Error(message);
	error.code = 404;
	return error;
}
function PostStoryException(message) {
	const error = new Error(message);
	error.code = 400;
	return error;
}
module.exports = {
	StoriesNotFoundException,
	PostStoryException,
};
