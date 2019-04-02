import * as React from 'react';
import { rgba } from 'polished';

import { MoreVert } from '@material-ui/icons';
import {
  Card,
  Grow,
  Paper,
  Theme,
  Button,
  Popper,
  MenuItem,
  MenuList,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
  CardActions,
  CardContent,
  CardActionArea,
  ClickAwayListener,
} from '@material-ui/core';

import { Board } from '../../../../redux/types';
import { useMenu } from '../../../../hooks/state';

const useStyles = makeStyles((theme: Theme) => ({
  cardMedia: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -46,
    opacity: 0.35,
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
  },
  cardActions: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: rgba(theme.palette.background.paper, 0.7),
    justifyContent: 'space-between',
  },
}));

export default function BoardItem({ id, name, image }: Board) {
  const styles = useStyles();
  const [open, anchorEl, onShow, onHide] = useMenu<HTMLButtonElement>();

  return (
    <Card>
      <CardActionArea>
        <CardMedia image={image} className={styles.cardMedia} />

        <CardContent className={styles.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={styles.cardActions}>
        <Button size="small" color="primary">
          Open
        </Button>

        <IconButton ref={anchorEl} onClick={onShow} size="small" color="primary">
          <MoreVert />
        </IconButton>
      </CardActions>

      <Popper open={open} anchorEl={anchorEl.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={onHide}>
                <MenuList>
                  <MenuItem onClick={onHide}>Profile</MenuItem>
                  <MenuItem onClick={onHide}>My account</MenuItem>
                  <MenuItem onClick={onHide}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Card>
  );
}
