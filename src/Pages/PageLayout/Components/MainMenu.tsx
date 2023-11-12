import React, { FC } from "react";
import { Menu, MenuProps, MenuItemProps } from "antd";
import { LineChartOutlined, HddOutlined, CodeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";

type props = {};

export const MainMenu: FC<props> = () => {
    const navigate = useNavigate();

    type MenuItems = Required<MenuProps>["items"];
    const navigation: MenuItemProps["onClick"] = (event) => {
        const { key } = event;
        navigate(`/${key}`);
    };

    const menuItems: MenuItems = [
        {
            key: "Monitoring",
            label: "Мониторинг",
            icon: <LineChartOutlined />,
            onClick: navigation,
        },
        {
            key: "Storage",
            label: "Хранилище",
            icon: <HddOutlined />,
            onClick: navigation,
        },
        {
            key: "Programms",
            label: "Пакеты",
            icon: <CodeOutlined />,
            onClick: navigation,
        },
    ];

    return <Menu mode={"inline"} items={menuItems} className="main-menu" />;
};
