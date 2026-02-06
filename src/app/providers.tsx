"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ambroseTheme from "@/theme/ambroseTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={ambroseTheme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
