import React from "react";

import Section from "../../Section";
import styles from "../../../styles/LandingFooter.module.scss";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    label: "Explore the app",
    href: "",
  },
  {
    label: "Join Discord",
    href: "https://discord.gg/xKhs3bFKa4",
  },
  {
    label: "Contact us",
    href: "",
  },
];

const LandingFooter = () => {
  return (
    <Section className={styles.landingFooter}>
      <div className={styles.mid}>
        <div className={styles.left}>
          <h2>
            The power is in your hands{" "}
            <Image
              src="/vectors/logo-footer.svg"
              alt="logo"
              width={44}
              height={44}
            />
          </h2>
        </div>
        <div className={styles.right}>
          {links.map((el, idx) => {
            return (
              <Link key={el.label} href={el.href}>
                {el.label}{" "}
                <Image
                  src="/vectors/icons/link.svg"
                  alt="link"
                  width={16}
                  height={16}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.copyright}>
        ©2022 hop3 Rewards. All Rights Reserved.
      </div>
    </Section>
  );
};

export default LandingFooter;
