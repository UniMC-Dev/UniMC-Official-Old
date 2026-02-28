import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "./globals.css";

export const metadata = {
  title: "UniMC 服务器联盟",
  description: "UniMC 服务器联盟",
};

export const viewport = {
  width: "device-width",
  initialScale: 0.8,
  maximumScale: 0.8,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#274B93",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
