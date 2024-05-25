import { useState, useCallback } from "react";
import Layout from "../../layout";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import ToastNotification from "../../components/toast/toast-notification";
import { countClusters } from "../../utils/helper";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [message, setMessage] = useState(null);
  const [results, setResults] = useState([]);

  const { setDataset, setRawFile, rawFile, setResult, dataset, setCounts } =
    useAppContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const allowedFormats = ["xlsx", "xls", "csv"];
      const fileNameParts = file.name.split(".");
      const fileFormat = fileNameParts[fileNameParts.length - 1];

      if (!allowedFormats.includes(fileFormat)) {
        setMessage(
          "File yang diunggah harus berformat .xlsx, .xls, atau .csv."
        );
        setSelectedFileName("");
        return;
      }

      setRawFile(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        console.log(e.target.result);
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const rows = excelData.slice(1);
        const newDataset = {
          data: rows.map((row) => ({
            Keyword: row[0],
            "Avg. monthly searches": row[1],
            "Perubahan tiga bulan": row[2],
            "Perubahan tahun ke tahun": row[3],
            Competition: row[4],
            "Competition (indexed value)": row[5],
            "Top of page bid (low range)": row[6],
            "Top of page bid (high range)": row[7],
          })),
        };

        setMessage(null);
        setDataset(newDataset?.data);
        setSelectedFileName(file.name);
      };

      reader.readAsArrayBuffer(file);
    },
    [setDataset]
  );

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const toastId = ToastNotification.loading("Mengunggah file..."); // Store the returned toast ID

    try {
      const response = await axios.post("http://127.0.0.1:5000/cluster_data", {
        data: dataset,
      });
      console.log(response.data);
      setResults(response.data);
      setResult(response.data);
      setCounts(countClusters(response.data));
      console.log(countClusters(response.data));
      ToastNotification.dismiss(toastId);
      ToastNotification.success("File terunggah");
      navigate("/dataset");
    } catch (error) {
      console.error("Error uploading file:", error);
      ToastNotification.dismiss(toastId);
      ToastNotification.error("Error saat mengunggah file. Coba lagi.");
    }
  };

  const handleUpload = () => {
    if (rawFile) {
      uploadFile(rawFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      <div className="p-10">
        {message && <p className="mb-6 text-center text-red-500">{message}</p>}
        <div
          {...getRootProps()}
          className={`relative border border-gray-500 border-dashed p-20 cursor-pointer ${
            isDragActive ? "bg-gray-100" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <h4>
              {selectedFileName ? (
                <>
                  File terpilih:{" "}
                  <span className="font-semibold">{selectedFileName}</span>
                </>
              ) : isDragActive ? (
                "Lepaskan file untuk mengunggah"
              ) : (
                "Taruh file di sini untuk mengunggah"
              )}
              <br />
              atau
            </h4>
            <p>Klik untuk memilih file</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {selectedFileName && (
          <Button
            size="lg"
            color="blue"
            onClick={() => {
              handleUpload();
            }}
          >
            Lihat Dataset
          </Button>
        )}
      </div>
      <div>
        {results.length > 0 &&
          results.map((item, index) => (
            <div key={index}>
              <h2>{item.Keyword}</h2>
              <p>Avg. monthly searches: {item["Avg. monthly searches"]}</p>
              <p>Perubahan tiga bulan: {item["Perubahan tiga bulan"]}</p>
              <p>
                Perubahan tahun ke tahun: {item["Perubahan tahun ke tahun"]}
              </p>
              <p>Competition: {item.Competition}</p>
              <p>
                Competition (indexed value):{" "}
                {item["Competition (indexed value)"]}
              </p>
              <p>
                Top of page bid (low range):{" "}
                {item["Top of page bid (low range)"]}
              </p>
              <p>
                Top of page bid (high range):{" "}
                {item["Top of page bid (high range)"]}
              </p>
              <p>Cluster: {item.Cluster}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default HomePage;
