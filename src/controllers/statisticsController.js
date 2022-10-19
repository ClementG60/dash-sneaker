import ExpensivesModel from "../models/expensivesModel.js";
import SneakerModel from "../models/sneakerModel.js";

const getStats = async (req, res) => {
  const model = req.params.data === "expensive" ? ExpensivesModel: SneakerModel ;
  const sales = await model.find(
    req.params.type === "month"
      ? {
          $and: [
            { $expr: { $eq: ["$sold", true] } },
            { $expr: { $eq: [{ $year: "$sellingDate" }, req.params.year] } },
            { $expr: { $eq: [{ $month: "$sellingDate" }, req.params.month] } },
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
    .select("name websiteId sellingDate resellPrice resellWebsiteId");
  res.status(200).json(sales);
};

export { getStats };
