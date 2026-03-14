"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Modal,
  Tabs,
  Card,
  Row,
  Col,
  Tag,
  Statistic,
  Button,
  Empty,
  Space,
  Spin,
} from "antd";
import {
  CloseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import serversData from "@/data/servers.json";

const ServersList = ({ visible, onClose }) => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      setServers(serversData.servers);
      setLoading(false);
    }, 300);
  }, []);

  // Get unique server types
  const serverTypes = [
    "all",
    ...new Set(servers.map((s) => s.type)),
  ];

  const typeLabels = {
    all: "全部服务器",
    survival: "生存服务器",
    creative: "创意服务器",
    "mini-games": "小游戏服",
    network: "网络服务器",
  };

  // Filter servers
  const filteredServers =
    selectedType === "all"
      ? servers
      : servers.filter((s) => s.type === selectedType);

  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "green";
      case "maintenance":
        return "orange";
      case "stopped":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "running":
        return "在线";
      case "maintenance":
        return "维护中";
      case "stopped":
        return "离线";
      default:
        return "未知";
    }
  };

  const statusIcons = {
    running: <CheckCircleOutlined />,
    maintenance: <ExclamationCircleOutlined />,
    stopped: <CloseOutlined />,
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.45)",
              zIndex: 999,
            }}
          />

          {/* Modal content with scale animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              width: "90%",
              maxWidth: "1000px",
              maxHeight: "85vh",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>UniMC 联盟服务器</h2>
              <Button
                type="text"
                size="large"
                icon={<CloseOutlined />}
                onClick={onClose}
              />
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "300px",
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <Tabs
                    activeKey={selectedType}
                    onChange={setSelectedType}
                    items={serverTypes.map((type) => ({
                      key: type,
                      label: typeLabels[type] || type,
                      disabled: false,
                    }))}
                  />

                  {/* Server Grid */}
                  <div style={{ marginTop: "24px" }}>
                    {filteredServers.length === 0 ? (
                      <Empty description="暂无服务器" />
                    ) : (
                      <Row gutter={[16, 16]}>
                        {filteredServers.map((server) => (
                          <Col xs={24} sm={12} md={8} key={server.id}>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Card
                                className="um-server-card"
                                variant="outlined"
                                hoverable
                              >
                                {/* Server Name and Status */}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <h4 style={{ margin: 0, flex: 1 }}>
                                    {server.name}
                                  </h4>
                                  <Tag
                                    icon={statusIcons[server.status]}
                                    color={getStatusColor(server.status)}
                                    style={{ marginLeft: "8px" }}
                                  >
                                    {getStatusLabel(server.status)}
                                  </Tag>
                                </div>

                                {/* Description */}
                                <p
                                  style={{
                                    color: "#666",
                                    fontSize: "12px",
                                    margin: "8px 0 12px 0",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {server.description}
                                </p>

                                {/* Type Badge */}
                                <Tag
                                  color="blue"
                                  style={{ marginBottom: "12px" }}
                                >
                                  {typeLabels[server.type]}
                                </Tag>

                                {/* Player Count */}
                                <div
                                  style={{
                                    background: "#fafafa",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <span>在线玩家: </span>
                                    <strong>
                                      {server.playerCount}/{server.maxPlayers}
                                    </strong>
                                  </div>
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "4px",
                                      background: "#e8e8e8",
                                      borderRadius: "2px",
                                      marginTop: "6px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: "100%",
                                        width: `${(server.playerCount / server.maxPlayers) * 100}%`,
                                        background:
                                          server.playerCount > 0
                                            ? "#274B93"
                                            : "#ccc",
                                        transition: "width 0.3s ease",
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* IP Address */}
                                <div
                                  style={{
                                    background: "#f0f5ff",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    marginBottom: "12px",
                                    fontFamily: "monospace",
                                    fontSize: "12px",
                                    wordBreak: "break-all",
                                    color: "#274B93",
                                  }}
                                >
                                  {server.ip}
                                </div>

                                {/* Join Button */}
                                <Space style={{ width: "100%" }}>
                                  <Button
                                    type="primary"
                                    block
                                    icon={<LinkOutlined />}
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        server.ip
                                      );
                                    }}
                                  >
                                    复制地址
                                  </Button>
                                </Space>
                              </Card>
                            </motion.div>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServersList;
