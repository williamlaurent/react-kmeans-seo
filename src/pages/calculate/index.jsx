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

  const { result, counts } = useAppContext();

  const handleClick = () => {
    navigate("/cluster");
  };

  useEffect(() => {
    if (!result || !counts) {
      navigate("/");
    }
  }, [result, counts, navigate]);

  return (
    <Layout>
      <div className="flex justify-end mb-4 ">
        <Button size="sm" color="blue" onClick={handleClick}>
          Lihat Cluster
        </Button>
      </div>
      <div className="my-8">
        <Accordion open={alwaysOpen}>
          <AccordionHeader onClick={handleAlwaysOpen}>
            Preprocessing
          </AccordionHeader>
          <AccordionBody>
            {/* Meaning Preprocessing */}
            Preprocessing is the process of transforming raw data into a format
            that can be used in machine learning algorithms.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Kmeans
          </AccordionHeader>
          <AccordionBody>
            K-means clustering is a method of vector quantization, originally
            from signal processing, that aims to partition n observations into k
            clusters in which each observation belongs to the cluster with the
            nearest mean (cluster centers or cluster centroid), serving as a
            prototype of the cluster.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Sum Squared Error
          </AccordionHeader>
          <AccordionBody>
            The sum of squared distances between each observation and its
            cluster centroid.
          </AccordionBody>
        </Accordion>
      </div>
      <div className="shadow">
        <BarChart data={counts} />
      </div>
    </Layout>
  );
};

export default Calculate;
