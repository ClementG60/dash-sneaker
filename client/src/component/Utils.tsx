//fonction permettant d'afficher une date dans le bon format
const dateParser = (date: string | undefined) => {
  //const options:object = { hour: "2-digit", minute: "2-digit", weekday: "long", year: "numeric", month: "short", day: "numeric" };
  //on passe la date au format fr
  let newDate: string = "";
  if (typeof date === "string") {
    //on crée un timestamp de notre date
    const timestamp: number = Date.parse(date);
    newDate = new Date(timestamp).toLocaleDateString("fr-FR");
  } else if (typeof date === "undefined") {
    newDate = "Pas de date.";
  }

  return newDate;
};

const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export { dateParser, isEmpty };
