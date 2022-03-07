import React from 'react';
import { Container, Button, Stack } from '@mui/material';
import DefaultUserPic from "src/assets/img/imgplac.png";
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            image: this.props.image,
            phone: this.props.phone,
            uploadedFile: null
        }
    }

    fetchUserDetails = (user_id) => {
        //console.log(user_id);
        var data = {
            "id": user_id
        }
        axios.post("http://localhost:5000/api/auth/findbyid", {
            headers: {
                "content-type": "application/json"
            }, data: data
        }).then(res => {
            console.log(res);
            this.setState({ email: res.data.data.email });
            this.setState({ image: res.data.data.image })
        })
            .catch(err => console.log(err))
    }

    changeProfileImage = (event) => {

        this.setState({ uploadedFile: event.target.files[0] });
    }

    UpdateProfileHandler = (e) => {
        e.preventDefault();
        //create object of form data
        const formData = new FormData();
        formData.append("profileImage", this.state.uploadedFile);
        formData.append("user_id", this.state.user_id);

        //update-profile
        axios.post("http://localhost:5000/userapi/update-profile/", formData, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            this.setState({ msg: res.data.message });
            this.setState({ profileImage: res.data.results.profileImage });
        })
            .catch(err => console.log(err))
    }


    componentDidMount() {
        this.fetchUserDetails(this.state.user_id);
    }

    render() {

        if (this.state.profileImage) {
            var imagestr = this.state.profileImage;
            imagestr = imagestr.replace("public/", "");
            var profilePic = "http://localhost:5000/" + imagestr;
        } else {
            profilePic = DefaultUserPic;
        }

        return (
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
                        <img src={profilePic} alt="profils pic" />
                    </Stack>
                    <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
                        <h1>User Profile</h1>
                        <Form className="form">
                            <p>{this.state.msg}</p>
                            <Form.Group controlId="formCategory1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.username} />

                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={this.state.email} />

                            </Form.Group>

                            <Form.Group controlId="formCategory4">
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage} />
                            </Form.Group>
                            <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
                        </Form>
                    </Stack>

                </Stack>
            </Container>
        )
    }
}





export default UserProfile;