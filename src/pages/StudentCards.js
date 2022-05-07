import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardActionArea from '@mui/material/CardActionArea';
import { Link as RouterLink } from 'react-router-dom';
import { Container , Stack} from '@mui/material';
import axios from 'axios';
import { isUndefined } from 'lodash';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default class StudentCards extends React.Component {
  state = {
    prop: []
  };

  componentDidMount() {
    var data2 = JSON.stringify({
        "idClasse": JSON.parse(JSON.parse(sessionStorage.getItem("class")).class).id
     

    });
    const headers = { 
      'Content-Type': 'application/json',
  };
    axios.post('http://localhost:5000/admin/fetchStudentsInX',data2,{headers}).then((res) => {
      const prop = res.data.data;
      this.setState({ prop });
    });
  }
  
  render() {
    return (
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={2}
          sx={{ mb: 5 }}
        >
          {this.state.prop.map((user) => (
            <Card sx={{ maxWidth: 345, my: 3 }} direction="row" spacing={1}  >
              <CardHeader
               
               
                title={user.firstname+" "+user.lastname}
                subheader={user.claaseName}
              />
              <CardActionArea component={RouterLink} to="/dashboard/StudentRendu">
                <CardMedia
                 component="img"
              sx={{ width:345, height: 200 }} 
              
              image={isUndefined(user.image)  ?"http://localhost:5000/uploads/avatarw.png":"http://localhost:5000/"+user.image}
              onClick={(e)=>{sessionStorage.setItem("studentselected",JSON.stringify(user)) ;
            
                
            }}
                />
              
              </CardActionArea>
              <CardActions disableSpacing>
               
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Container>
    );
  }
}
