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
    axios.get('http://localhost:5000/api/resource/').then((res) => {
      const prop = res.data.response;
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
      <div>
        <Container>
          <Stack>
            <ChapterModal />
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
