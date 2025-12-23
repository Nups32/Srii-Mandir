import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  message,
  Card,
  Spin,
  Switch,
  Rate,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getReviewById, updateReview } from "@/utils/API";

const { TextArea } = Input;

interface ReviewData {
  _id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const EditReviewForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Form states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Fetch existing review data
  useEffect(() => {
    const fetchReviewData = async () => {
      if (!id) return;
      
      setFetching(true);
      try {
        const response = await getReviewById(id);
        if (response.data.status) {
            const data: ReviewData = response.data.data;
            
            setName(data.name || "");
            setEmail(data.email || "");
            setComment(data.comment || "");
            setRating(data.rating || 5);
            setIsActive(data.isActive !== undefined ? data.isActive : true);
        }
        
      } catch (error) {
        console.error("Error fetching review:", error);
        message.error("Failed to load review data");
        navigate("/admin/review");
      } finally {
        setFetching(false);
      }
    };

    fetchReviewData();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!id) return;
    
    // Validate required fields
    if (!name.trim()) {
      message.error("Please enter reviewer name");
      return;
    }

    if (!comment.trim()) {
      message.error("Please enter a review comment");
      return;
    }

    if (rating < 1 || rating > 5) {
      message.error("Please select a valid rating (1-5 stars)");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("email", email);
      formData.append("comment", comment);
      formData.append("rating", rating.toString());
      formData.append("isActive", isActive.toString());

      const res = await updateReview(id, formData);
      if (res.data.status) {
          message.success("Review updated successfully");
          navigate("/admin/review");
      } else {
        message.error("Server Error");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      message.error("Failed to update review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRatingText = (value: number) => {
    switch (value) {
      case 1: return 'Poor - Very Dissatisfied';
      case 2: return 'Fair - Dissatisfied';
      case 3: return 'Good - Satisfied';
      case 4: return 'Very Good - Happy';
      case 5: return 'Excellent - Very Happy';
      default: return 'Select Rating';
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
        <span className="ml-4">Loading review data...</span>
      </div>
    );
  }

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Edit Review</h2>
        </Col>
        <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
          <Link to={"/admin/review"}>
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
            
            {/* Reviewer Information */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Reviewer Information</h3>
            </Col>

            {/* Name */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Name <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter reviewer name" }]}
                    initialValue={name}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={name}
                      placeholder="Reviewer name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Email */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Email
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                    initialValue={email}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      type="email"
                      value={email}
                      placeholder="reviewer@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Review Content */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Review Content</h3>
            </Col>

            {/* Rating */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Rating <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="rating"
                    rules={[{ required: true, message: "Please select a rating" }]}
                    initialValue={rating}
                  >
                    <div className="space-y-2">
                      <Rate
                        value={rating}
                        onChange={setRating}
                        className="text-2xl"
                        style={{ color: '#fadb14' }}
                      />
                      <div className="text-sm font-medium text-gray-700">
                        {getRatingText(rating)}
                      </div>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Comment */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Comment <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="comment"
                    rules={[
                      { required: true, message: "Please enter review comment" },
                      { min: 10, message: "Comment should be at least 10 characters" }
                    ]}
                    initialValue={comment}
                  >
                    <TextArea
                      rows={6}
                      className="rounded border"
                      value={comment}
                      placeholder="Share your experience and thoughts..."
                      onChange={(e) => setComment(e.target.value)}
                      maxLength={1000}
                      showCount
                    />
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Write a detailed review about your experience. Minimum 10 characters.
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
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Status
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="flex items-center justify-between">
                    <span>Active Review</span>
                    <Switch checked={isActive} onChange={setIsActive} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isActive 
                      ? "This review will be visible to visitors" 
                      : "This review will be hidden from visitors"}
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Preview Section */}
            {/* <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Preview</h3>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Review Preview
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Card className="border border-gray-200 bg-gray-50">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-800">{name || "Reviewer Name"}</div>
                          {email && (
                            <div className="text-sm text-gray-500">{email}</div>
                          )}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {isActive ? '✓ Active' : '✗ Inactive'}
                        </div>
                      </div>
                      
                      <div>
                        <Rate 
                          disabled 
                          defaultValue={rating} 
                          className="text-sm"
                          style={{ color: '#fadb14' }}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {getRatingText(rating)}
                        </div>
                      </div>
                      
                      {comment && (
                        <div className="pt-3 border-t">
                          <div className="text-gray-700 whitespace-pre-line">{comment}</div>
                        </div>
                      )}
                      
                      {!comment && (
                        <div className="pt-3 border-t text-gray-400 italic">
                          Review comment will appear here...
                        </div>
                      )}
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col> */}

            {/* Submit Button */}
            <Col span={24} className="buttons mt-6">
              <button
                disabled={loading}
                className={`btn-brand !py-2 !px-3 cursor-pointer ${loading && '!bg-gray-800'}`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spin size="small" />
                    <span className="!ml-2">Updating Review...</span>
                  </div>
                ) : (
                  "Update Review"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default EditReviewForm;