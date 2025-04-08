import { Flex } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import classes from "../../assets/css/app.module.css";

const FloatingButton = () => {
  return (
    <Flex
      className={classes.scrollindicator}
      p={"xs"}
      style={{ zIndex: 60 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IconArrowUp stroke={2} />
    </Flex>
  );
};

export default FloatingButton;
