import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";

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
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    page: {
        width: '100%'
    }
  })
);

function NavigationBar({children}: NavigationBarProps) {
  const classes = useStyles();
  const history = useHistory();
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
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
          <Typography variant="h5">Opções</Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        {children}
      </div>

    </div>
  );
}

export default NavigationBar;
