import { vars } from "@swifty/ui/styles/vars.css";
import { style } from "@vanilla-extract/css";

const idLabel = style({
  fontSize: "14px",
  fontWeight: "bold",
  display: "flex",
  color: vars.color.primary,
  paddingLeft: "1.5rem",
  marginBottom: "-0.75rem",
});

const idInputBox = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const idInputFront = style({
  width: "40%",
  height: "100%",
});

const idInputHyphen = style({
  width: "24px",
  display: "flex",
  paddingTop: "1.5rem",
  margin: "auto 0",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "6rem",
  fontSize: "1rem",
});

const idInputBackBox = style({
  width: "40%",
  height: "100%",
  paddingTop: "1.5rem",
  display: "flex",
  flexDirection: "row",
  // justifyContent: "center",
  alignItems: "center",
});

const idInputBack = style({
  minWidth: "20%",
  width: "40px",
  fontSize: "1rem",
  textAlign: "center",
  alignItems: "center",
  height: "100%",
  borderWidth: 2,
  borderColor: vars.color.primary,
  borderRadius: 25,
  outline: "none",
  backgroundColor: vars.color.background,
  ":focus": {
    backgroundColor: vars.color.backgroundDimmer,
  },
  transition: "all 0.2s ease-out",
  "::placeholder": {
    color: "#ccc",
    transition: "all 0.2s ease-out",
  },
  marginRight: "0.5rem",
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
});

const styles = {
  idLabel,
  idInputBox,
  idInputFront,
  idInputHyphen,
  idInputBackBox,
  idInputBack,
};

export default styles;
