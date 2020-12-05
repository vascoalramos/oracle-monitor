const repository = require("../repositories/beds");

let beds = [
    {
        BED_ID: 1,
        DESCRIPTION: "Cama 1",
        ROOM_ID: 1,
        STATE: 1,
    },
    {
        BED_ID: 2,
        DESCRIPTION: "Cama 2",
        ROOM_ID: 1,
        STATE: 0,
    },
];

module.exports.findAll = async (req, res) => {
    let result = await repository.findAll();

    // temporary
    result.rows = beds;

    res.status(200).json(result.rows);
};
