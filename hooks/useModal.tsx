import { useEffect, useState } from "react";

const useModal = (isInitiallyActive: boolean) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const toggleModalActive = (toSet?: string) => {
    if (toSet === "open") {
      setIsModalActive(() => true);
    } else if (toSet === "close") {
      setIsModalActive(() => false);
    } else {
      setIsModalActive((prevState) => !prevState);
    }
  };

  useEffect(() => {
    setIsModalActive(isInitiallyActive);
  }, [isInitiallyActive]);

  return { show: isModalActive, toggleShow: toggleModalActive };
};

export default useModal;
