import { ReactNode } from "react";
import Header from "../components/Header";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, rgba(30,41,49,1) 0%, rgba(57,76,87,1) 100%)",
      }}
    >
      <Header />
      <main className="flex items-center justify-center">{children}</main>
    </div>
  );
}
