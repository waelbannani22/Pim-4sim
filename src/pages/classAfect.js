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
import Swal from 'sweetalert2'

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

export default class ClassAffect extends React.Component {
    state = {
        prop: []
    };

    componentDidMount() {
        axios.get('http://localhost:5000/admin/class/getclasses').then((res) => {
            const prop = res.data.data;
            this.setState({ prop });
           
        });
    }
    
    affect(id){
        var data2 = JSON.stringify({
            "idTeacher": sessionStorage.getItem("idT"),
            "idClasse": id
      
          });
          var config2 = {
            method: 'post',
            url: 'http://localhost:5000/admin/class/assignTeacher',
            headers: { 
                'Content-Type': 'application/json',
              
            },
            data: data2
          };
          axios(config2)
        .then(function (response1) {
         
         Swal.fire('Saved!', '', 'success')

          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
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
                            <CardActionArea >
                                <CardMedia
                                    onClick={
                                        (e)=>{
                                            Swal.fire({
                                                title: 'Do you want to assign this teacher to the class',
                                                showDenyButton: true,
                                                showCancelButton: true,
                                                confirmButtonText: 'Save',
                                                denyButtonText: `Don't save`,
                                              }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                 
                                                  this.affect(course.id)
                                                } else if (result.isDenied) {
                                                  Swal.fire('Changes are not saved', '', 'info')
                                                }
                                              })
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
