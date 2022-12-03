import React, { useCallback, useState } from "react";
import styles from "../styles/UserDetails.module.scss";
import Image from "next/image";
import Logo from "../public/images/Logo.svg";
import Upload from "../public/images/Upload.svg";
import { getThemeColor } from "../utils/utils";
import {
  TextField,
  CardContent,
  Grid,
  Fab,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
// import Router from "next/router";
import { createUser } from "../services/auth";

export default function UserDetails() {
  // const userDetail =
  //   typeof Router?.query?.user === "string"
  //     ? JSON.parse(Router?.query?.user)
  //     : {};
  // const [username, setUsername] = useState("");
  // const handleUploadClick = () => {};

  // const handleSubmit = async () => {
  //   try {
  //     const response = await createUser({
  //       username,
  //       email: userDetail?.email,
  //     });
  //     if (response.status === 201) {
  //       Router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className={styles.userdetail}>
      {/* <div>
        <Image src={Logo} alt={""} />
      </div>
      <div className={styles.userformwrapper}>
        <div className={styles.userform}>
          <p className={styles.title}>
            Update your profile photo and name to finalize account information
          </p>
          <CardContent>
            <Grid className={styles.uploadwrapper}>
              <input
                accept="image/*"
                className={styles.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              <label htmlFor="contained-button-file">
                <div className={styles.uploaddiv}>
                  <Image src={Upload} alt={""} />
                </div>
              </label>
              <div className={styles.uploadtextwrapper}>
                <p className={styles.uploadtitle}>
                  {" "}
                  Click to upload profile photo
                </p>
                <p className={styles.graytext}>Less than 2GB </p>
                <p className={styles.graytext}>110x110 resolution or higher</p>
              </div>
            </Grid>
          </CardContent>
          <FormControl className={styles.formcontainer}>
            <FormLabel
              sx={{
                color: getThemeColor(),
                fontSize: "18px",
                paddingBottom: "5px",
              }}
            >
              Username
            </FormLabel>
            <Grid container direction="column" spacing={10}>
              <Grid item>
                <TextField
                  placeholder="Username"
                  type="text"
                  autoComplete="off"
                  name="username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  sx={{
                    width: "450px",
                    borderRadius: "4px",
                    border: `1px solid ${getThemeColor()}`,
                  }}
                  variant="outlined"
                  required
                  autoFocus
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  className="button-block"
                  sx={{
                    width: "250px",
                    background: "#000000 !important",
                    border: "1px solid #000000",
                    borderRadius: "33px",
                    color: "#FFF",
                  }}
                >
                  Start hopping
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </div> */}
    </div>
  );
}
