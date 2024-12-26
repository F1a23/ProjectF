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
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserProfile } from "../Features/UserSlice"; // Removed unused imports
import { getUsers, deleteUser } from "../Features/ManageUserSlice";
import Location from "./Location";
import axios from "axios";
import * as ENV from "../config";
import User from "./User";
const ManageProfile = () => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userType, setuserType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(); // Correctly destructured `id`

  // Fetch user data
  const getUser = async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getUser/${id}`);
      const userData = response.data.user;

      setUserName(userData.name);
      setPwd(userData.password);
      setProfilePic(userData.profilePic);
      setConfirmPassword(userData.password);
      setuserType(userData.userType);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // Function to handle file input change
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  // Handle profile update
  const handleUpdate = (event) => {
    event.preventDefault();

    const userData = {
      email: user.email, // Assuming `user` contains the email
      name: userName,
      password: pwd,
      profilePic: profilePic,
      userType: userType,
    };

    console.log(userData);

    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    navigate("/ManageUsers");
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUsers());
    }
  }, [user]);
  return (
    <Container>
      <div className="profile-box">
        <Row>
          <Col md={5} className="pht">
            <User userData={user} />
            <Location />
          </Col>
          <Col md={7} className="pht">
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
                <Label for="userName">Name</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
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
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
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
                <Label for="usertype">User Type</Label>
                <Input
                  id="usertype"
                  name="usertype"
                  type="select"
                  value={userType}
                  onChange={(e) => setuserType(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Input>
              </FormGroup>
              <Button type="submit" color="primary">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ManageProfile;
