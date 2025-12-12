import Sidebar from "./Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}

export default MainLayout;