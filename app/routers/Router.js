const express = require("express");
const router = express.Router();
const data_type = require("../controller/dataController");

router.get("/", data_type.apiHome);
// meals
router.get("/get-data-here", data_type.getDataTypes);
router.get("/get-yearly-data-here", data_type.getYearData);
router.get("/get-monthly-data-here", data_type.getMonthData);
router.get("/getoutcomeData", data_type.getoutcomeData);


module.exports = router;
