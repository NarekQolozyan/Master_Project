const { Company } = require('../models');
const bcrypt = require("bcrypt")
const salt = 10
const {generateAccessToken} = require("../midlleware/generateToken")

async function register_company(req,res){
    const {name,email,password} = req.body;
    
    if( !name || !email || !password){
        res.send("Please fill all field (fiestName,lastName & password).")
    }
    const company = await Company.findOne({ where: { name }});
    if (company) {
        return res.status(400).json({ error: "Please take another username" });
      }
    bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error hashing password' });
          }
          Company.create({
            name,
            email,
            password: hash
          })
            .then(company => {
              res.status(200).json({ message: 'Company created successfully' });
            })
            .catch(err => {
              res.status(500).json({ error: 'Error creating company' });
            });
    })
}
async function login_company(req,res){

    const { name, email, password } = req.body
    if( !name || !email || !password){
        res.send("Please fill all field (fiestName,lastName & password).")
    }

    const company = await Company.findOne({ where: { name }});
    if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
    const validPassword = await bcrypt.compare(password, company.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }
    
      const token = generateAccessToken(company.name, company.role);
      res.json({ status: "Logged in", company, jwt: token });

}
function getAll(req,res){
    Company.findAll()
    .then(companies =>  res.json(companies))  
    .catch(err =>  res.status(500).json({ error: err.message }));
}

module.exports = {
    register_company,
    login_company,
    getAll
}