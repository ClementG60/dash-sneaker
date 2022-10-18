import ExpensivesModel from "../models/expensivesModel.js";
import SneakerModel from "../models/sneakerModel.js";

/*
const getSalesByMonth = async (req, res) => {
  const salesByMonth = await SneakerModel.find({
    $and: [
      {$expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] }},
      {$expr: { $eq: [{ $month: "$sellingDate" }, req.params.month] }}
    ]
  })
    .sort({ sellingDate: 1 })
    .select("name sellingDate resellPrice");
  res.status(200).json(salesByMonth);
};

const getSalesByYear = async (req, res) => {
  const salesByYear = await SneakerModel.find({
    $expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] },
  })
    .sort({ sellingDate: 1 })
    .select("name sellingDate resellPrice");
  res.status(200).json(salesByYear);
};

const getAllSales = async (req, res) => {
  const sales = await SneakerModel.find()
    .sort({ sellingDate: 1 })
    .select("name sellingDate resellPrice");
  res.status(200).json(sales);
};
*/
const getSales = async (req, res) => {
  const sales = await SneakerModel.find(
    req.params.type === "month" ? {
      $and: [
        {$expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] }},
        {$expr: { $eq: [{ $month: "$sellingDate" }, req.params.month] }}
      ]
    } : (
      req.params.type === "year" ? {
        $expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] },
      } : null
    )

  )
  .sort({ sellingDate: 1 })
  .select("name sellingDate resellPrice");
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
