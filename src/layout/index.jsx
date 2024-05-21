import { Typography } from "@material-tailwind/react";

const Layout = ({ children }) => {
  return (
    <>
      <header className="shadow p-4">
        <Typography variant="h1" className="text-center">
          K-Means SEO
        </Typography>
      </header>
      <main className="p-4">{children}</main>
    </>
  );
};

export default Layout;
