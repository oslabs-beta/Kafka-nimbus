import { Provider } from "./components/Provider";
import { Providers } from "../redux/provider";
import "../styles/globals.css";
import NavBar from "./components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Provider>
            <NavBar />
            {children}
          </Provider>
        </Providers>
      </body>
    </html>
  );
}

// export default api.withTRPC(MyApp);
// export default MyApp;
