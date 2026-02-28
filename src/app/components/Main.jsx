"use client";

import "@ant-design/v5-patch-for-react-19";

import React from "react";
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Row,
  Space,
  Statistic,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  ApiOutlined,
  AppstoreOutlined,
  BulbOutlined,
  CheckSquareOutlined,
  CompassOutlined,
  GithubOutlined,
  GlobalOutlined,
  QqOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const highlights = [
  {
    title: "资源共享",
    icon: <AppstoreOutlined />, 
    desc: "提供高可用节点、存储与运维经验，降低公益服务器运营成本。",
  },
  {
    title: "技术互助",
    icon: <ApiOutlined />, 
    desc: "围绕性能优化、安全治理与架构升级，建立可复用解决方案。",
  },
  {
    title: "联盟治理",
    icon: <TeamOutlined />, 
    desc: "通过公开协作流程与社区共识机制，推动长期稳定发展。",
  },
];

const roadmap = [
  "2023：提出 UniMC 协作构想，建立首批服务器技术交流网络。",
  "2024：沉淀运维规范与安全基线，完善应急协作机制。",
  "2025：重建品牌与官网，聚焦公益生态和跨服协同能力。",
  "未来：持续扩充开源工具链与文档体系，降低新成员接入门槛。",
];

const metrics = [
  { title: "联盟目标", value: "公益优先" },
  { title: "运营方向", value: "稳定与透明" },
  { title: "协作模式", value: "开放共建" },
];

export default function Main() {
  return (
    <div className="um-page">
      <div className="um-bg" />

      <header className="um-nav-wrap">
        <div className="um-nav">
          <Flex align="center" gap={12}>
            <img src="./logo.png" alt="UniMC Logo" width={42} height={42} draggable="false" />
            <div>
              <Text className="um-brand-kicker">Universal Minecraft</Text>
              <Title level={4} style={{ margin: 0 }}>UniMC 服务器联盟</Title>
            </div>
          </Flex>
          <Anchor
            direction="horizontal"
            affix={false}
            items={[
              { key: "home", href: "#home", title: "首页" },
              { key: "about", href: "#about", title: "联盟介绍" },
              { key: "roadmap", href: "#roadmap", title: "发展路线" },
              { key: "join", href: "#join", title: "加入我们" },
            ]}
          />
        </div>
      </header>

      <main className="um-main">
        <section id="home" className="um-hero card-surface">
          <Tag color="blue" icon={<CompassOutlined />}>Modernized UI</Tag>
          <Title style={{ marginTop: 18, marginBottom: 10 }}>
            以简约为核心，升级为 <span className="um-gradient-text">Material + Fluent</span> 风格
          </Title>
          <Paragraph className="um-subtitle">
            我们移除了旧版服务器列表，改为聚焦联盟能力、价值与发展方向，
            以更清晰的信息架构帮助访问者快速理解 UniMC 的使命与协作方式。
          </Paragraph>
          <Space wrap>
            <Button type="primary" size="large" shape="round" href="#join">
              申请加入
            </Button>
            <Button size="large" shape="round" icon={<GithubOutlined />} onClick={() => window.open("https://github.com/UniMC-Dev")}>
              GitHub 组织
            </Button>
          </Space>

          <Row gutter={[16, 16]} style={{ marginTop: 26 }}>
            {metrics.map((item) => (
              <Col xs={24} sm={8} key={item.title}>
                <Card className="um-metric" bordered={false}>
                  <Statistic title={item.title} value={item.value} />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section id="about" className="um-section">
          <Title level={2}>联盟能力</Title>
          <Row gutter={[20, 20]}>
            {highlights.map((item) => (
              <Col xs={24} md={8} key={item.title}>
                <Card className="card-surface um-feature" bordered={false}>
                  <Avatar size={42} icon={item.icon} className="um-feature-icon" />
                  <Title level={4}>{item.title}</Title>
                  <Paragraph>{item.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="card-surface um-pillars" bordered={false}>
            <Space size={[8, 8]} wrap>
              <Tag icon={<SafetyOutlined />} color="processing">安全治理</Tag>
              <Tag icon={<BulbOutlined />} color="purple">技术创新</Tag>
              <Tag icon={<GlobalOutlined />} color="green">开放生态</Tag>
              <Tag icon={<TeamOutlined />} color="gold">社区协作</Tag>
            </Space>
            <Paragraph style={{ marginTop: 16, marginBottom: 0 }}>
              通过轻量化视觉层次、柔和阴影与圆角组件，页面在保留现有品牌色基础上，
              形成更现代、专注且一致的浏览体验。
            </Paragraph>
          </Card>
        </section>

        <section id="roadmap" className="um-section">
          <Title level={2}>发展路线</Title>
          <Card className="card-surface" bordered={false}>
            <Timeline
              items={roadmap.map((line, index) => ({
                color: index === roadmap.length - 1 ? "green" : "blue",
                children: line,
              }))}
            />
          </Card>
        </section>

        <section id="join" className="um-section um-join card-surface">
          <Title level={2}>加入 UniMC</Title>
          <Paragraph>
            我们欢迎纯公益或半公益服务器团队加入联盟。请准备服务器定位、运营计划与协作诉求后申请。
          </Paragraph>
          <Space wrap>
            <Button
              size="large"
              shape="round"
              icon={<QqOutlined />}
              onClick={() => navigator.clipboard.writeText("1058655479")}
            >
              复制官方 QQ 群号
            </Button>
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/UniMC-Dev")}
            >
              前往 GitHub
            </Button>
          </Space>
        </section>
      </main>

      <footer className="um-footer">
        <Text>© 2023-2026 Universal Minecraft</Text>
        <a id="icp" href="https://icp.gov.moe/?keyword=20250236" target="_blank" rel="noreferrer">
          <CheckSquareOutlined /> 萌ICP备20250236号
        </a>
      </footer>
    </div>
  );
}
