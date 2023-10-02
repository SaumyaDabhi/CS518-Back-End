const handlePassword = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    const newPassword = bcrypt.hashSync(password);
    db('login').where('email', email)
    .update({ hash: newPassword })
    .then(() => {
      console.log('Password updated successfully');
    })
    .catch(error => {console.error('Error updating password:', error)})
}
  
module.exports = {
    handlePassword
}