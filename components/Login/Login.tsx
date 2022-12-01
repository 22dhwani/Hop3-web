import React, { FormEvent, use, useCallback, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import Image from "next/image";
import styles from "../../styles/Login.module.scss";
import LoginCover from "../../public/images/LoginCover.png";
import Logo from "../../public/images/Logo.svg";
import Google from "../../public/images/Google.svg";
import { Button, TextField, Grid, Link } from "@mui/material";
import Router from "next/router";
import { auth } from "../firebase";
import { getThemeColor, refreshToken } from "../../utils/utils";
import { getUser } from "../../services/auth";
const provider = new GoogleAuthProvider();

interface IUser {
  email: string;
  password: string;
  accesstoken: string;
}

export default function Login() {
  const [fieldValues, setFieldValues] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (token && isAuthenticated) {
  //     Router.push("/dashboard");
  //   }
  // }, []);

  const handleChange = (name: string, value: string | undefined) => {
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

  const login = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        await refreshToken();
        setFieldValues((prevFieldValues) => {
          return {
            ...prevFieldValues,
            email: user.email || "",
          };
        });
        try {
          const data = await getUser();
          if (data?.id) {
            Router.push("/dashboard");
            localStorage.setItem("isAuthenticated", "true");
          } else {
            redirectToUserDetailsPage();
          }
        } catch (error: any) {
          console.error("Errror in signin", error);
          if (error?.response?.status === 404) {
            redirectToUserDetailsPage();
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        redirectToUserDetailsPage();

        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      signInWithEmailAndPassword(auth, fieldValues.email, fieldValues.password)
        .then(async (user) => {
          await refreshToken();
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
              .then(async (user) => {
                await refreshToken();
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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Button
                onClick={login}
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
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#70FFC3",
                  },
                }}
              >
                <Image src={Google} alt={""} />
                &nbsp; Login via Google
              </Button>
            </Grid>
          </Grid>
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
