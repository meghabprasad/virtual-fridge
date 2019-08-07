import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: "500px",
    maxWidth: "225px",
    float: "left",
    margin: "10px"

  },
  media: {
    height: 0,
    paddingTop: "20px" // 16:9

  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  // image: {
  //   width: "100px",
  //   height: "100px"
  // }
}));

export default function ItemCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        action={<IconButton aria-label="settings" />}
        title={props.name}
      />
      <CardContent>
        <Typography paragraph>Quantity: {props.quantity}</Typography>
        {/* <Typography paragraph>Expires in {props.expiration} days!</Typography> */}
      </CardContent>
      {/* <CardMedia className={classes.image}
        className={classes.media}
        image={props.imageLink}
        title={props.name}
      /> */}

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" />
        <IconButton aria-label="share" />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div data-id={props.id}>
          <Button
            data-id={props.id}
            color='primary'
            className='add-btn'>
            <span className='button-html' data-id={props.id} onClick={props.handleAdd}>
              <i className="material-icons">
                add_circle_outline
        </i>
              {/* Add 1 */}
            </span>
          </Button>
        {/* </div>
        <div data-id={props.id}> */}
          <Button
            data-id={props.id}
            color='secondary'
            className='remove-btn'
          >
            <span className='button-html' data-id={props.id} onClick={props.handleRemove}>
              <i className="material-icons">
                remove_circle_outline
        </i>
              {/* Remove 1 */}
           </span>
          </Button>
          <br />
          <Button
            data-id={props.id}
            color='secondary'
            className='delete-btn'
          >
            <span className='button-html2' data-id={props.id} onClick={props.handleDelete}>
              <i class="material-icons">
                delete
              </i>
              Delete Item
           </span>
          </Button>
        </div>
      </Collapse>
    </Card>
  );
}
