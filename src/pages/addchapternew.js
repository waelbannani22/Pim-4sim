import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Container, Modal, Stack } from '@mui/material';
import { ChapterModal } from '../pages';
import { PdfViewer } from '../pages';
import axios from 'axios';
import PDFViewer from 'pdf-viewer-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import HomeWork from './HomeWork';
import { PDFReader } from 'reactjs-pdf-reader';

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

export default class AddChapterNew extends React.Component {
  state = {
    prop: [],
    c : ''
    
  };

  componentDidMount() {
    var da =JSON.parse(sessionStorage.getItem("class"))._id;
    axios.post('http://localhost:5000/api/resource/findbylesson',{lesson : da}).then((res) => {
      const prop = res.data.data;
      this.setState({ prop });
    });
  }
  deleteRow(id, e) {
    e.preventDefault();
    const resourceID = id;
    axios.post('http://localhost:5000/api/resource/delete', { resourceID: id }).then((res) => {
      console.log(res);
      console.log(res.data);
      const prop = this.state.prop.filter((item) => item._id !== id);
      this.setState({ prop });
    });
  }

  render() {
    return (
      <Container>
        <Container>
          <Stack direction="row" justifyContent="space-between" mb={5} >
            <ChapterModal />

          </Stack>
        </Container>
        <br />

        <Container>
          <Stack
            direction="column"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-around"
            paddingTop={2}
            sx={{ mb: 5 }}
          >
            {this.state.prop.map((resource) => (
              <Card sx={{ maxWidth: 1200 }} direction="row" spacing={1}>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingTop={2}
                  sx={{ mb: 5 }}
                >
                  <CardHeader title={resource.name} />

                  <Button
                    onClick={(e) => this.deleteRow(resource._id, e)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </Stack>

                <CardContent  >
                  <Typography paragraph>{resource.description}</Typography>
                  <PDFViewer 
                 

                    document={{
                      url : "http://localhost:5000/"+resource.pdfname,
                    }}

                  />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Container>
    );
  }
}
