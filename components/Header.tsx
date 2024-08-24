import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HouseSwitcher from "./HouseSwitcher";

type House = "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw";

const Header: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [preferredHouse, setPreferredHouse] = useState<House>();

  //The code to get values from local storage should only run on the client where the window object is defined.
  useEffect(() => {
    const savedValue = window.localStorage.getItem("preferredHouse") as House;
    setPreferredHouse(savedValue ? savedValue : null);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const appBarColor = (preferredHouse: string) => {
    switch (preferredHouse) {
      case "Gryffindor":
        return "error";
      case "Slytherin":
        return "success";
      case "Hufflepuff":
        return "warning";
      case "Ravenclaw":
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <AppBar position="static" color={appBarColor(preferredHouse)}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/allcharacters"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.secondary",
              textDecoration: "none",
            }}
          >
            Harry Protter
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href={"/allcharacters"}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {t("allcharacters")}
                  </Typography>
                </MenuItem>
              </Link>
              <Link href={"/mycharacters"}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {t("mycharacters")}
                  </Typography>
                </MenuItem>
              </Link>

              {session?.user?.role === "ADMIN" && (
                <Link href={"/statistics"}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }} />
                      {t("statsbutton")}
                    </Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/allcharacters"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.secondary",
              textDecoration: "none",
            }}
          >
            Harry Protter
          </Typography>

          <Box
            sx={{
              color: "secondary",
              gap: 1,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link href={"/allcharacters"}>
              <Button color="secondary">{t("allcharacters")}</Button>
            </Link>

            <Link href={"/mycharacters"}>
              <Button color="secondary">{t("mycharacters")}</Button>
            </Link>

            {session?.user?.role === "ADMIN" && (
              <Link href={"/statistics"}>
                <Button
                  startIcon={
                    <AdminPanelSettingsIcon fontSize="small" color="inherit" />
                  }
                  color="secondary"
                >
                  {t("statsbutton")}
                </Button>
              </Link>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {session ? (
                  <Avatar alt={session.user.name} src={session.user.image} />
                ) : (
                  <Avatar alt="Profile" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <LanguageSwitcher />
              <HouseSwitcher
                preferredHouse={preferredHouse}
                setPreferredHouse={setPreferredHouse}
              />
              {/* <MenuItem onClick={colorMode.toggleColorMode}>
                <Button>{t("changethemebutton")}</Button>
              </MenuItem> */}
              {session ? (
                <MenuItem
                  onClick={() =>
                    signOut({ redirect: false }).then(() => {
                      router.push("/api/auth/signin");
                    })
                  }
                >
                  <Typography textAlign="center">
                    <Button>Log out</Button>
                  </Typography>
                </MenuItem>
              ) : (
                <Link href="/api/auth/signin">
                  <MenuItem>
                    <Button>Log in</Button>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
