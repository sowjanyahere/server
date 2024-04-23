let outcomeDataModel = require("../models/outcomesData");
let outcomesDataController = {
  apiHome: function (req, res) {
    res.status(200).send({
      status: true,
      message: "Hello World"
    });
  },

    getfinacialclassData: async function(req,res){
      try {
        let result = await outcomeDataModel.distinct("financialClass");
        res.status(200).send({
          status: true,
          FinancialClass: result,
        });
      } catch (error) {
        res.status(500).send({
          status: false,
          message: "server error",
          error,
        });
      }
    },
   
    getPatientDatamonthlyofYear_2024: async function (req,res){
        try {
            const patientcount_2024 = await outcomeDataModel.aggregate([
                    {
                      $project: {
                        month: { $month: "$admitDate" },
                        year: { $year: "$admitDate" }
                      }
                    },
                    {
                      $match: {
                        year: 2024 // Specify the desired year here
                      }
                    },
                    {
                      $group: {
                        _id: { month: "$month" },
                        count: { $sum: 1 }
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        month: "$_id.month",
                        count: 1
                      }
                    },
                    {
                      $sort: {
                        month: 1 // Sort by month in ascending order
                      }
                    }
                  ]);
                  
            res.json(patientcount_2024);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    } ,

    getPatientDatamonthlyofYear_2023: async function (req,res){
        try {
            const patientcount_2023 = await outcomeDataModel.aggregate([
                    {
                      $project: {
                        month: { $month: "$admitDate" },
                        year: { $year: "$admitDate" }
                      }
                    },
                    {
                      $match: {
                        year: 2023 // Specify the desired year here
                      }
                    },
                    {
                      $group: {
                        _id: { month: "$month" },
                        count: { $sum: 1 }
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        month: "$_id.month",
                        count: 1
                      }
                    },
                    {
                      $sort: {
                        month: 1 // Sort by month in ascending order
                      }
                    }
                  ]);
                  
            res.json(patientcount_2023);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },

    getFanacialcalssofyear: async function (req,res){
        try {
            const requestedYear = parseInt(req.params.year);
            const financialClass = req.params.financialClass;
        const fanacialYearCount = await outcomeDataModel.aggregate([
            {
              $match: {
                "financialClass": financialClass, // Replace with the desired financialClass
                "admitDate": {
                    $gte: new Date(requestedYear, 0, 1),
                    $lt: new Date(requestedYear + 1, 0, 1),
                } 
              }
            },
            {
              $project: {
                month: { $month: "$admitDate" },
                year: { $year: "$admitDate" },
                financialClass: 1
              }
            },
            {
              $match: {
                year: requestedYear // Replace with the desired year
              }
            },
            {
              $group: {
                _id: { month: "$month", financialClass: "$financialClass" },
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                month: "$_id.month",
                financialClass: "$_id.financialClass",
                count: 1
              }
            },
            {
              $sort: {
                month: 1 // Sort by month in ascending order
              }
            }
          ])
          res.json(fanacialYearCount)
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },

    getST_2023: async function (req,res){
      try {
        const requestedYear = parseInt(req.params.year);
        const financialClass = req.params.financialClass;
    const ST_2023 = await outcomeDataModel.aggregate([
      {
        '$match': {
          'admitDate': {
            '$gte': new Date('Sun, 01 Jan 2023 00:00:00 GMT'), 
            '$lt': new Date('Mon, 01 Jan 2024 00:00:00 GMT')
          }
        }
      }, {
        '$unwind': '$goal'
      }, {
        '$unwind': '$goal'
      }, {
        '$project': {
          'admitDate': 1, 
          'goal': 1
        }
      }, {
        '$match': {
          'goal.goalType': 'Short Term'
        }
      }, {
        '$group': {
          '_id': {
            '$month': '$admitDate'
          }, 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ])
      res.json(ST_2023);
    } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    getST_2024: async function (req,res){
      try {
    const ST_2024 = await outcomeDataModel.aggregate([
      {
        '$match': {
          'admitDate': {
            '$gte': new Date("2024-01-01T00:00:00.000Z"), 
            '$lt': new Date("2024-01-01T00:00:00.000Z")
          }
        }
      }, {
        '$unwind': '$goal'
      }, {
        '$unwind': '$goal'
      }, {
        '$project': {
          'admitDate': 1, 
          'goal': 1
        }
      }, {
        '$match': {
          'goal.goalType': 'Short Term'
        }
      }, {
        '$group': {
          '_id': {
            '$month': '$admitDate'
          }, 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ])
      res.json(ST_2024);
    } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

};

module.exports = outcomesDataController;
