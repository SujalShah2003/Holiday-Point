import {
  AppShell,
  AppShellFooter,
  Box,
  Center,
  Container,
  Loader,
} from "@mantine/core";
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
import Service from "./view/components/Service";
import Testimonals from "./view/components/Testimonals";
import ContactUs from "./view/components/ContactUs";
import Footer from "./view/footer/Footer";
import { ToastContainer } from "react-toastify";

export function App() {
  const [opened, { toggle }] = useDisclosure();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Center h="100vh" w="100vw">
        <Loader color="blue" size="lg" />
      </Center>
    );
  }
  return (
    <>
      <AppShell
        header={{ height: 80 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
      >
        {/* Header */}
        <AppShell.Header withBorder>
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
          <Banner
            opened={opened}
            toggle={toggle}
            scrollToSection={scrollToSection}
          />
          <Box p={"var(--mantine-spacing-xs) var(--mantine-spacing-lg)"}>
            <Container
              className={classes.scrolltarget}
              id="about_us"
              size="full"
            >
              <AboutUs />
            </Container>
            <Container
              className={classes.scrolltarget}
              id="domestic"
              size="full"
            >
              <DomesticPackages />
            </Container>
            <Container
              className={classes.scrolltarget}
              id="international"
              size="full"
            >
              <InternationalPackages />
            </Container>
            <Container
              className={classes.scrolltarget}
              id="service"
              size="full"
            >
              <Service />
            </Container>
            <Container
              className={classes.scrolltarget}
              id="testimonials"
              size="full"
            >
              <Testimonals />
            </Container>
            <Container
              className={classes.scrolltarget}
              id="contact_us"
              size="full"
            >
              <ContactUs />
            </Container>

            <Footer scrollToSection={scrollToSection} />
          </Box>

          {showScrollTop && <FloatingButton />}
        </AppShell.Main>
      </AppShell>

    </>
  );
}

export default App;
