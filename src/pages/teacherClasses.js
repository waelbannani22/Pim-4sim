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
import { Container, Stack } from '@mui/material';
import axios from 'axios';
import ima from "../assets/img/838_gettyimages-1049266734.jpg"


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

export default class TeacherClasses extends React.Component {
    state = {
        prop: []
    };

    componentDidMount() {
        var data2 = JSON.stringify({
            "idTeacher": sessionStorage.getItem("id")
           
      
          });
          const headers = { 
            'Content-Type': 'application/json',
        };
         
        axios.post('http://localhost:5000/admin/class/getclassesteacher',data2,{headers}).then((res) => {
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
                    {this.state.prop.map((course) => (
                        <Card sx={{ maxWidth: 500, my: 3 }}   >
                            <CardHeader

                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={course.classeName}

                            />
                            <CardActionArea component={RouterLink} to="/dashboard/StudentClass" >
                                <CardMedia
                                    onClick={
                                        (e)=>{sessionStorage.setItem("classid",course.id)
                                        sessionStorage.setItem("class",course.classeName)
                                     }
                                     }
                                    //sessionStorage.setItem("classid",course.id)
                                    component="img"
                                    sx={{ width: 345, height: 200 }}
                                    image={ima}
                                    alt={course.classeName}
                                />
                                
                            </CardActionArea>
                            
                        </Card>
                    ))}
                </Stack>
            </Container>
        );
    }
}
