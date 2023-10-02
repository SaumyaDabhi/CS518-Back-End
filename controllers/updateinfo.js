const handleInfo = (req, res, db) => {
    const { email, name } = req.body;
    db('login').where('email', email)
    .update({ name: name })
    .then(() => {
      res.json('name updated successfully');
    })
    .catch(error => {res.json('Error updating name:', error)})
}
  
module.exports = {
    handleInfo
}