function StoriesNotFoundException() {
	this.status = 200;
	this.message = 'No stories posted';
}
function PostStoryException() {
	this.status = 400;
	this.message = 'Could not post story';
}
module.exports = {
	StoriesNotFoundException,
	PostStoryException,
};
