import {
  Card,
  Row,
  Table,
  Col,
  Input,
  message,
  Spin,
  Modal,
  Button,
  Tag,
  Switch,
  Rate,
  Badge,
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { deleteReview, getAllReview, updateReviewStatus } from "@/utils/API";
// import { format } from "date-fns";

interface Review {
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

export const ReviewTable = () => {
  const [datasource, setDatasource] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getAllReview();
      if(response.data.status){
          setDatasource(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Filter reviews based on search and filters
  const getFilteredReviews = () => {
    let filtered = datasource.filter(item => !item.isDeleted);

    // Search filter
    if (searchText) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.comment?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Rating filter
    if (ratingFilter !== null) {
      filtered = filtered.filter(item => item.rating === ratingFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      const statusValue = statusFilter === "active";
      filtered = filtered.filter(item => item.isActive === statusValue);
    }

    return filtered;
  };

  const handleEditRedirect = (record: Review) => {
    navigate(`/admin/review/${record._id}/edit`);
  };

  const handleViewDetails = (record: Review) => {
    navigate(`/admin/review/${record._id}`);
  };

  const showDeleteConfirmation = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteReview(deleteId);
        message.success("Review deleted successfully");
        fetchReviews();
      } catch (error) {
        message.error("Failed to delete review");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: Review) => {
    try {
      await updateReviewStatus(record._id, {
        isActive: !record.isActive
      });
      message.success(`Review ${record.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchReviews();
    } catch (error) {
      message.error("Failed to update review status");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

//   const formatDate = (dateString: string) => {
//     try {
//       return format(new Date(dateString), "dd/MM/yyyy");
//     } catch {
//       return dateString;
//     }
//   };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'green';
    if (rating >= 3) return 'blue';
    if (rating >= 2) return 'orange';
    return 'red';
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Not Rated';
    }
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Reviewer
        </div>
      ),
      key: "reviewer",
      render: (record: Review) => (
        <div>
          <div className="font-medium">{record.name || "Anonymous"}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
      sorter: (a: Review, b: Review) => a.name.localeCompare(b.name),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Rating
        </div>
      ),
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="space-y-1">
          <Rate 
            disabled 
            defaultValue={rating} 
            className="text-sm"
            style={{ color: '#fadb14' }}
          />
          <Tag color={getRatingColor(rating)}>
            {getRatingText(rating)} ({rating}/5)
          </Tag>
        </div>
      ),
      sorter: (a: Review, b: Review) => a.rating - b.rating,
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Comment
        </div>
      ),
      dataIndex: "comment",
      key: "comment",
      render: (text: string) => (
        <div className="max-w-[200px] truncate" title={text}>
          {text || "-"}
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Status
        </div>
      ),
      key: "status",
      render: (record: Review) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge 
              status={record.isActive ? "success" : "error"} 
              text={record.isActive ? "Active" : "Inactive"}
            />
            <Switch
              size="small"
              checked={record.isActive}
              onChange={() => handleStatusChange(record)}
            />
          </div>
          {record.isDeleted && (
            <Tag color="red" className="text-xs">Deleted</Tag>
          )}
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Date
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (text),
      sorter: (a: Review, b: Review) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: Review) => (
        <div className="flex flex-row items-center space-x-2">
          <Button
            type="link"
            size="small"
            onClick={() => handleViewDetails(record)}
            className="p-0"
          >
            View
          </Button>
          <FaEdit
            className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={() => handleEditRedirect(record)}
            title="Edit"
          />
          <AiFillDelete
            className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => showDeleteConfirmation(record._id)}
            title="Delete"
          />
        </div>
      ),
    },
  ];

  const filteredReviews = getFilteredReviews();

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Reviews */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Reviews</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by name, email or comment..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add review btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
              <Link to={"/admin/review/add"}>
                <button className="flex items-center justify-center py-3 btn-brand w-full">
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add Review</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">Filter by Rating</div>
            <div className="flex flex-wrap gap-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <Tag
                  key={rating}
                  color={ratingFilter === rating ? 'blue' : 'default'}
                  className="cursor-pointer"
                  onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
                >
                  {rating}★
                </Tag>
              ))}
              {ratingFilter !== null && (
                <Tag
                  color="red"
                  className="cursor-pointer"
                  onClick={() => setRatingFilter(null)}
                >
                  Clear
                </Tag>
              )}
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">Filter by Status</div>
            <div className="flex flex-wrap gap-1">
              <Tag
                color={statusFilter === 'all' ? 'blue' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Tag>
              <Tag
                color={statusFilter === 'active' ? 'green' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Tag>
              <Tag
                color={statusFilter === 'inactive' ? 'orange' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('inactive')}
              >
                Inactive
              </Tag>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Total Reviews</div>
              <div className="text-lg font-bold">{filteredReviews.length}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Average Rating</div>
              <div className="text-lg font-bold">
                {filteredReviews.length > 0 
                  ? (filteredReviews.reduce((sum, item) => sum + item.rating, 0) / filteredReviews.length).toFixed(1)
                  : '0.0'
                }/5
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Active Reviews</div>
              <div className="text-lg font-bold">
                {filteredReviews.filter(item => item.isActive).length}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Card className="container mt-5!">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 1000 }}
                columns={columns}
                dataSource={filteredReviews}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} reviews`,
                }}
              />
            </Spin>
          </Col>
        </Card>
      </Row>
      
      <Modal
        title="Confirm Deletion"
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        footer={null}
        centered
      >
        <div style={{ textAlign: "start", marginBottom: "1rem" }}>
          <p>Are you sure you want to delete this review?</p>
          <p className="text-gray-500 text-sm mt-2">
            This will mark the review as deleted. This action cannot be undone.
          </p>
        </div>
        <div style={{ textAlign: "end" }}>
          <Button
            onClick={() => setDeleteId(null)}
            className="rounded mr-3"
            style={{
              backgroundColor: "#f5f5f5",
              color: "#333",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            type="primary"
            className="rounded"
            danger
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewTable;