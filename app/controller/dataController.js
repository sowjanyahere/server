let dataModel = require('../models/Data');

let dataController = {
    apiHome: function (req, res) {
        res.status(200).send({
          status: true,
          message: "Hello World"
        });
      },

    getDataTypes: async function (req, res) {
        try {
          let result = await dataModel.find();
          res.status(200).send({
            status: true,
            meal_type: result,
          });
        } catch (error) {
          res.status(500).send({
            status: false,
            message: "server error",
            error,
          });
        }
      },

      getYearData: async function (req, res) {
        try {
          let result = await dataModel.aggregate(
            [
                {
                    $group:
                    {
                        _id:
                        {
                            year: { $year: "$orderDate" }
                        }, 
                        count: { $sum:1 }
                    }
                }
            ]);
            let finalYearObject = result.map((item) => {
              return { year:item._id.year,
               count:item.count
             }
             });
          res.status(200).send({
            status: true,
            yearlyData: finalYearObject,
          });
        } catch (error) {
          res.status(500).send({
            status: false,
            message: "server error",
            error,
          });
        }
      },
      getMonthData: async function (req, res) {
        try {
          let result = await dataModel.aggregate(
            [
              {
                $group: 
                {
                    _id:
                    {
                        month: { $month: "$orderDate" }
                    }, 
                    count: { $sum:1 }
                }
            }, 
            {
                $sort: {"_id.month": 1}
            }
                
            ]);
            let finalMonthObject = result.map((item) => {
             return { month:item._id.month,
              count:item.count
            }
            });
          res.status(200).send({
            status: true,
            monthlyData: finalMonthObject,
          });
        } catch (error) {
          res.status(500).send({
            status: false,
            message: "server error",
            error,
          });
        }
      },
      
    getoutcomeData: async function (req, res) {
      try {
        let result = await dataModel.find();
        res.status(200).send({
          status: true,
          outcome: result,
        });
      } catch (error) {
        res.status(500).send({
          status: false,
          message: "server error",
          error,
        });
      }
    },
}

module.exports = dataController;