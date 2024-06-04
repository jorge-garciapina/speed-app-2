import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function InitialView() {
  return (
    <Link to="game">
      <Button> Click To Change view</Button>
    </Link>
  );
}
