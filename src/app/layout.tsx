import Header from " /components/Header";
import { postData } from " /util";
import StyledComponentsRegistry from "../AntdRegistry";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await postData("gettypes", {}, true);
  return (
    <html lang="en">
      <body>
        <Header data={data} />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
