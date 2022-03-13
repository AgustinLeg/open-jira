import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import CloseIcon from "@mui/icons-material/Close";


import { useUIContext } from "../../context/ui";

const menuItems: string[] = ["inbox", "Starred", "Send Email", "Drafts"];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useUIContext();

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <DrawerHeader>
        <Typography variant="h4">Menú</Typography>
        <IconButton onClick={closeSideMenu}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}></Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={`menu-item-${text}`}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={`menu-item-${text}`}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
