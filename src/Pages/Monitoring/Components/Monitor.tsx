import { Image } from "antd";
import axios from "axios";
import React, { FC, useState, useRef, useEffect } from "react";
import { Systeminformation } from "systeminformation";
import FanIcon from "../../../Images/hardware/Fan.svg";
import CPUIcon from "../../../Images/hardware/CPU.svg";
import EthernetIcon from "../../../Images/hardware/Eth.svg";
import RAMIcon from "../../../Images/hardware/RAM.svg";
// import type { Graphic, RawChartData } from "../assist/types";
import type { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Monitor } from "src/Server/server.types";
const chartIconWidth = 28;
const chartIconHeidth = 28;

type ChartSettings = {
    name: string;
    min: number;
    max: number;
    icon: React.ReactNode;
    title: string;
    lineColor: string;
    backgrounColor: string;
    unit: string;
};

type LineChartData = ChartData<"line">;
type LineChartDataSet = ChartDataset<"line">;
type LineChartOptions = ChartOptions<"line">;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type props = {
    type: "lan" | "cpu-load" | "ram" | "cpu-temp";
};

export const Monitor: FC<props> = ({ type }) => {
    const [upperLimit, setUpperLimit] = useState<number>(100);

    if (type === "lan") {
        axios.get<Systeminformation.NetworkInterfacesData>("/network").then((response) => {
            setUpperLimit(response.data.speed || 32 * Math.pow(1024, 3));
        });
    } else if (type === "ram") {
        axios.get<number | undefined>("/RAMtotal").then((response) => {
            setUpperLimit(response.data || 1000);
        });
    }

    const chartsOptions: ChartSettings[] = [
        {
            name: "CPU_temp",
            min: 30,
            max: 120,
            icon: <Image src={FanIcon} preview={false} width={chartIconWidth} height={chartIconHeidth} />,
            title: "Температура процессора",
            lineColor: "rgb(253, 120, 3)",
            backgrounColor: "rgba(253, 254, 151, 0.3)",
            unit: "°C",
        },
        {
            name: "CPU_load",
            min: 0,
            max: 100,
            icon: <Image src={CPUIcon} preview={false} width={chartIconWidth} height={chartIconHeidth} />,
            title: "Загрузка процессора",
            lineColor: "rgb(109, 175, 213)",
            backgrounColor: "rgb(241, 246, 250)",
            unit: "%",
        },
        {
            name: "Ethernet_load",
            min: 0,
            max: upperLimit,
            icon: <Image src={EthernetIcon} preview={false} width={chartIconWidth} height={chartIconHeidth} />,
            title: "Загрузка Ethernet",
            lineColor: "rgb(171, 87, 13)",
            backgrounColor: "rgb(252, 243, 235)",
            unit: "МБит/с",
        },
        {
            name: "RAM_load",
            min: 0,
            max: upperLimit,
            icon: <Image src={RAMIcon} preview={false} width={chartIconWidth} height={chartIconHeidth} />,
            title: "Загрузка ОЗУ",
            lineColor: "rgb(148, 36, 180)",
            backgrounColor: "rgb(244, 242, 244)",
            unit: "МБайт",
        },
    ];
    const chartOption = chartsOptions.find((option) => option.name === type);

    const chartRef = useRef<ChartJS<"line", number[], string>>(null);

    let rawData = Array(30).fill(null);

    const labels: string[] = rawData.map((_, index) => `${index + 1} сек`).reverse();

    const datasets: LineChartDataSet[] = [
        {
            label: chartOption?.unit,

            data: rawData,
            borderColor: chartOption?.lineColor,
            backgroundColor: chartOption?.backgrounColor,
        },
    ];

    const options: LineChartOptions = {
        responsive: true,
        animation: false,
    };

    const data: LineChartData = {
        labels,
        datasets,
    };

    useEffect(() => {
        const updater = setInterval(() => {
            const url = {
                "cpu-load": "/cpuLoad",
                "cpu-temp": "/cpuTemperature",
                LAN: "/LAN",
                RAM: "/RAM",
            };
            if (type === "cpu-load" || type === "cpu-temp") {
                axios.get<Monitor>(url[type]).then((response) => {});
            }
            chartRef.current?.update();
        }, 2000);
        return () => {
            clearInterval(updater);
        };
    });

    return <div />;
};
