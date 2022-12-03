import React, { FormEvent, useCallback, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import styles from "../../styles/Login.module.scss";
import LoginCover from "../../public/images/LoginCover.png";
import Logo from "../../public/images/Logo.svg";
import { Button, TextField, Grid, Link } from "@mui/material";
import Router from "next/router";
import { auth } from "../firebase";
import { getThemeColor } from "../../utils/utils";
import { getUser } from "../../services/auth";

export default function Login() {
  const [fieldValues, setFieldValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      Router.push("/dashboard");
    }
  }, []);
  const handleChange = (name: string, value: string) => {
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: value,
      };
    });
  };
  const redirectToUserDetailsPage = () => {
    Router.push(
      `/userDetails?user=${JSON.stringify(fieldValues)}`,
      "/userDetails"
    );
  };
  const setToken = async () => {
    const token = await auth?.currentUser?.getIdToken(true);
    localStorage.setItem("auth_token", token as string);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      signInWithEmailAndPassword(auth, fieldValues.email, fieldValues.password)
        .then(async (user) => {
          setToken();
          const response = await getUser();
          if (response?.status === 200) {
            Router.push("/dashboard");
          } else {
            redirectToUserDetailsPage();
          }
        })
        .catch((error: any) => {
          console.log({ error });
          console.error("Error in sign in", error.message);
          if (error.code === "auth/user-not-found") {
            createUserWithEmailAndPassword(
              auth,
              fieldValues.email,
              fieldValues.password
            )
              .then((user) => {
                setToken();
                redirectToUserDetailsPage();
              })
              .catch((err: any) => {
                console.error("error in create user", err);
              });
          } else if (error?.response?.status === 404) {
            redirectToUserDetailsPage();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.logincontainer}>
      <div className={styles.rightsection}>
        <Image src={Logo} alt={""} />
        <p className={styles.title}>You are hopping to the</p>
        <span className={styles.transformdivwrraper}>
          <p className={styles.transformText}>right place</p>
        </span>
        <div className={styles.loginform}>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="email"
                  placeholder="Email"
                  name="email"
                  sx={{
                    width: "450px",
                  }}
                  variant="outlined"
                  value={fieldValues.email}
                  onChange={(event) =>
                    handleChange(event.target.name, event.target.value)
                  }
                  required
                  autoFocus
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  sx={{
                    width: "450px",
                  }}
                  variant="outlined"
                  value={fieldValues.password}
                  onChange={(event) =>
                    handleChange(event.target.name, event.target.value)
                  }
                  required
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  className="button-block"
                  sx={{
                    background: "#FFFFFF",
                    border: "1px solid #000000",
                    width: "450px",
                    boxShadow: "4px 4px 0px #70FFC3",
                    borderRadius: "4px",
                    color: getThemeColor(),
                    "&:hover": {
                      backgroundColor: "#70FFC3",
                    },
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          <p>
            By logining, I agree to the <Link>Terms of Service</Link> and
            <br />
            <Link> Privacy Policy</Link>
          </p>
        </div>
      </div>
      <div className={styles.leftsection}>
        <Image className={styles.imgcover} src={LoginCover} alt={""} />
      </div>
    </div>
  );
}
