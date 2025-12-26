import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  message,
  Card,
  Spin,
  Switch,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { createTemple } from "@/utils/API";

const { TextArea } = Input;

const AddTempleForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleSubmit = async () => {
    // Validate required fields
    if (!name.trim()) {
      message.error("Please enter temple name");
      return;
    }

    if (!place.trim()) {
      message.error("Please enter temple location");
      return;
    }

    if (!purpose.trim()) {
      message.error("Please enter temple purpose");
      return;
    }

    setLoading(true);
    try {
      const formData = {
        name: name.trim(),
        place: place.trim(),
        purpose: purpose.trim(),
        isActive,
      };

      const res = await createTemple(formData);
      if (res.data.status) {
        message.success("Temple created successfully");
        navigate("/admin/temple");
      } else {
        message.error(res.data.message || "Server Error");
      }
    } catch (error: any) {
      console.error("Error creating temple:", error);
      message.error(error.response?.data?.message || "Failed to create temple. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Add New Temple</h2>
        </Col>
        <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
          <Link to={"/admin/temple"}>
            <button className="flex justify-center py-2! w-full btn-brand">
              <FaArrowLeft className="mr-2" />
              <div className="mx-2!">Back</div>
            </button>
          </Link>
        </Col>
      </Row>

      <Form form={form} className="bg-white border-0!" onFinish={handleSubmit}>
        <Card className="p-1!">
          <Row className="bg-white rounded-md" style={{ marginLeft: 0, marginRight: 0 }}>
            
            {/* Temple Information */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">
                Temple Information
              </h3>
            </Col>

            {/* Temple Name */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col
                  xs={24}
                  sm={24}
                  md={4}
                  className="flex justify-start mr-4 bg-white"
                >
                  <label className="font-bold">
                    Temple Name <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please enter temple name" },
                      { min: 3, message: "Name must be at least 3 characters" },
                      { max: 100, message: "Name must not exceed 100 characters" },
                    ]}
                    initialValue={name}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={name}
                      placeholder="Enter temple name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Enter the official name of the temple
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Location/Place */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col
                  xs={24}
                  sm={24}
                  md={4}
                  className="flex justify-start mr-4 bg-white"
                >
                  <label className="font-bold">
                    Location <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="place"
                    rules={[
                      { required: true, message: "Please enter temple location" },
                      { min: 3, message: "Location must be at least 3 characters" },
                      { max: 100, message: "Location must not exceed 100 characters" },
                    ]}
                    initialValue={place}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={place}
                      placeholder="e.g., Varanasi, Uttar Pradesh"
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Enter city and state where the temple is located
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Purpose */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col
                  xs={24}
                  sm={24}
                  md={4}
                  className="flex justify-start mr-4 bg-white"
                >
                  <label className="font-bold">
                    Purpose <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="purpose"
                    rules={[
                      { required: true, message: "Please enter temple purpose" },
                      { min: 10, message: "Purpose must be at least 10 characters" },
                      { max: 500, message: "Purpose must not exceed 500 characters" },
                    ]}
                    initialValue={purpose}
                  >
                    <TextArea
                      rows={4}
                      className="rounded border"
                      value={purpose}
                      placeholder="Describe the purpose and significance of this temple..."
                      onChange={(e) => setPurpose(e.target.value)}
                      maxLength={500}
                      showCount
                    />
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Describe why this temple is important, what ceremonies are performed, etc.
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Settings Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Settings</h3>
            </Col>

            {/* Active Status */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col
                  xs={24}
                  sm={24}
                  md={4}
                  className="flex justify-start mr-4 bg-white"
                >
                  <label className="font-bold">Status</label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="flex items-center justify-between">
                    <span>Temple Active</span>
                    <Switch checked={isActive} onChange={setIsActive} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isActive
                      ? "This temple will be visible to visitors"
                      : "This temple will be hidden from visitors"}
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Submit Button */}
            <Col span={24} className="buttons mt-6">
              <button
                disabled={loading}
                className={`bg-blue-500 hover:bg-blue-700 text-white! font-bold py-2 px-4 rounded ${loading && 'bg-gray-800!'}`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spin size="small" />
                    <span className="ml-2!">Creating Temple...</span>
                  </div>
                ) : (
                  "Create Temple"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AddTempleForm;