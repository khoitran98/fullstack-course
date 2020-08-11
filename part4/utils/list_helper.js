const dummy = (blogs) => {
    // ...
    return 1
}
const totalLikes = (list) => {
    return list[0].likes
}

const favoriteBlog = (list) => {
    let blog = {}
    let max = 0
    list.forEach(element => {
        if (element.likes > max)
        {
            blog = element
            max = element.likes
        }
    })
    return blog
}
const mostBlogs = (list) => {
    let name = ''
    let count = 0
    let map = new Map()
    list.forEach(element => {
        if (map.has(element.author))
        {
            let x = map.get(element.author)
            map.set(element.author, x + 1)
        }
        else
            map.set(element.author, 1)
    })
    const calculate = (v, k) => {
        if (v >= count)
        {
            count = v
            name = k
        }
    }
    map.forEach(calculate)
    let res = {
        author: name,
        blogs: count
    }
    return res
}
const mostLikes = (list) => {
    let name = ''
    let count = 0
    let map = new Map()
    list.forEach(element => {
        if (map.has(element.author))
        {
            let x = map.get(element.author)
            map.set(element.author, x + element.likes)
        }
        else
            map.set(element.author, element.likes)
    })
    const calculate = (v, k) => {
        if (v >= count)
        {
            count = v
            name = k
        }
    }
    map.forEach(calculate)
    let res = {
        author: name,
        likes: count
    }
    return res
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}