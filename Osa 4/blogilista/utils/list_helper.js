const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blogs) => sum + blogs.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((max, blogs) => (max.likes < blogs.likes ? blogs : max), blogs[0])
}

const mostBlogs = (blogList) => {
	let author = blogList.reduce(
		(acc, cur, index, arr) =>
			arr.filter((v) => v.author === acc.author).length >=
			arr.filter((v) => v.author === cur.author).length
				? acc
				: cur,
		blogList[0]
	).author

	let blogs = blogList.filter((blog) => blog.author === author).length

	return { author, blogs }
}

const mostLikes = (blogs) => {
	let allUniqueAuthors = [...new Set(blogs.map((blog) => blog.author))]

	let authorLikeCounts = new Map(
		allUniqueAuthors.map((author) => [
			author,
			blogs.reduce((sum, blogs) => (author === blogs.author ? sum + blogs.likes : sum), 0)
		])
	)

	let authorWithMostLikes = [...authorLikeCounts.entries()].reduce((prev, cur) =>
		cur[1] > prev[1] ? cur : prev
	)

	return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
