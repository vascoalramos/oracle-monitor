const repository = require("../repositories/patients");

module.exports.findAll = async (req, res) => {
    let result = await repository.findAll();
    res.status(200).json(result.rows);
};
