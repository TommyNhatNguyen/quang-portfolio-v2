import { Loader } from "@/app/components/loader";
import { variables } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <main {...stylex.props(styles.main)}>
      {props.children}
      <Loader />
    </main>
  );
};

export default MainLayout;

export const styles = stylex.create({
  main: {
    maxWidth: `calc(${variables.containerMaxWidth} + ${variables.containerPadding} * 2)`,
    margin: "auto",
    width: "100%",
    height: "100%",
    paddingLeft: variables.containerPadding,
    paddingRight: variables.containerPadding,
  },
});
