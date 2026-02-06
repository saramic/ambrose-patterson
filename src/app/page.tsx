import { Layout, Space, Divider } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

// const { Title } = Typography;

export default function Home() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
      }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}>
        <div style={{ maxWidth: "800px", textAlign: "center", width: "100%" }}>
          <Space
            size="large"
            style={{ width: "100%" }}
            orientation="vertical"
            align="center">
            <BookOutlined style={{ fontSize: "64px", color: "#d97706" }} />

            <div>
              <Title
                level={1}
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "16px",
                }}>
                Ambrose Patterson
              </Title>
              <Title
                level={2}
                style={{
                  fontSize: "24px",
                  fontWeight: "normal",
                  color: "#6b7280",
                  marginBottom: "32px",
                }}>
                the Art and Life by Jane Alexander
              </Title>
            </div>

            <Divider
              style={{
                borderColor: "#fbbf24",
                width: "96px",
                margin: "0 auto",
              }}
            />
          </Space>
        </div>
      </Content>
    </Layout>
  );
}
