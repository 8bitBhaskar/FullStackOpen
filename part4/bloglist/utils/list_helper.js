const lodash = require('lodash')

const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, savedBlog) => sum + savedBlog.likes, 0)

const favoriteBlog = (blogs) =>{
    if (blogs.length === 0){
        return null
    }

    const mostLikes = blogs.reduce((prev,curr)=>{
        return prev.likes > curr.likes ? prev : curr
    })

    return {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    }
}


const mostBlogs = (blogs) =>{
    if(blogs.length === 0){
        return null
    }
    
    const authorCount = lodash.countBy(blogs,'author');

    const biggestAuthor = Object.keys(authorCount).reduce((a,b) => {
        return authorCount[a] > authorCount[b] ? a:b;
    })

    return {
        author: biggestAuthor,
        blogs: authorCount[biggestAuthor]
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    const likesCount = lodash(blogs).groupBy('author').map((objs,key)=>({
        author:key,
        likes: lodash.sumBy(objs,'likes')
    }))

    return likesCount.reduce((a,b) => {
        return a.likes > b.likes ? a : b
    })
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}