import Header from "@/app/components/header";

type Props = {
  children: React.ReactNode;
};

const WithHeaderLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default WithHeaderLayout;
