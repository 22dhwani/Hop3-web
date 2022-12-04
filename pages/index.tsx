import React from "react";
import Image from "next/image";
import LandingPage from "../public/images/LandingPage.png";
import { height } from "@mui/system";

const Home = (props: any) => {
  return (
    <div>
      <Image
        src={LandingPage}
        alt={"landingpage"}
        style={{ objectFit: "cover", height: "auto", maxWidth: "100%" }}
      />
    </div>
  );
};

export default Home;
