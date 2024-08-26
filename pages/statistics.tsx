import React from "react";
import prisma from "../lib/prisma";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "../components/PageHeader";
import UnauthorizedPage from "../components/Unauthorized";
import { getSession, GetSessionParams } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { ChartData, HouseCount } from "../types";
import { Session } from "next-auth";

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement);

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  const housesCount = await prisma.favoriteCharacter.groupBy({
    by: ["house"],
    _count: true,
  });

  return {
    props: { housesCount, session },
  };
};

const Statistics = (props: { housesCount: HouseCount[]; session: Session }) => {
  const { housesCount, session } = props;

  const { t } = useTranslation();

  const getChartData = (data: HouseCount[]): ChartData => {
    const labels = data.map((entry) => entry.house).filter((label) => label);
    const counts = data.map((entry) => entry._count);

    return {
      labels: labels,
      datasets: [
        {
          label: "House",
          data: counts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#FF8C00",
          ],
        },
      ],
    };
  };

  const renderChart = (data: HouseCount[], title: string): JSX.Element => {
    const chartData = getChartData(data);

    return (
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                grid: {
                  color: "#FFF",
                },
                stacked: true,
              },
              y: {
                grid: {
                  color: "white",
                },
                beginAtZero: true,

                ticks: {
                  precision: 0,
                },
              },
            },
          }}
        />
      </Box>
    );
  };

  if (!session || session?.user?.role !== "ADMIN") {
    return <UnauthorizedPage />;
  }

  return (
    <Layout>
      <PageHeader title={t("characterstats")} />
      {renderChart(housesCount, t("housecounts"))}
    </Layout>
  );
};

export default Statistics;
