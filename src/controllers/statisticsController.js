import ExpensivesModel from "../models/expensivesModel.js";
import SneakerModel from "../models/sneakerModel.js";

const getSales = async (req, res) => {
  const sales = await SneakerModel.find(
    req.params.type === "month" ? {
      $and: [
        {$expr: {$eq: ["$sold", true]}},
        {$expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] }},
        {$expr: { $eq: [{ $month: "$sellingDate" }, req.params.month] }}
      ]
    } : (
      req.params.type === "year" ? {
        $and: [
          {$expr: {$eq: ["$sold", true]}},
          {$expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] }}
        ]
      } : {
        $expr: {$eq: ["$sold", true]}
      }
    )

  )
  .sort({ sellingDate: 1 })
  .select("name sellingDate resellPrice resellWebsiteId");
  res.status(200).json(sales);
}
const getExpensivesByMonth = async (req, res) => {
  const expensivesByMonth = await ExpensivesModel.find({
    $and: [
      {$expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] }},
      {$expr: { $eq: [{ $month: "$sellingDate" }, req.params.month] }}
    ]
  })
    .sort({ sellingDate: 1 })
    .select("name sellingDate resellPrice");
  res.status(200).json(expensivesByMonth);
};

const getExpensivesByYear = async (req, res) => {
  const expensivesByYear = await ExpensivesModel.find({
    $expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] },
  })
    .sort({ sellingDate: 1 })
    .select("name sellingDate resellPrice");
  res.status(200).json(expensivesByYear);
};

const getAllExpensives = async (req, res) => {
  const expensives = await ExpensivesModel.find()
    .sort({ sellingDate: 1 })
    .select("name sellingDate resellPrice");
  res.status(200).json(expensives);
};

export { getSales };
