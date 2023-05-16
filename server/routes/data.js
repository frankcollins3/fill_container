const data = (req, res) => {
    console.log("in the server firing the data { } function ")
    res.json( { friend: 'friends'} )
}

module.exports = data;