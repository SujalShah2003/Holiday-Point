import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AppShell, Box, Center, Container, Loader } from "@mantine/core";
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
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "./view/admin/AdminPanel";
// import AdminPanel from "./view/admin/AdminPanel";

function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToSection = (id: any) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    toggle();
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
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
      <AppShell.Header withBorder>
        <WebHeader
          opened={opened}
          toggle={toggle}
          scrollToSection={scrollToSection}
        />
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <MobileNavbarHeader scrollToSection={scrollToSection} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Banner
          opened={opened}
          toggle={toggle}
          scrollToSection={scrollToSection}
        />
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
          <Container className={classes.scrolltarget} id="service" size="full">
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
  );
}

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
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
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
