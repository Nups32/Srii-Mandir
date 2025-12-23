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
    Rate,
    // Select,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { createPujaReview } from "@/utils/API";

const { TextArea } = Input;
// const { Option } = Select;

// interface User {
//     _id: string;
//     name: string;
//     email: string;
// }

// interface Puja {
//     _id: string;
//     name: string;
// }

const AddPujaReviewForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    // const [fetching, setFetching] = useState<boolean>(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Form states
    // const [userId, setUserId] = useState<string>("");
    // const [pujaId, setPujaId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(5);
    const [isActive, setIsActive] = useState<boolean>(true);

    // Dropdown data
    // const [users, setUsers] = useState<User[]>([]);
    // const [pujas, setPujas] = useState<Puja[]>([]);
    // const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
    // const [loadingPujas, setLoadingPujas] = useState<boolean>(false);

    // // Fetch users and pujas for dropdowns
    // useEffect(() => {
    //     const fetchDropdownData = async () => {
    //         setFetching(true);

    //         try {
    //             // // Fetch users
    //             // setLoadingUsers(true);
    //             // const usersResponse = await getAllUsers();
    //             // if (usersResponse.data.status) {
    //             //   setUsers(usersResponse.data.data || []);
    //             // }
    //             // setLoadingUsers(false);

    //             // Fetch pujas
    //             setLoadingPujas(true);
    //             const pujasResponse = await getAllPooja();
    //             if (pujasResponse.data.status) {
    //                 setPujas(pujasResponse.data.data || []);
    //             }
    //             setLoadingPujas(false);

    //         } catch (error) {
    //             console.error("Error fetching dropdown data:", error);
    //             message.error("Failed to load dropdown data");
    //         } finally {
    //             setFetching(false);
    //         }
    //     };

    //     fetchDropdownData();
    // }, []);

    const handleSubmit = async () => {
        // // Validate required fields
        // if (!userId) {
        //   message.error("Please select a user");
        //   return;
        // }

        // if (!pujaId) {
        //   message.error("Please select a puja");
        //   return;
        // }

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

            // formData.append("userId", userId);
            // formData.append("pujaId", pujaId);
            formData.append("name", name);
            formData.append("comment", comment);
            formData.append("rating", rating.toString());
            formData.append("isActive", isActive.toString());

            const res = await createPujaReview(formData);
            if (res.data.status) {
                message.success("Puja review created successfully");
                navigate("/admin/puja-review");
            } else {
                message.error(res.data.message || "Server Error");
            }
        } catch (error: any) {
            console.error("Error creating puja review:", error);
            message.error(error.response?.data?.message || "Failed to create review. Please try again.");
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

    // const filterOption = (input: string, option: any) => {
    //     return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    // };

    // if (fetching) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <Spin size="large" />
    //             <span className="ml-4">Loading data...</span>
    //         </div>
    //     );
    // }

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Add New Puja Review</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to={"/admin/puja-review"}>
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

                        {/* User and Puja Information */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Review Information</h3>
                        </Col>

                        {/* User Selection */}
                        {/* <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    User <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="userId"
                    rules={[{ required: true, message: "Please select a user" }]}
                  >
                    <Select
                      showSearch
                      size="large"
                      className="rounded border"
                      placeholder="Select user"
                      loading={loadingUsers}
                      value={userId}
                      onChange={setUserId}
                      filterOption={filterOption}
                    >
                      {users.map(user => (
                        <Option key={user._id} value={user._id}>
                          {user.name} ({user.email})
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Select the user who submitted this review
                  </div>
                </Col>
              </Row>
            </Col> */}

                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Name
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="name">
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={name}
                                            placeholder="Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Puja Selection */}
                        {/* <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Puja <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="pujaId"
                                        rules={[{ required: true, message: "Please select a puja" }]}
                                    >
                                        <Select
                                            showSearch
                                            size="large"
                                            className="rounded border"
                                            placeholder="Select puja"
                                            loading={loadingPujas}
                                            value={pujaId}
                                            onChange={setPujaId}
                                            filterOption={filterOption}
                                        >
                                            {pujas.map(puja => (
                                                <Option key={puja._id} value={puja._id}>
                                                    {puja.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Select the puja this review is for
                                    </div>
                                </Col>
                            </Row>
                        </Col> */}

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
                                            { min: 10, message: "Comment should be at least 10 characters" },
                                            { max: 1000, message: "Comment should not exceed 1000 characters" }
                                        ]}
                                        initialValue={comment}
                                    >
                                        <TextArea
                                            rows={6}
                                            className="rounded border"
                                            value={comment}
                                            placeholder="Share your experience with this puja..."
                                            onChange={(e) => setComment(e.target.value)}
                                            maxLength={1000}
                                            showCount
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Write a detailed review about your puja experience. Minimum 10 characters.
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
                                        <span className="!ml-2">Creating Review...</span>
                                    </div>
                                ) : (
                                    "Create Puja Review"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default AddPujaReviewForm;