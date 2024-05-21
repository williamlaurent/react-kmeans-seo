// Fungsi untuk menghasilkan dataset acak dengan rentang tertentu
function generateRandomData(numPoints, minX, maxX, minY, maxY) {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    data.push([x, y]);
  }
  return data;
}

// Fungsi untuk menghitung jarak antara dua titik
function euclideanDistance(point1, point2) {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }
  return Math.sqrt(sum);
}

// Fungsi untuk menghitung pusat baru dari sebuah cluster
function calculateCentroid(cluster) {
  const centroid = new Array(cluster[0].length).fill(0);
  for (let i = 0; i < cluster.length; i++) {
    for (let j = 0; j < cluster[i].length; j++) {
      centroid[j] += cluster[i][j];
    }
  }
  return centroid.map((coord) => coord / cluster.length);
}

// Fungsi untuk mengelompokkan data ke cluster yang sesuai
function assignToClusters(data, centroids) {
  const clusters = new Array(centroids.length).fill().map(() => []);
  for (let i = 0; i < data.length; i++) {
    let minDistance = Infinity;
    let closestCluster = -1;
    for (let j = 0; j < centroids.length; j++) {
      const distance = euclideanDistance(data[i], centroids[j]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = j;
      }
    }
    clusters[closestCluster].push(data[i]);
  }
  return clusters;
}

// Fungsi untuk menghitung KMeans clustering
function kMeans(data, k, maxIterations = 100) {
  // Inisialisasi centroid secara acak
  let centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push(data[Math.floor(Math.random() * data.length)]);
  }

  let iteration = 0;
  let prevCentroids;
  // Lakukan iterasi hingga centroid tidak berubah atau mencapai iterasi maksimum
  while (!prevCentroids || !centroidsEqual(prevCentroids, centroids)) {
    prevCentroids = centroids.slice();
    const clusters = assignToClusters(data, centroids);
    centroids = clusters.map((cluster) => calculateCentroid(cluster));
    iteration++;

    // Menampilkan jumlah perulangan dan cluster untuk setiap perulangan
    console.log(`Iterasi ${iteration}:`);
    for (let i = 0; i < clusters.length; i++) {
      console.log(`Cluster ${i}:`);
      console.log(clusters[i]);
    }
    console.log("---------------------------------------");

    if (iteration >= maxIterations) break;
  }

  return {
    centroids,
    clusters: assignToClusters(data, centroids),
  };
}

// Fungsi untuk memeriksa apakah dua set centroid sama
function centroidsEqual(centroids1, centroids2) {
  if (!centroids1 || !centroids2 || centroids1.length !== centroids2.length)
    return false;
  for (let i = 0; i < centroids1.length; i++) {
    for (let j = 0; j < centroids1[i].length; j++) {
      if (centroids1[i][j] !== centroids2[i][j]) return false;
    }
  }
  return true;
}

// Number of data points
const numPoints = 50;

// Generate random dataset with more variation
const data = generateRandomData(numPoints, 0, 100, 0, 100);

// Number of clusters
const k = 4;

// Run KMeans clustering
const { centroids, clusters } = kMeans(data, k);
