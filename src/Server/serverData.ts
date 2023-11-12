import { Monitors, ServerConfiguration } from "./server.types";
import systeminformation from "systeminformation";
const SII = systeminformation;

export class serverData {
    configuration: ServerConfiguration;
    status: Monitors;
    readonly updater: NodeJS.Timer;

    constructor() {
        this.configuration = {
            CPUconfiguration: undefined,
            diskLayout: undefined,
            network: undefined,
            packages: undefined,
            RAMtotal: undefined,
            OS: undefined,
        };

        this.status = {
            cpuLoad: Array(30).fill(0),
            cpuTemperature: Array(30).fill(0),
            LAN: {
                rx: Array(30).fill(0),
                tx: Array(30).fill(0),
            },
            RAM: {
                available: Array(30).fill(0),
                total: Array(30).fill(0),
                active: Array(30).fill(0),
                buffer: Array(30).fill(0),
                cached: Array(30).fill(0),
                free: Array(30).fill(0),
                used: Array(30).fill(0),
            },
        };
        this.updateConfiguration();
        this.updater = setInterval(this.statusUpdater.bind(this), 1000);
    }

    async updateConfiguration() {
        console.log("Начинаем получать данные");
        this.configuration.CPUconfiguration = await SII.cpu();
        this.configuration.diskLayout = await SII.diskLayout();
        const networks = await SII.networkInterfaces();
        if (Array.isArray(networks)) {
            this.configuration.network = networks.find((Interface) => Interface.default);
        } else {
            this.configuration.network = networks;
        }
        this.configuration.packages = await SII.versions(undefined);
        this.configuration.RAMtotal = (await SII.mem()).total;
        this.configuration.OS = await SII.osInfo();
        console.log("Данные получены");
    }

    async statusUpdater() {
        let { LAN, RAM, cpuLoad, cpuTemperature } = this.status;
        const defultInterface = await SII.networkInterfaceDefault();
        SII.cpuTemperature((data) => {
            cpuTemperature.shift();
            cpuTemperature.push(Math.trunc(data.max));
        });
        SII.currentLoad((data) => {
            cpuLoad.shift();
            cpuLoad.push(Math.trunc(data.currentLoad));
        });
        SII.networkStats(defultInterface, (data) => {
            LAN.rx.shift();
            LAN.rx.push(Math.trunc(data[0].tx_sec));
            LAN.tx.shift();
            LAN.tx.push(Math.trunc(data[0].tx_sec));
        });
        SII.mem((data) => {
            RAM.total.shift();
            RAM.total.push(data.total);
            RAM.available.shift();
            RAM.available.push(data.available);
            RAM.free.shift();
            RAM.free.push(data.free);
            RAM.used.shift();
            RAM.used.push(data.used);
            RAM.active.shift();
            RAM.active.push(data.active);
            RAM.buffer.shift();
            RAM.buffer.push(data.buffers);
            RAM.cached.shift();
            RAM.cached.push(data.cached);
        });
    }
}
