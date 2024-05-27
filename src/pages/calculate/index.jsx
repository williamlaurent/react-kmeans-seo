import React, { useEffect } from "react";
import Layout from "../../layout";
import BarChart from "../../components/chart/BarChart";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Calculate = () => {
  const [open, setOpen] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const { result, counts, silhouetteScore, iterations } = useAppContext();

  const handleClick = () => {
    navigate("/cluster");
  };

  useEffect(() => {
    if (!result || !counts || !silhouetteScore) {
      navigate("/");
    }
  }, [result, counts, navigate, silhouetteScore]);

  return (
    <Layout>
      <div className="flex justify-end mb-4 ">
        <Button size="sm" color="blue" onClick={handleClick}>
          Lihat Cluster
        </Button>
      </div>
      <div className="my-8">
        {/* <Accordion open={alwaysOpen}>
          <AccordionHeader onClick={handleAlwaysOpen}>
            Preprocessing
          </AccordionHeader>
          <AccordionBody>
            Preprocessing is the process of transforming raw data into a format
            that can be used in machine learning algorithms.
          </AccordionBody>
        </Accordion> */}
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Kmeans
          </AccordionHeader>
          <AccordionBody>
            <p>Jumlah K : 4</p>
            <p>Jumlah Iterasi : {iterations}</p>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Silhouette Score
          </AccordionHeader>
          <AccordionBody>{silhouetteScore}</AccordionBody>
        </Accordion>
      </div>
      <div className="shadow">
        <BarChart data={counts} />
      </div>
    </Layout>
  );
};

export default Calculate;
