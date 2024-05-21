import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import Layout from "../../layout";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const Dataset = () => {
  const { dataset } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = dataset.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataset.length / ITEMS_PER_PAGE);

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Layout>
      <div className="flex justify-end mb-4 ">
        <Button size="sm" color="blue" onClick={() => navigate("/cluster")}>
          Proses
        </Button>
      </div>
      <Card className="w-full h-full overflow-scroll">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Keyword
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Currency
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Avg. Monthly Searches
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Perubahan Tiga Bulan
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Perubahan Tahun ke Tahun
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Competition
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Competition (Indexed Value)
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Top of Page Bid (Low Range)
                </Typography>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none uppercase opacity-70"
                >
                  Top of Page Bid (High Range)
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.Keyword}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.Currency}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item["Avg. monthly searches"]}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item["Perubahan tiga bulan"]}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item["Perubahan tahun ke tahun"]}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.Competition}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item["Competition (indexed value)"]}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item["Top of page bid (low range)"]}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item["Top of page bid (high range)"]}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-end p-4 mt-8 space-x-3">
        <Button
          size="sm"
          color="blue"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        <Button
          size="sm"
          color="blue"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </div>
    </Layout>
  );
};

export default Dataset;
