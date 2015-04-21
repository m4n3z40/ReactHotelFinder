/**
 * Normalizes image urls, for images that contains spaces or other unsuported special character in its url
 * 
 * @param  {string} imageUrl
 * @return {string}
 */
function normalizeImageUrl(imageUrl) {
	var imageUrlSegments = imageUrl.split('/'),
		imageName = imageUrlSegments.pop();

	imageUrlSegments.push(encodeURIComponent(imageName));

	return imageUrlSegments.join('/');
}

module.exports = {
	normalizeImageUrl: normalizeImageUrl
};