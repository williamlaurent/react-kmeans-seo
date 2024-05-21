import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";
import Layout from "../../layout";
import { useAppContext } from "../../context/AppContext";
import { convertToString } from "../../utils/helper";

const TABLE_HEAD = ["Keyword", "Cluster"];

const Cluster = () => {
  const navigate = useNavigate();
  const { result } = useAppContext();

  useEffect(() => {
    if (!result) {
      navigate("/");
    } else {
      console.log(result);
    }
  }, [result, navigate]);

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
            {result?.clusters?.map(([Keyword, Cluster], index) => {
              const isLast = index === result.clusters.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={Keyword}>
                  <td className={classes}>
                    <Typography
                      color="blueGray"
                      className="text-xs font-normal"
                    >
                      {Keyword}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      color="blueGray"
                      className="text-xs font-semibold"
                    >
                      {convertToString(Cluster)}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
};

export default Cluster;
