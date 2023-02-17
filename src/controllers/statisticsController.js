import ExpensivesModel from "../models/expensivesModel.js";
import SneakerModel from "../models/sneakerModel.js";

/* fonction permettant d'obtenir tous les ventes par mois/par année
@req : requête
@res: réponse
@return : liste des ventes
*/
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

/* fonction permettant d'obtenir tous les achats par mois/par année
@req : requête
@res: réponse
@return : liste des achats
*/
const getBuyingStats = async (req, res) => {
  const buying = await SneakerModel.find(
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
  res.status(200).json(buying);
};

/* fonction permettant d'obtenir le nombre d'achat total par mois
@req : requête
@res: réponse
@return : nb d'achat total
*/
const getSumBuyingStats = async (req, res) => {
  const type = "$" + req.params.type;
  const sales = await SneakerModel.aggregate(
    [
      {
        $match: {
          $and: [
            {
              $expr: {
                $eq: [{ $year: req.params.data === "buys" ? "$buyingDate" : "$sellingDate" }, Number(req.params.year)],
              },
            },
            {
              $expr: {
                $eq: [{ $month: req.params.data === "buys" ? "$buyingDate" : "$sellingDate" }, Number(req.params.month)],
              },
            },
          ],
        },
      },
      { $group: { _id: type, count: { $sum: 1 } } },
    ]
  );
  res.status(200).json(sales);
};

/* fonction permettant d'obtenir le nombre de dépense total par mois
@req : requête
@res: réponse
@return : nb de dépense total
*/
const getExpensivesStats = async (req, res) => {
  const expensive = await ExpensivesModel.find(
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
  res.status(200).json(expensive);
};

/* fonction permettant d'obtenir la somme des achats/ventes/dépenses
@req : requête
@res: réponse
@return : nombre
*/
const getSums = async (req, res) => {
  const model =
    req.params.data === "expensives" ? ExpensivesModel : SneakerModel;
  const date =
    req.params.data === "sneakersBuying"
      ? "$buyingDate"
      : req.params.data === "sneakersSelling"
      ? "$sellingDate"
      : "$date";

  const price =
    req.params.data === "sneakersBuying"
      ? "$buyingPrice"
      : req.params.data === "sneakersSelling"
      ? "$resellPrice"
      : "$price";
  const sales = await model.aggregate(
    req.params.type === "month"
      ? [
          {
            $match: {
              $and: [
                {
                  $expr: { $eq: [{ $year: date }, Number(req.params.year)] },
                },
                {
                  $expr: {
                    $eq: [{ $month: date }, Number(req.params.month)],
                  },
                },
              ],
            },
          },
          { $group: { _id: null, sum: { $sum: price } } },
        ]
      : req.params.type === "year"
      ? [
          {
            $match: {
              $expr: { $eq: [{ $year: date }, Number(req.params.year)] },
            },
          },
          { $group: { _id: null, sum: { $sum: price } } },
        ]
      : {
          $expr: { $eq: ["$sold", true] },
        }
  );
  res.status(200).json(sales);
};

export { getSalesStats, getBuyingStats, getSumBuyingStats, getExpensivesStats, getSums };
