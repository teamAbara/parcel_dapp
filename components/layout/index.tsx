import { HeaderAction } from "./navber";
import FooterSocial from "./footer"; // 파일 경로를 실제 파일 경로로 변경

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderAction
        links={[
          { link: "/InvoiceRegistration", label: "택배 예약" },
          { link: "/InvoiceRegistration", label: "반품 예약" },
          { link: "/Courierinquiry", label: "택배 조회" },
        ]}
      />
      {children}
      <FooterSocial />
    </>
  );
}
