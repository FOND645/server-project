import type { Point } from "chart.js/dist/core/core.controller";
import { Systeminformation } from "systeminformation";

export type GraphicType = "CPU_temp" | "CPU_load" | "Ethernet_load" | "RAM_load" | null;

export type Graphic = {
    type: GraphicType;
};

export type chartDataSet = {
    id: number;
    clip?: number | object;
    label: string;
    data: number[];
};

export type RawChartData = (number | Point | null)[];

export type Monitor = number[];

export type RAMmonitor = {
    total: Monitor;
    available: Monitor;
    free: Monitor;
    used: Monitor;
    active: Monitor;
    buffer: Monitor;
    cached: Monitor;
};

export type LANmonitor = {
    rx: Monitor;
    tx: Monitor;
};

export type Monitors = {
    cpuTemperature: Monitor;
    cpuLoad: Monitor;
    RAM: RAMmonitor;
    LAN: LANmonitor;
};

export type ServerConfiguration = {
    CPUconfiguration: Systeminformation.CpuData | undefined;
    diskLayout: Systeminformation.DiskLayoutData[] | undefined;
    network: Systeminformation.NetworkInterfacesData | undefined;
    packages: Systeminformation.VersionData | undefined;
    RAMtotal: number | undefined;
    OS: Systeminformation.OsData | undefined;
};

export type MonitorElement = "cpuTemperature" | "cpuLoad" | "LAN" | "RAM";
