const express = require("express");
const router = express.Router();
const outcomedata_type = require("../controller/outcomesDataController");

router.get("/", outcomedata_type.apiHome);
router.get("/finacialclassdata",outcomedata_type.getfinacialclassData);
router.get("/getPatientData_2024",outcomedata_type.getPatientDatamonthlyofYear_2024);
router.get("/getPatientData_2023",outcomedata_type.getPatientDatamonthlyofYear_2023)
router.get("/getFanacialyear/:financialClass/:year",outcomedata_type.getFanacialcalssofyear);
router.get("/getShortTerm2023",outcomedata_type.getST_2023);
router.get("/getShortTerm2024",outcomedata_type.getST_2024);


module.exports = router;
