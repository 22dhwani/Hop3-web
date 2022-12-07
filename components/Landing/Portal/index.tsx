import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

import styles from "../../../styles/LandingPortal.module.scss";
import Section from "../../Section";

const LandingPortal = () => {
  return (
    <Section className={styles.landingPortal}>
      <h2>
        “The app that makes <br className={styles.small} />
        <span className={styles.typeWriter}>
          <Typewriter
            words={[
              "having fun",
              "going out",
              "exploring events",
              "finding deals",
            ]}
            typeSpeed={50}
            loop
          />
          <span className={styles.cursor}>|</span>
        </span>
        <br />
        <span className={styles.rewarding}>rewarding</span>”
      </h2>

      <div className={styles.portal}>
        <Image
          src="/vectors/portal.svg"
          alt="portal"
          width={100}
          height={100}
        />
      </div>
    </Section>
  );
};

export default LandingPortal;
