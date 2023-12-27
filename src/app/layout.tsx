import Header from "../components/Header";
import { postData } from "../util";
import StyledComponentsRegistry from "../AntdRegistry";
import { headers } from "next/headers";
import "./globals.css";

export default async function RootLayou(ctx: { children: any }) {
  const headersList = headers();
  const pathName = headersList.get("x-pathname") || "";

  const { data } = await postData("gettypes", {}, true);
  return (
    <html lang="en">
      <body>
        <Header data={data} pathName={pathName} />
        <StyledComponentsRegistry>{ctx.children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
