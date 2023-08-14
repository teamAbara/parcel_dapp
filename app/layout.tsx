import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HeaderAction } from "./layout/navber";
import FooterSocial from "./layout/footer"; // 파일 경로를 실제 파일 경로로 변경

export const metadata: Metadata = {
  title: "X-Box",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#091140", margin: 0 }}>
        <HeaderAction
          links={[
            { link: "/test", label: "test" },
            { link: "dd", label: "d" },
          ]}
        />
        {children}
        <FooterSocial />
      </body>
    </html>
  );
}
