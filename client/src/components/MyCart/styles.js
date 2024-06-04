import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  media: {
    height: 250,
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
