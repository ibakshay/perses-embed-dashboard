import "./Sidebar.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Sidebar({ onSelect }: { onSelect: (item: string) => void }) {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      slotProps={{
        paper: { sx: { backgroundColor: "#000", color: "#fff" } },
      }}
    >
      <List>
        <ListItemButton key="Dashboard" onClick={() => onSelect("Dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
