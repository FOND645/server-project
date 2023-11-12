import { Layout } from "antd";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import "./PageLayout.css";
import { MainMenu } from "./Components/MainMenu";
import Logo from "../../Images/Logo.png";

const { Sider, Content } = Layout;

type props = {};

export const PageLayout: FC<props> = () => {
    return (
        <Layout className="page-layout">
            <Sider className="layout-sider">
                <img src={Logo} alt="логотип" className="layout-logo" />
                <MainMenu />
            </Sider>
            <Content className="content-container">
                <Outlet />
            </Content>
        </Layout>
    );
};
