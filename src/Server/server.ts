import express from "express";
import path from "path";
import { serverData } from "./serverData";

const SERVER_PORT = 8080;

const serverStatus = new serverData();

export const server = express();

server.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "index.html"));
});

server.get("/cpuLoad", (req, res) => {
    res.status(200).send(serverStatus.status.cpuLoad);
});

server.get("/cpuTemperature", (req, res) => {
    res.status(200).send(serverStatus.status.cpuTemperature);
});

server.get("/LAN", (req, res) => {
    res.status(200).send(serverStatus.status.LAN);
});

server.get("/RAM", (req, res) => {
    res.status(200).send(serverStatus.status.RAM);
});

server.get("/CPUconfiguration", (req, res) => {
    res.status(200).send(serverStatus.configuration.CPUconfiguration);
});

server.get("/diskLayout", (req, res) => {
    res.status(200).send(serverStatus.configuration.diskLayout);
});

server.get("/network", (req, res) => {
    res.status(200).send(serverStatus.configuration.network);
});

server.get("/packages", (req, res) => {
    res.status(200).send(serverStatus.configuration.packages);
});

server.get("/RAMtotal", (req, res) => {
    res.status(200).send({ totalRam: serverStatus.configuration.RAMtotal });
});

server.get("/OS", (req, res) => {
    res.status(200).send(serverStatus.configuration.OS);
});

server.listen(SERVER_PORT, () => console.log(`Сервер запущен на порту ${SERVER_PORT}`));
