import ExpensivesModel from "../models/expensivesModel.js";
import SneakerModel from "../models/sneakerModel.js";

const getSalesStats = async (req, res) => {
  const sales = await SneakerModel.find(
    req.params.type === "month"
      ? {
          $and: [
            { $expr: { $eq: ["$sold", true] } },
            { $expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] } },
            {
              $expr: { $eq: [{ $month: "$sellingDate" }, req.params.month] },
            },
          ],
        }
      : req.params.type === "year"
      ? {
          $and: [
            { $expr: { $eq: ["$sold", true] } },
            { $expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] } },
          ],
        }
      : {
          $expr: { $eq: ["$sold", true] },
        }
  )
    .sort({ sellingDate: 1 })
    .select();
  res.status(200).json(sales);
};

const getBuyingStats = async (req, res) => {
  const sales = await SneakerModel.find(
    req.params.type === "month"
      ? {
          $and: [
            { $expr: { $eq: [{ $year: "$buyingDate" }, req.params.year] } },
            {
              $expr: { $eq: [{ $month: "$buyingDate" }, req.params.month] },
            },
          ],
        }
      : req.params.type === "year"
      ? {
          $and: [
            { $expr: { $eq: [{ $year: "$buyingDate" }, req.params.year] } },
          ],
        }
      : {}
  )
    .sort({ buyingDate: 1 })
    .select();
  res.status(200).json(sales);
};

const getExpensivesStats = async (req, res) => {
  const sales = await ExpensivesModel.find(
    req.params.type === "month"
      ? {
          $and: [
            { $expr: { $eq: [{ $year: "$date" }, req.params.year] } },
            {
              $expr: { $eq: [{ $month: "$date" }, req.params.month] },
            },
          ],
        }
      : req.params.type === "year"
      ? {
          $expr: { $eq: [{ $year: "$date" }, req.params.year] },
        }
      : {
          $expr: { $eq: ["$sold", true] },
        }
  )
    .sort({ sellingDate: 1 })
    .select();
  res.status(200).json(sales);
};

const getExpensivesSum = async (req, res) => {
  const sales = await ExpensivesModel.aggregate(
    req.params.type === "month"
      ? [
          {
            $match: {
              $and: [
                { $expr: { $eq: [{ $year: "$date" }, Number(req.params.year)] } },
                {
                  $expr: { $eq: [{ $month: "$date" }, Number(req.params.month)] },
                },
              ],
            },
          },
          { $group: { _id: null, sum: { $sum: "$price" } } },
        ]
      : req.params.type === "year"
      ? [
          {
            $match: {
              $expr: { $eq: [{ $year: "$date" }, Number(req.params.year)] },
            },
          },
          { $group: { _id: null, totalAmount: { $sum: "$price" } } },
        ]
      : {
          $expr: { $eq: ["$sold", true] },
        }
  );
  res.status(200).json(sales);
};

const getExpensives = async (req, res) => {
  const year = req.params.year;
  console.log(year);
  const sales = await ExpensivesModel.aggregate([
    {
      $match: {
        $and: [
          { $expr: { $eq: [{ $year: "$date" }, Number(req.params.year)] } },
          {
            $expr: { $eq: [{ $month: "$date" }, 10] },
          },
        ],
      },
    },
    { $group: { _id: null, sum: { $sum: "$price" } } },
  ]);
  res.status(200).json(sales);
};

export {
  getSalesStats,
  getBuyingStats,
  getExpensivesStats,
  getExpensivesSum,
  getExpensives,
};
