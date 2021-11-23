import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";

type NavigationBarProps = {
  children: React.ReactNode;
};

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      //width: `calc(100% - ${drawerWidth}px)`,
      width: "100%",
      position: "fixed",
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "#478bc9",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#478bc9",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    page: {
      width: "100%",
    },
  })
);

function NavigationBar({ children }: NavigationBarProps) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const menuItems = [
    {
      name: "funcionarios",
      text: "Funcionários",
      path: "/funcionarios",
    },
    {
      name: "dependentes",
      text: "Dependentes",
      path: "/dependentes",
    },
    {
      name: "cursos",
      text: "Cursos",
      path: "/cursos",
    },
    {
      name: "inscricaoCursos",
      text: "Inscrição de Cursos",
      path: "/inscricoes",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar color="primary" elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} edge="start">
            {" "}
            <MenuIcon />{" "}
          </IconButton>
          <Link
            to={"/home"}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sistema de Gerenciamento
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
            >
              <ListItemText primary={item.text} style={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default NavigationBar;
