import { Loader } from "@/app/components/loader";
import { variables } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <main {...stylex.props(styles.main)}>
      {props.children}
      <Loader />
      <Toaster />
    </main>
  );
};

export default MainLayout;

export const styles = stylex.create({
  main: {
    maxWidth: `calc(${variables.containerMaxWidth} + ${variables.containerPadding} * 2)`,
    margin: "auto",
    width: "100%",
    paddingLeft: variables.containerPadding,
    paddingRight: variables.containerPadding,
  },
});
