import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  message,
  Card,
  Spin,
  Button,
  Switch,
  Modal,
  Radio,
  DatePicker,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import dayjs from "dayjs";
import { editUserData, updateUserData, updateUserPassword } from "@/utils/API";
import TextArea from "antd/es/input/TextArea";

const { Password } = Input;

interface UserData {
  _id: string;
  email: string;
  username: string;
  dob: string;
  gender: string;
  mobile: string;
  role: number;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const EditUserForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Form states
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [dob, setDob] = useState<any>(null);
  const [gender, setGender] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  // const [role, setRole] = useState<number>(2);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Password reset states
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [resettingPassword, setResettingPassword] = useState<boolean>(false);

  // // Country options
  // const countryOptions = [
  //   "India",
  //   "United States",
  //   "United Kingdom",
  //   "Canada",
  //   "Australia",
  //   "Germany",
  //   "France",
  //   "Japan",
  //   "China",
  //   "Russia",
  //   "Brazil",
  //   "Other"
  // ];

  // Fetch existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      setFetching(true);
      try {
        const response = await editUserData(id);
        if (response.data.status) {
          const data: UserData = response.data.data;

          setEmail(data.email || "");
          setUsername(data.username || "");
          setMobile(data.mobile || "");
          setDob(data.dob || "");
          setGender(data.gender || "");
          setPincode(data.pincode || "");
          setCountry(data.country || "");
          setState(data.state || "");
          setCity(data.city || "");
          setAddress(data.address || "");
          // setRole(data.role || 2);
          setIsActive(data.isActive !== undefined ? data.isActive : true);
        }

      } catch (error) {
        console.error("Error fetching user:", error);
        message.error("Failed to load user data");
        navigate("/admin/user");
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!id) return;

    // Mobile validation (optional)
    if (mobile && !/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
      message.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("username", username);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("mobile", mobile);
      formData.append("pincode", pincode);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("address", address);
      // formData.append("role", role.toString());
      formData.append("isActive", isActive.toString());

      await updateUserData(id, formData);
      message.success("User updated successfully");
      navigate("/admin/users");
    } catch (error: any) {
      console.error("Error updating user:", error);
      if (error.message?.includes("email already exists")) {
        message.error("Email already exists. Please use a different email.");
      } else {
        message.error("Failed to update user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!id) return;

    // Password validation
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      message.error("Password must be at least 6 characters long");
      return;
    }

    setResettingPassword(true);
    try {
      // const formData = new FormData();
      // formData.append("password", newPassword);

      await updateUserPassword(id, { password: newPassword });
      message.success("Password reset successfully");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Failed to reset password. Please try again.");
    } finally {
      setResettingPassword(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
        <span className="ml-4">Loading user data...</span>
      </div>
    );
  }

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Edit User</h2>
        </Col>
        <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
          <Link to={"/admin/users"}>
            <button className="flex justify-center !py-2 w-full btn-brand">
              <FaArrowLeft className="mr-2" />
              <div className="!mx-2">Back</div>
            </button>
          </Link>
        </Col>
      </Row>

      <Form form={form} className="bg-white !border-0" onFinish={handleSubmit}>
        <Card className="!p-1">
          <Row className="bg-white rounded-md" style={{ marginLeft: 0, marginRight: 0 }}>

            {/* Basic Information Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">User Information</h3>
            </Col>

            {/* Email */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Email <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                    initialValue={email}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      type="email"
                      value={email}
                      placeholder="user@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Username */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Username
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="username"
                    initialValue={username}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={username}
                      placeholder="Display name"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Gender */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Gender
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="gender" initialValue={'male'}>
                    <Radio.Group size="large" onChange={(e) => setGender(e.target.value)}>
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Date of Birth */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Date of Birth
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="dob">
                    <DatePicker
                      size="large"
                      className="w-full rounded border"
                      placeholder="Select date of birth"
                      format="DD-MM-YYYY"
                      onChange={(_date, dateString) => {
                        setDob(dateString);
                      }}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                      defaultValue={dob ? dayjs(dob, "DD-MM-YYYY") : undefined}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>



            {/* Password Reset Button */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Password
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Button
                    type="dashed"
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full"
                  >
                    Reset Password
                  </Button>
                  <div className="text-xs text-gray-500 mt-1">
                    Click to set a new password for this user
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Contact Information Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Contact Information</h3>
            </Col>

            {/* Mobile */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Mobile Number
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="mobile"
                    initialValue={mobile}
                    rules={[
                      {
                        pattern: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit mobile number',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={mobile}
                      placeholder="10-digit mobile number"
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Country */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Country
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="country"
                    initialValue={country}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={country}
                      placeholder="Enter Country"
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    {/* <Select
                      size="large"
                      className="rounded border"
                      value={country}
                      onChange={setCountry}
                      placeholder="Select country"
                      showSearch
                    // filterOption={(input, option) =>
                    //   (option?.children as string).toLowerCase().includes(input.toLowerCase())
                    // }
                    >
                      {countryOptions.map(country => (
                        <Option key={country} value={country}>{country}</Option>
                      ))}
                    </Select> */}
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* State */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    State
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="state"
                  // initialValue="India"
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      defaultValue={state}
                      placeholder="Enter State"
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* City */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    City
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="city"
                  // initialValue="India"
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      defaultValue={city}
                      placeholder="Enter City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Address */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Address
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="address"
                  // initialValue="India"
                  >
                    <TextArea
                      rows={4}
                      className="rounded border"
                      defaultValue={address}
                      placeholder={`Enter Address`}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {/* <Input
                      size="large"
                      className="rounded border"
                      defaultValue={address}
                      placeholder="Enter Address"
                      onChange={(e) => setAddress(e.target.value)}
                    /> */}
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Pincode */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Pincode/ZIP
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="pincode"
                    initialValue={pincode}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={pincode}
                      placeholder="Pincode or ZIP code"
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Settings Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Settings</h3>
            </Col>

            {/* Role */}
            {/* <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Role <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="role"
                    rules={[{ required: true, message: "Please select user role" }]}
                    initialValue={role}
                  >
                    <Select
                      size="large"
                      className="rounded border"
                      value={role}
                      onChange={setRole}
                      placeholder="Select role"
                    >
                      <Option value={1}>Admin</Option>
                      <Option value={2}>User</Option>
                    </Select>
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    {role === 1
                      ? "Admin users have full access to all features"
                      : "Regular users have limited access"}
                  </div>
                </Col>
              </Row>
            </Col> */}

            {/* Active Status */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Account Status
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="flex items-center justify-between">
                    <span>Active Account</span>
                    <Switch checked={isActive} onChange={setIsActive} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isActive
                      ? "User can login and use the application"
                      : "User account is disabled and cannot login"}
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Submit Button */}
            <Col span={24} className="my-6">
              <button
                disabled={loading}
                className={`bg-blue-500 hover:bg-blue-700 text-white! font-bold py-2 px-4 rounded ${loading && 'bg-gray-800!'}`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spin size="small" />
                    <span className="ml-2!">Updating User...</span>
                  </div>
                ) : (
                  "Update User"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>

      {/* Password Reset Modal */}
      <Modal
        title="Reset Password"
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password <span className="text-danger">*</span>
            </label>
            <Password
              size="large"
              className="w-full"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters long
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <Password
              size="large"
              className="w-full"
              value={confirmPassword}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={() => setShowPasswordModal(false)}
              className="rounded"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handlePasswordReset}
              loading={resettingPassword}
              className="rounded"
            >
              Reset Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditUserForm;