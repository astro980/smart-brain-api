const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) {  // if user exit post the info
                res.json(user[0]);
            } else { // else return not found
                res.status(400).json('Not found')
            }            
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet
}