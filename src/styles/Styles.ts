import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MAIN_YELLOW, appBarHeight } from './Theme';

const Styles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    fullHeight: {
      height: '100%',
    },
    fullHeightAndWidth: {
      height: '100%',
      width: '100%',
    },
    loginGrid: {
      padding: 20,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: theme.palette.secondary.main,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: 'none',
      borderBottom: '0px',
      height: appBarHeight,
    },
    drawer: {
      width: theme.spacing(36),
    },
    drawerPaper: {
      width: 'inherit',
      backgroundColor: theme.palette.primary.main,
      marginTop: '45px',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
    linkHover: {
      cursos: 'pointer',
      '&:hover': {
        color: MAIN_YELLOW,
        textDecoration: 'none',
      },
    },
    yellowIconOnHover: {
      '&:hover': {
        '& > .MuiGrid-item': {
          '& > .MuiIconButton-root': {
            color: MAIN_YELLOW,
          },
        },
      },
    },
    tableCellSpecial: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    clickableTableRow: {
      '&:hover': {
        '& $tableCellSpecial': {
          '& a': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    card: {
      minWidth: 300,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    active: {
      color: theme.palette.primary.main,
    },
    drawerItem: {
      borderRadius: '100px !important',
    },
    activeDrawerItem: {
      background: theme.palette.primary.main,
      borderRadius: '100px !important',
      color: theme.palette.common.black,
      height: '40px',
    },
    drawerTextItem: {
      fontSize: '1.20em',
    },
    loginPaper: {
      padding: 20,
      height: '60vh',
      width: 320,
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.primary.main,
    },
    containerPaper: {
      padding: 20,
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      width: 320,
      margin: '20px auto',
    },
    menuPaper: {
      marginRight: theme.spacing(2),
    },
    progressBar: {
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.palette.background.default,
    },
    disabled: {
      color: theme.palette.background.default,
    },
    dialog: {
      width: 500,
      overflow: 'hidden',
      height: '100%',
    },
    addIcon: {
      marginTop: 10,
      marginBottom: 20,
      padding: 2,
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
      },
    },
    progressBarBuffer: {
      background: theme.palette.background.default,
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: theme.palette.success.main,
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiLinearProgress-dashedColorPrimary': {
        backgroundImage: 'radial-gradient(#fff 0%, #fff 0%, transparent 0%)',
      },
    },
    progressBarHour: {
      background: theme.palette.background.default,
      '& .MuiLinearProgress-colorPrimary': {
        backgroundColor: theme.palette.background.default,
      },
      '& .MuiLinearProgress-bar1Determinate': {
        backgroundColor: theme.palette.info.main,
      },
      '& .MuiLinearProgress-bar1Buffer': {
        backgroundColor: theme.palette.info.dark,
      },
      '& .MuiLinearProgress-bar2Buffer': {
        backgroundColor: theme.palette.info.main,
      },
      '& .MuiLinearProgress-dashedColorPrimary': {
        backgroundImage: 'radial-gradient(#fff 0%, #fff 0%, transparent 0%)',
      },
    },
    progressBarCircular: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      color: theme.palette.primary.main,
      '& .MuiCircularProgress-circleDeterminate': {
        color: theme.palette.primary.main,
      },
    },
    inputDisabled: {
      '&.Mui-disabled': {
        color: 'white',
        '&.MuiInput-underline:before': {
          borderBottom: 'hidden',
        },
      },
    },
    nakedInput: {
      '&.MuiInput-underline:before': {
        borderBottom: 'hidden',
      },
    },
    inputLabelDisabled: {
      '&.Mui-disabled': {
        color: 'rgba(255, 255, 255, 0.7)',
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left',
      },
    },
    checkboxDisabled: {
      '&.Mui-disabled': {
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-checked': {
          color: MAIN_YELLOW,
        },
      },
    },
    boxFormControlLabelDisabled: {
      '& > .MuiGrid-item': {
        '& > .MuiFormControl-root': {
          '& > .MuiFormGroup-root': {
            '& > .MuiFormControlLabel-root': {
              '& > .MuiFormControlLabel-label': {
                '&.Mui-disabled': {
                  color: 'white',
                },
              },
            },
          },
        },
      },
    },
    boxWithScroll: {
      maxHeight: '40vh',
      minHeight: '40px',
      overflowX: 'hidden',
      overflowY: 'auto',
      '&::-webkit-scrollbar-corner': {
        display: 'none',
      },
    },
    smallIconStyledDisabled: {
      '& > .MuiIconButton-root': {
        padding: '4px',
        '&.Mui-disabled': {
          display: 'none',
        },
      },
    },
    smallIcon: {
      '& > .MuiIconButton-root': {
        padding: '4px',
      },
    },
    clickable: {
      cursor: 'pointer',
    },
    clickableWithHover: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transition: '0.1s',
      },
    },
    outerDiv: {
      '&:hover': {
        '& $photoIcon': {
          color: 'white',
          transition: '0.5s',
        },
        '& $avatar': {
          opacity: '0.5',
          transition: '0.5s',
        },
      },
    },
    photoIcon: {
      position: 'absolute',
      color: 'transparent',
    },
    timelimeRoot: {
      padding: '0px 8px',
    },
    buttonDisabled: {
      '&:disabled': {
        background: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
  }));
  
  export default Styles;