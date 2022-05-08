import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Container, Modal, Stack } from '@mui/material';
import { ChapterModal } from '../pages';
import axios from 'axios';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import data from '@iconify/icons-eva/menu-2-fill';
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
//const defaultLayoutPluginInstance = new defaultLayoutPlugin();

export default class AddChapterNew extends React.Component {
  state = {
    prop: [],
    c: ''
  };

  componentDidMount() {
    var data2 = JSON.stringify({
      "lesson": sessionStorage.getItem("idcourse").toString()


    });
    const headers = {
      'Content-Type': 'application/json',
    };
    axios.post('http://localhost:5000/api/resource/findbylesson', data2, { headers }).then((res) => {
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
  sendnoti(){
    var data3 = ({
      "title": "videochat added to "+ JSON.parse(sessionStorage.getItem("class")).title,
      "description": localStorage.getItem("linkchat"),
      "type": "mail",
      "users": JSON.parse(sessionStorage.getItem("listid")),
      
      "motif" : "new videochat "
    });
    const headers = {
      'Content-Type': 'application/json',
    };
    axios.post('http://localhost:5000/api/notifications/createnotification', data3,{headers}).then((res) => {
      console.log(res);
      console.log(res.data);
      
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Stack direction="column" justifyContent="space-between" >
            {sessionStorage.getItem("role") == "teacher" ? (
              <div>
                <ChapterModal />

                <Button
                  variant="contained"
                  component={RouterLink}
                  onClick={console.log("hiii")}
                  to="/dashboard/videochat"
                  startIcon={<Icon icon={plusFill} />}
                >
                  Create new video call
                </Button>

              </div>
            ) : (null
            )}

          </Stack>
        </Container>
        <br />

        <Container>
          <Stack
            // direction="column"
            // flexWrap="wrap"
            // alignItems="center"
            // justifyContent="space-around"
            paddingTop={2}
          // sx={{ mb: 5 }}
          >
            {this.state.prop.map((resource) => (
              <Card paddingTop={2} sx={{ mb: 5 }} spacing={1}>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingTop={2}
                  sx={{ mb: 5 }}
                >
                  <CardHeader title={resource.name} />
                  <div>
                    {sessionStorage.getItem('role') == 'teacher' ? (
                      <Button
                        onClick={(e) => this.deleteRow(resource._id, e)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </Stack>

                <CardContent>
                  <Typography paragraph>{resource.description}</Typography>
                  <div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                      <Viewer fileUrl={'http://localhost:5000/' + resource.pdfname} />
                    </Worker>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </div>
    );
  }
}