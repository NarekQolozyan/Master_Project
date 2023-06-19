const { Statement } = require('../models');
const { Company } = require("../models")
const upload = require("../midlleware/upload")

async function create_statement(req, res) {
  const { category, profession, description, skills, salary,companyId, jobType, photo, experience, location } = req.body;

  try {
    const company = await Company.findOne({ where: { id: companyId } });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    upload.single('photo')(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error uploading photo' });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      // const photoPath = req.file ? req.file.path : '';
      const photoPath = photo
      const statement = await Statement.create({
        category,
        companyName: company.name,
        profession,
        description,
        skills,
        salary,
        jobType,
        experience,
        location,
        companyId: company.id,
        image: photoPath
      });

      res.status(200).json({ message: 'Statement created successfully', statement });
    });
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

function getById(req, res) {
  const { id } = req.params;

  Statement.findOne({ where: { id } })
    .then(statement => {
      if (!statement) {
        return res.status(404).json({ error: 'Statement not found' });
      }

      res.json(statement);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

function update_statement(req, res) {
    const { id } = req.params;
    const { category, companyName, description, skills, salary  } = req.body;
    Statement.update(
      { category,companyName,profession,description,skills,salary },
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
  const delete_statement = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete the statement with the specified id
      await Statement.destroy({
        where: { id },
      });
      
      res.send('Deletion completed.');
    } catch (error) {
      console.error('Deletion failed:', error);
      res.status(500).send('Deletion failed.');
    }
  };

module.exports = {
  create_statement,
  getAllStatement,
  getById,
  update_statement,
  delete_statement
}
