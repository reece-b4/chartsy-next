"use client";

import {
  Button,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tooltip,
  MenuItem,
  Menu,
} from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import { useRouter } from "next/navigation";

const pages = ["Collections", "About", "ReadMe"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page?: string) => {
    setAnchorElNav(null);
    if (page) {
      const href = `/${page.toLowerCase()}`
        router.push(href);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      {/* breakpoint xl screen width - more padding on xl screens */}
      <Container maxWidth="xl">
        {/* padding provided by container */}
        <Toolbar disableGutters>
          {/* sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}:
            sx = "style extension and in example above handles display css property conditionally eg, extra small screen/mobile display none. md/medium screen size display flex". Margin right 1 (non conditionally) */}
          {/* MEDIUM */}
          <SsidChartIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          {/* MEDIUM */}
          {/* typography renders p or span by default-here we want an a tag to link to h-ref prop (currently placeholder) */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            // add route
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}>
            Chartsy
          </Typography>

          {/* SMALL */}
          {/* burger menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              //   description for screen readers
              aria-label="open navigation menu"
              //   points to id of linked element
              aria-controls="menu-appbar"
              //   signals button opens popup menu
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              //   position relative to anchorElNav which is set onClick of burger menu to itself in line above - this combined with transform origin dictates: align top left of Menu with bottom left of burger menu button
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              //   do not unmount on close: either to prevent heavy child components remounting or to keep state
              // TODO: ensure this is correct for my purposes once full implementation complete
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              //   open prop dictates when menu is open: when anchorElNav is not null - set onClick of burger menu icon
              open={Boolean(anchorElNav)}
              onClose={(e) => handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={(e) => handleCloseNavMenu(page)}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* SMALL */}
          <SsidChartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {/* SMALL */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}>
            Chartsy
          </Typography>
          {/* this is buttons: collections, about, readme on left side of bar */}
          {/* MEDIUM */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e)=>handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* profile image */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* alt uses child content first then first letter of string given as placeholder image */}
                {/* image src path starts from root eg: "/avatar.jpg" */}
                <Avatar alt="User name" src="/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
