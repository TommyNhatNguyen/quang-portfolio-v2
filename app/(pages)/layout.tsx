import { variables } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import Header from "../components/header";
type Props = {};

const MainLayout = (props: Props) => {
  return (
    <main {...stylex.props(styles.main)}>
      {/* Header */}
      <Header />
      {/* Body */}
      <section></section>
    </main>
  );
};

export default MainLayout;

export const styles = stylex.create({
  main: {
    maxWidth: `calc(${variables.containerMaxWidth}px + ${variables.containerPadding} * 2)`,
    margin: "auto",
    width: "100%",
    height: "100%",
    paddingLeft: variables.containerPadding,
    paddingRight: variables.containerPadding,
  },
});
