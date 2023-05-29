const { User } = require('../models');
const bcrypt = require("bcrypt")
const salt = 10
const {generateAccessToken} = require("../midlleware/generateToken")
const { registerValidator } = require("../validation.js") 
const upload = require("../midlleware/upload")

async function register_user(req,res){
    const {firstName,lastName,password} = req.body;
    const { error } = registerValidator(req.body);
    if (error) {
        return res.status(400).send( "Please enter a valid firstName,lastName & password (firstName & lastName must have a minumum 3 letter length and the password must have a minimum 8 letter length" );
      }
    if( !firstName || !lastName || !password){
        res.send("Please fill all field (fiestName,lastName & password).")
    }
    const user = await User.findOne({ where: { firstName }});
    if (user) {
        return res.status(400).json({ error: "Please take another username" });
      }
    bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error hashing password' });
          }
          User.create({
            firstName: firstName,
            lastName: lastName,
            password: hash
          })
            .then(user => {
              res.status(200).json({ message: 'User created successfully' });
            })
            .catch(err => {
              res.status(500).json({ error: 'Error creating user' });
            });
    })
}
async function login_user(req,res){

    const { firstName, lastName, password } = req.body
    if( !firstName || !lastName || !password){
        res.send("Please fill all field (fiestName,lastName & password).")
    }

    const user = await User.findOne({ where: { firstName }});
    if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
    const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }
    
      const token = generateAccessToken(user.firstName, user.role);
      res.json({ status: "Logged in", user, jwt: token });

}
function getAll(req,res){
    User.findAll()
    .then(users =>  res.json(users))  
    .catch(err =>  res.status(500).json({ error: err.message }));
}

async function addUserProfile(req, res) {
  try {
    upload.single('profilePicture')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'Error uploading profile picture' });
      } else if (err) {
        return res.status(500).json({ error: 'Error uploading profile picture' });
      }

      const { userId } = req.body;
      const profilePicture = req.file.path;

      // Update the user record with the profile picture path
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user record with the profile picture path
      user.image = profilePicture;
      await user.save();

      res.status(200).json({ message: 'Profile picture added successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading profile picture' });
  }
}

async function updateUser(req,res){
  const { firstName, lastName, password } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user properties
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) user.password = await bcrypt.hash(password, salt);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
}
module.exports = {
    register_user,
    login_user,
    getAll,
    updateUser,
    addUserProfile
}