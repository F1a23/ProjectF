import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import User from "./User";
import { updateUserProfile } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import { logout } from "../Features/UserSlice";
import Location from "./Location";
import { getUsers } from "../Features/ManageUserSlice";
import user from "../images/user.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as ENV from "../config";

const ManageProfile = () => {
  const [user, setUser] = useState({});

  const id = useParams().id;
  //state
  const [userName, setUserName] = useState("");

  const [pwd, setPwd] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePic, setProfilePic] = useState("");

  const [userType, setuserType] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const handleUpdate = (event) => {
    // Prevent the default form submission behavior

    event.preventDefault();

    // Prepare the user data object with the current user's email and updated details

    const userData = {
      email: user.email, // Retrieve email from the Redux store

      name: userName, // Get the updated name from the state variable

      password: pwd, // Get the updated password from the state variable

      profilePic: profilePic,

      userType: userType,
    };

    console.log(userData);

    // Dispatch the updateUserProfile action to update the user profile in the Redux store

    dispatch(updateUserProfile(userData));

    alert("Profile Updated.");

    // Navigate back to the profile page after the update is completed

    navigate("/ManageUsers");
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);

  //function
  const getUser = async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getUser/${id}`);

      const user = response.data.user;

      //console.log(user);

      setUserName(user.name);

      setPwd(user.password);

      setProfilePic(user.profilePic);

      setConfirmPassword(user.password);

      setuserType(user.userType);

      setUser(user);

      console.log(user);
    } catch (error) {
      console.log(user);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);
  return (
    <Container>
      <div className="profile-box">
        <Row>
          <Col md={5} className="h22">
            <User userData={user} />
            <Location />
          </Col>
          <Col md={7} className="form-groupsn">
            <Form onSubmit={handleUpdate} className="profile-form">
              <FormGroup>
                <Label for="Upload Photo">Upload Photo</Label>
                <Input
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  className="profile-input"
                />
              </FormGroup>

              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Name..."
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password..."
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password..."
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="usertype">User Type</Label>

                <select
                  id="usertype"
                  name="usertype"
                  value={userType}
                  onChange={(e) => setuserType(e.target.value)}
                >
                  <option value="user">User</option>

                  <option value="admin">Admin</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Button color="primary" className="button" type="submit">
                  Update Profile
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ManageProfile;
