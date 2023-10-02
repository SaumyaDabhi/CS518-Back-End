var nodemailer = require('nodemailer');

const handleSignin = (db, bcrypt) => async(req, res) => {
  const { email, password } = req.body;
  if (!email || !password ) {
    return res.status(400).json('incorrect form submission');
  }

  const otp = Math.floor(Math.random() * 9000 + 1000);

  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'smart-brain-123@outlook.com',
      pass: 'smartbrain1'
    }
  });
  
  var mailOptions = {
    from: 'smart-brain-123@outlook.com',
    to: email,
    subject: 'Your One-Time Password',
    text: otp.toString()
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  /* db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
      })
    .catch(err => res.status(400).json('wrong credentials'))
} */

  try {
    // Retrieve the login entry based on the provided email
    const loginEntry = await db('login').select('hash').where('email', email).first();

    const isValid = bcrypt.compareSync(password, loginEntry.hash);

    if (!loginEntry) {
      return res.status(404).json({ error: 'Invalid email' });
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Update the token for the login entry
    await db('login').where('email', email).update('token', otp);

    // Retrieve all entries from the login table
    const allEntries = await db('login').select('*').where('email', email);
  
    return res.json(allEntries[0]);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  handleSignin: handleSignin
}
