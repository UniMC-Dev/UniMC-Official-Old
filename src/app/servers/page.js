"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Layout, Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import ServersList from "../components/ServersList";

const { Content, Header } = Layout;

export default function ServersPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: "100vh" }}
    >
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Breadcrumb
            items={[
              { title: "首页", onClick: () => router.push("/") },
              { title: "服务器列表" },
            ]}
          />
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          >
            返回
          </Button>
        </Header>

        <Content style={{ padding: "24px" }}>
          <ServersList isPage={true} />
        </Content>
      </Layout>
    </motion.div>
  );
}
