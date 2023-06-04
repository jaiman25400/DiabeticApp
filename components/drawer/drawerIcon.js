import { useState, useEffect } from "react";
import { Drawer } from "react-native-paper";
import DrawerSection from "./drawer";

export default function DrawerIcon() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Drawer.CollapsedItem
        focusedIcon="menu"
        onPress={() => setActive(!active)}
      />
      {active ? <DrawerSection /> : null}
    </>
  );
}
