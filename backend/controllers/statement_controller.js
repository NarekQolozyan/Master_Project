const { Statement } = require('../models');
const { Company } = require("../models")

async function create_statement(req, res) {
  const { category, description, skills, salary, companyId} = req.body;
  
  try {
    const company = await Company.findOne({ where: { id: companyId } });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

  

      const photoPath = req.file ? req.file.path : '';

      const statement = await Statement.create({
        category,
        companyName: company.name,
        description,
        skills,
        salary,
        companyId,
        photo: photoPath 
      });

      res.status(200).json({ message: 'Statement created successfully', statement });
  } catch (err) {
    res.status(500).json({ error: 'Error creating statement' });
    console.log(err);
  }

}
  

function getAllStatement(req, res) {
  Statement.findAll()
    .then(statements => res.json(statements))
    .catch(err => res.status(500).json({ error: err.message }));
}

function update_statement(req, res) {
    const { id } = req.params;
    const { category, companyName, description, skills, salary  } = req.body;
    Statement.update(
      { category,companyName,description,skills,salary },
      { where: { id } }
    )
      .then((statement) => {
        res.json({ response: "updated" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
        console.log(err)
      });
  }


module.exports = {
  create_statement,
  getAllStatement,
  update_statement
}
