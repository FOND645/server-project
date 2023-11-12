import { Divider, Dropdown, DropdownProps, MenuItemProps, Space, Typography } from "antd";
import React, { FC, useState } from "react";
import "./Monitoring.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import BlankGraphic from "../../Images/blank-graphic.png";

const { Title } = Typography;

type props = {};

type monitor = "lan" | "cpu-load" | "ram" | "cpu-temp";

export const Monitoring: FC<props> = () => {
    const [monitors, setMonitors] = useState<monitor[]>(["lan", "cpu-load", "ram"]);
    const addMonitor: MenuItemProps["onClick"] = (event) => {
        const key = event.key as monitor;
        setMonitors((oldState) => [...oldState, key]);
    };

    const DropdownElements: DropdownProps["menu"] = {
        items: [
            {
                key: "cpu-load",
                label: "Загрузка ЦП",
                onClick: addMonitor,
            },
            {
                key: "cpu-temp",
                label: "Темп. ЦП",
                onClick: addMonitor,
            },
            {
                key: "ram",
                label: "ОЗУ",
                onClick: addMonitor,
            },
            {
                key: "lan",
                label: "Сеть",
                onClick: addMonitor,
            },
        ],
    };
    return (
        <Space.Compact direction="vertical" className="monitoring-container">
            <Title className="monitoring-title">Мониторинг</Title>
            <Divider className="monitoring-divider horizontal-divider" />
            <div className="monitors-container">
                {monitors?.map((MonitorType, index) => {
                    return (
                        <div className="monitor-container" key={index}>
                            <img src={BlankGraphic} alt="График. Типа." className="monitor-graphic" />
                        </div>
                    );
                })}
                <div className="monitor-container add-monitor">
                    <Dropdown menu={DropdownElements} placement="bottom">
                        <PlusCircleOutlined className="add-monitor-icon" />
                    </Dropdown>
                </div>
            </div>
        </Space.Compact>
    );
};
