import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import "./global.css";
import { HeaderMenu } from "../components/headers";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "Monitoring Produksi",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <HeaderMenu />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
