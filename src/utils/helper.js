export const convertToString = (data) => {
  let string;
  switch (data) {
    case 0:
      string = "Tidak Direkomendasikan";
      break;
    case 1:
      string = "Cukup Rekomendasikan";
      break;
    case 2:
      string = "Rekomendasikan";
      break;
    case 3:
      string = "Sangat Rekomendasikan";
      break;
    default:
      string = "";
      break;
  }

  return string;
};

const TABLE_ROWS = [
  ["jual kopi", 5000, 0, 0, "Menengah", 49, "778,25", "4471,68"],
  ["ferratti ferro fcm 3605", 5000, 0, 0, "Tinggi", 98, "714,31", "6605,37"],
  ["jual kopi rube terdekat", 500, -0.9, -0.9, "Rendah", 30],
  ["jual mesin kopi", 500, 0, 0, "Tinggi", 100, "1381,10", "7266,99"],
  ["jual biji kopi", 500, 0, 0, "Rendah", 32, "933,90", "2711,92"],
  ["indotara mesin kopi", 500, 0, 0, "Tinggi", 86, "933,90", "12583,91"],
  ["kopi cleng asli", 5000, 0, 0, "Tinggi", 75, "466,95", "933,90"],
  ["tempat jual kopi rube terdekat", 500, 0, 0, "Rendah", 8],
];

// Function to convert Competition string values to numbers
function convertCompetitionToNumber(competitionString) {
  switch (competitionString) {
    case "Rendah":
      return 25;
    case "Menengah":
      return 50;
    case "Tinggi":
      return 75;
    case "Tidak diketahui":
      return 0;
    default:
      return 0;
  }
}

export function convertCompetitionPropertyToNumber(data) {
  return data.map((item) => {
    return {
      ...item,
      competition: convertCompetitionToNumber(item.Competition),
    };
  });
}

//Function cenvert data to numbers, check if it's not a number and convert it
export const convertDataToNumbers = (data) => {
  return data.map((item) => {
    const convertedItem = {};

    // Convert and check each attribute
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        let value = item[key];

        // Check if value is undefined, null, or not a number
        value =
          value === undefined || value === null || isNaN(value) ? 0 : value;

        // Convert value to number if it's not already a number
        if (typeof value !== "number") {
          value = parseFloat(value);
        }

        convertedItem[key] = value;
      }
    }

    return convertedItem;
  });
};
