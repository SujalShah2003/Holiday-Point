import { AppShell, Box, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./assets/css/app.module.css";
import Banner from "./view/components/Banner";
import { useEffect, useState } from "react";
import AboutUs from "./view/components/AboutUs";
import FloatingButton from "./view/components/FloatingButton";
import DomesticPackages from "./view/components/DomesticPackages";
import InternationalPackages from "./view/components/InternationalPackages";
import WebHeader from "./view/header/WebHeader";
import MobileNavbarHeader from "./view/header/MobileNavbarHeader";

export function App() {
  const [opened, { toggle }] = useDisclosure();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToSection = (id: any) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    toggle();
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100); // show after 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      {/* Header */}
      <AppShell.Header withBorder={false}>
        <WebHeader
          opened={opened}
          toggle={toggle}
          scrollToSection={scrollToSection}
        />
      </AppShell.Header>

      {/* Mobile Navbar */}
      <AppShell.Navbar py="md" px={4}>
        <MobileNavbarHeader scrollToSection={scrollToSection} />
      </AppShell.Navbar>

      {/* Main Content with Sections */}
      <AppShell.Main>
        <Banner />
        <Box p={"var(--mantine-spacing-xs) var(--mantine-spacing-lg)"}>
          <Container className={classes.scrolltarget} id="about_us" size="full">
            <AboutUs />
          </Container>
          <Container className={classes.scrolltarget} id="domestic" size="full">
            <DomesticPackages />
          </Container>
          <Container
            className={classes.scrolltarget}
            id="international"
            size="full"
          >
            <InternationalPackages />
          </Container>
        </Box>

        {!opened && showScrollTop && <FloatingButton />}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
