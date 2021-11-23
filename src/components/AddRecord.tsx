import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
}));

type Props = {
  path: string;
};

export const AddRecord = ({ path }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Tooltip title="Adicionar registro" aria-label="Adicionar registro">
        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => {history.push(`${path}/new`)}}>
          <AddIcon />
        </Fab>
    </Tooltip>
  );
};