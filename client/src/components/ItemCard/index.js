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
import Button from '@material-ui/core/Button';
import { fontFamily } from "@material-ui/system";
import axios from "axios";
import Thumbnail from '../thumbnail';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: '8vw',
    minHeight: "12vw",
    maxHeight: "12vw",
    maxWidth: "8vw",
    float: "left",
    margin: "1vw"

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
  image: {
    width: "50px",
    height: "50px",
    borderRadius: '20px',
  }
}));

export default function ItemCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  // function convertIngredientToImage(str) {
  //   console.log()
  //   axios.get('https://pixabay.com/api/?key=13232685-3497331870f507199a8b8b2b7&q=' + str + '&image_type=photo')
  //       .then(res => {
  //           console.log("Response", res);
  //           // console.log("Our url", res.data.hits[0].largeImageURL);
  //           if (res.data.hits) {
  //               if (res.data.hits[0]) {
  //                   console.log("Our url", res.data.hits[0].largeImageURL);
  //                   return res.data.hits[0].largeImageURL;
  //               }
  //           }
  //           else {
  //               return "";
  //           }
  //       })
    //console.log("This function ran");
    // return 'https://pixabay.com/get/57e7d44b4856a814f6da8c7dda79367d173cdce35b546c4870297ed6974ecc50b1_1280.jpg';
    // return 'https://pixabay.com/get/55e5d1444a55a414f6da8c7dda79367d173cdce35b546c4870297ed69748c55fba_1280.jpg';
// }

  return (
    <Card raised className={classes.card}>
      <CardHeader
        action={<IconButton aria-label="settings" />}
        title={props.name.toUpperCase()}
        titleTypographyProps={{
          align:'center',
          variant:'overline',
          display:'inline',
          classes:'card-header'
        }}
      />
      <CardContent>
        <Typography variant='subtitle2' align='center'>Quantity: {props.quantity}</Typography>
        {/* <Typography paragraph>Expires in {props.expiration} days!</Typography> */}
      </CardContent>
      <CardMedia className={classes.image}
        className={classes.media}
        
        // image={props.imageLink}
        title={props.name}
      ><Thumbnail name = {props.name}></Thumbnail></CardMedia>

      <CardActions disableSpacing>
      <div data-id={props.id}>
          <Button
            data-id={props.id}
            color='primary'
            className='add-btn'>
            <div className='button-html' data-id={props.id} onClick={props.handleAdd}>
              <i className="material-icons" data-id={props.id}>
                add_circle_outline
        </i>
              {/* Add */}
            </div>
          </Button>
        {/* </div>
        <div data-id={props.id}> */}
          <Button
            data-id={props.id}
            color='secondary'
            className='remove-btn'
          >
            <div className='button-html' data-id={props.id} onClick={props.handleRemove}>
              <i className="material-icons" data-id={props.id}>
                remove_circle_outline
        </i>
              {/* Remove */}
           </div>
          </Button>
          <br />
          <Button
            data-id={props.id}
            color='secondary'
            className='delete-btn'
          >
            <span className='button-html2' data-id={props.id} onClick={props.handleDelete}>
              <i class="material-icons" data-id={props.id}> 
                delete
              </i>
              Delete Item
           </span>
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
