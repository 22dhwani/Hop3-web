import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import ShopProducts from "../ShopProducts";
import styles from "../../styles/Shop.module.scss";

const filterOptions = [
  {
    label: "All",
  },
  {
    label: "1-50",
  },
  {
    label: "51-150",
  },
  {
    label: "150-300",
  },
  {
    label: "300 and more",
  },
];

const Shop = () => {
  const [selectedOption, setSelectedOption] = useState("All");

  return (
    <>
      <MainLayout activeLink="/shop">
        <div className={styles.shop}>
          <div className={styles.header}>
            <div className={styles.title}>My balance </div>
            <div className={styles.balance}>
              My balance
              <strong>
                <Image
                  src="/vectors/icons/h.svg"
                  width={14}
                  height={14}
                  alt="h"
                />
                1,280
              </strong>
            </div>
          </div>

          <div className={styles.filterBy}>
            <div className={styles.label}>Filter by:</div>

            <div className={styles.filterOptions}>
              {filterOptions.map((el, idx) => {
                return (
                  <div
                    className={clsx(
                      styles.option,
                      el.label === selectedOption && styles.active
                    )}
                    key={"filter-option" + idx}
                    onClick={() => setSelectedOption(el.label)}
                  >
                    {el.label !== "All" && (
                      <Image
                        src="/vectors/icons/h.svg"
                        width={12}
                        height={12}
                        alt="h"
                      />
                    )}
                    {el.label}
                  </div>
                );
              })}
            </div>
          </div>

          <ShopProducts />
        </div>
      </MainLayout>
    </>
  );
};

export default Shop;
