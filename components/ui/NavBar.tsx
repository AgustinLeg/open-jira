import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useUIContext } from "../../context/ui";
import NextLink from "next/link";

export const NavBar = () => {
  const { openSideMenu } = useUIContext();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="none" color="white">
            <Typography variant="h6">OpenJira </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
