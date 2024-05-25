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

export function countClusters(data) {
  let clusterCounts = {
    Cluster0: 0,
    Cluster1: 0,
    Cluster2: 0,
    Cluster3: 0,
  };

  data.forEach((item) => {
    if (item.Cluster === 0) {
      clusterCounts.Cluster0++;
    } else if (item.Cluster === 1) {
      clusterCounts.Cluster1++;
    } else if (item.Cluster === 2) {
      clusterCounts.Cluster2++;
    } else if (item.Cluster === 3) {
      clusterCounts.Cluster3++;
    }
  });

  return [
    clusterCounts.Cluster0,
    clusterCounts.Cluster1,
    clusterCounts.Cluster2,
    clusterCounts.Cluster3,
  ];
}
