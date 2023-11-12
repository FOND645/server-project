import { Divider, Space, Typography } from "antd";
import React, { FC } from "react";
import "./Storage.css";

const { Title } = Typography;

type props = {};

export const Storage: FC<props> = ({}) => {
    return (
        <Space.Compact direction="vertical" className="stroage-container">
            <Title className="storage-title">Состояние хранилища</Title>
            <Divider className="storage-divider horizontal-divider" />
        </Space.Compact>
    );
};
