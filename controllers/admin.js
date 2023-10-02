const handleAdmin = (req, res, db) => {
    db('login')
  .select('*')
  .then((records) => {
    res.json(records);
    console.log(records);
  })
  .catch((error) => {
    console.error(error);
  })
}
  
module.exports = {
    handleAdmin
}