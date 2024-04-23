let outcomeDataModel = require("../models/outcomesData");
let outcomesDataController = {
  financialClass_yearly: async function (req, res) {
    const requestedYear = parseInt(req.params.year);
    try {
      const financialClassCounts = await outcomeDataModel.aggregate([
        {
          $match: {
            admitDate: {
              $gte: new Date(requestedYear, 0, 1),
              $lt: new Date(requestedYear + 1, 0, 1),
            },
          },
        },
        {
          $group: {
            _id: {
              financialClass: "$financialClass",
              year: { $year: "$admitDate" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            financialClass: "$_id.financialClass",
            year: "$_id.year",
            count: 1,
          },
        },
      ]);
      res.json(financialClassCounts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  financialClass_monthofyear: async function (req, res) {
    const requestedYear = parseInt(req.params.year);
    const requestedMonth = parseInt(req.params.month) - 1; // Subtract 1 because JavaScript months are zero-indexed

    try {
      const financialClassCounts = await outcomeDataModel.aggregate([
        {
          $match: {
            admitDate: {
              $gte: new Date(requestedYear, requestedMonth, 1),
              $lt: new Date(requestedYear, requestedMonth + 1, 1),
            },
          },
        },
        {
          $group: {
            _id: "$financialClass",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            financialClass: "$_id",
            count: 1,
          },
        },
      ]);
      res.json(financialClassCounts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  goal_types_yearly: async function (req, res) {
    const requestedName = req.params.name;

    try {
      const distinctGoalTypes = await outcomeDataModel.aggregate([
        {
          $match: {
            "firstName": requestedName, // Filter by the patient's first name
          }
        },
        {
          $unwind: "$goal" // Unwind the goal array
        },
        {
          $match: {
            "goal.startDate": { $exists: true } // Filter out documents without a start date for goals
          }
        },
        {
          $group: {
            _id: "$goal.goalType", // Group by goalType
            startDate: { $first: "$goal.startDate" } // Keep the first startDate for each goalType
          }
        },
        {
          $sort: {
            startDate: 1 // Sort by startDate in ascending order
          }
        }
      ])
      
      
      res.json(distinctGoalTypes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = outcomesDataController;
