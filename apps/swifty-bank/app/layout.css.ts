import { style } from "@vanilla-extract/css";

const layout = style({
  padding: "0 20px 100px 20px",
  height: "100svh",
  touchAction: "pan-x pan-y",
});

const styles = {
  layout,
};

export default styles;
