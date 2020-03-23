const express = require("express");
const adminsLogic = require("../bll/admins-logic");

const router = express.Router();

// get all admins
router.get("/875sadf8sdfsdfsd5fsdfgsdf85sd", async (req, res) => {
    try {
        const admins = await adminsLogic.getAllAdmins();
        res.json(admins);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;