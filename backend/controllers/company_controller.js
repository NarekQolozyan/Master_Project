const { Company } = require('../models');
const bcrypt = require('bcrypt');
const salt = 10;
const {generateAccessToken} = require("../midlleware/generateToken")
const upload = require("../midlleware/upload")

async function register_company(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please fill all fields (name, email, and password).' });
  }

  const company = await Company.findOne({ where: { name } });
  if (company) {
    return res.status(400).json({ error: 'Please choose another username' });
  }

  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error uploading photo' });
      }

      const photoPath = req.file ? req.file.path : '';
      console.log(photoPath);

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error hashing password' });
        }

        Company.create({
          name,
          email,
          password: hash,
          image: photoPath,
        })
          .then(() => {
            res.status(200).json({ message: 'Company created successfully' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Error creating company' });
          });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating company' });
  }
}

async function login_company(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send('Please fill all fields (name, email, and password).');
  }

  const company = await Company.findOne({ where: { name } });
  if (!company) {
    return res.status(400).json({ error: 'Company not found' });
  }
  const validPassword = await bcrypt.compare(password, company.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = generateAccessToken(company.name, company.role);
  res.json({ status: 'Logged in', company, jwt: token });
}

async function updateCompany(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (name) company.name = name;
    if (email) company.email = email;
    if (password) company.password = await bcrypt.hash(password, salt);

    await company.save();

    res.status(200).json({ status: 'Company updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating company' });
  }
}

function getAll(req, res) {
  Company.findAll()
    .then((companies) => res.json(companies))
    .catch((err) => res.status(500).json({ error: err.message }));
}

async function addCompanyProfile(req, res) {
  try {
    upload.single('profilePhoto')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'Error uploading profile picture' });
      } else if (err) {
        return res.status(500).json({ error: 'Error uploading profile picture' });
      }

      const { id } = req.params;
      const profilePicture = req.file.path;

      console.log(id);

      const company = await Company.findOne({ where: { id: id } });

      if (!company) {
        return res.status(404).json({ error: 'User not found' });
      }

      company.image = profilePicture;
      await company.save();

      res.status(200).json({ message: 'Profile picture added successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading profile picture' });
  }
}

module.exports = {
  register_company,
  login_company,
  updateCompany,
  addCompanyProfile,
  getAll,
};
