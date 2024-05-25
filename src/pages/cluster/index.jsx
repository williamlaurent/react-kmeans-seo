import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";
import Layout from "../../layout";
import { useAppContext } from "../../context/AppContext";
import { convertToString } from "../../utils/helper";
import Pagination from "../../components/pagination";

const TABLE_HEAD = ["Keyword", "Cluster"];

const Cluster = () => {
  const navigate = useNavigate();
  const { result } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!result) {
      navigate("/");
    } else {
      console.log(result);
    }
  }, [result, navigate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = result
    ? result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = result ? Math.ceil(result.length / itemsPerPage) : 1;

  return (
    <Layout>
      <div className="flex justify-end mb-4">
        <Button size="sm" color="blue" onClick={() => navigate("/calculate")}>
          Lihat Perhitungan
        </Button>
      </div>
      <Card className="w-full h-full overflow-scroll">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                >
                  <Typography
                    type="small"
                    color="blueGray"
                    className="text-xs font-semibold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={`${item.Keyword}-${index}`}>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography color="blueGray" className="text-xs font-normal">
                    {item.Keyword}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    color="blueGray"
                    className="text-xs font-semibold"
                  >
                    {convertToString(item.Cluster)}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxPageNumbers={5}
      />
    </Layout>
  );
};

export default Cluster;
