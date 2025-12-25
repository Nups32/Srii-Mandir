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
  Switch,
  Select,
  Badge,
} from "antd";
// import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { getUserData, updateUserStatus } from "@/utils/API";
import dayjs from "dayjs";
// import { deleteUser, getAllUsers, updateUserStatus } from "@/utils/API";
// import { format } from "date-fns";

const { Option } = Select;

interface User {
  _id: string;
  email: string;
  username: string;
  mobile: string;
  role: number;
  country: string;
  pincode: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ManageUsers = () => {
  const [datasource, setDatasource] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  // const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUserData("");
      if (response.data.status) {
        setDatasource(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and filters
  const getFilteredUsers = () => {
    let filtered = datasource;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(user =>
        user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.mobile?.includes(searchText)
      );
    }

    // // Role filter
    // if (roleFilter !== "all") {
    //   filtered = filtered.filter(user => user.role === parseInt(roleFilter));
    // }

    // Status filter
    if (statusFilter !== "all") {
      const statusValue = statusFilter === "active";
      filtered = filtered.filter(user => user.isActive === statusValue);
    }

    // Exclude deleted users
    // filtered = filtered.filter(user => !user.isDeleted);

    return filtered;
  };

  const handleEditRedirect = (record: User) => {
    navigate(`/admin/user/${record._id}/edit`);
  };

  // const handleViewDetails = (record: User) => {
  //   navigate(`/admin/user/${record._id}`);
  // };

  // const showDeleteConfirmation = (id: string) => {
  //   setDeleteId(id);
  // };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        // await deleteUser(deleteId);
        message.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        message.error("Failed to delete user");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: User, field: 'isActive' | 'isDeleted') => {
    try {
      await updateUserStatus(record._id, {
        [field]: !record[field]
      });
      message.success(`User ${record.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchUsers();
    } catch (error) {
      message.error("Failed to update user status");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // const formatDate = (dateString: string) => {
  //   try {
  //     return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  //   } catch {
  //     return dateString;
  //   }
  // };

  // const getRoleText = (role: number) => {
  //   switch (role) {
  //     case 1: return "Admin";
  //     case 2: return "User";
  //     default: return "Unknown";
  //   }
  // };

  // const getRoleColor = (role: number) => {
  //   switch (role) {
  //     case 1: return "red";
  //     case 2: return "blue";
  //     default: return "default";
  //   }
  // };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          User
        </div>
      ),
      key: "user",
      render: (record: User) => (
        <div>
          <div className="font-medium">{record.username || "No Name"}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
      sorter: (a: User, b: User) => (a.username || "").localeCompare(b.username || ""),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Contact
        </div>
      ),
      key: "contact",
      render: (record: User) => (
        <div>
          <div className="text-sm">{record.mobile || "-"}</div>
          {record.country && (
            <div className="text-xs text-gray-500">{record.country}</div>
          )}
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Date of Birth
        </div>
      ),
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          State
        </div>
      ),
      dataIndex: "state",
      key: "state",
    },

    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          City
        </div>
      ),
      dataIndex: "city",
      key: "city",
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Status
        </div>
      ),
      key: "status",
      render: (record: User) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge
              status={record.isActive ? "success" : "error"}
              text={record.isActive ? "Active" : "Inactive"}
            />
            <Switch
              size="small"
              className="ml-2!"
              checked={record.isActive}
              onChange={() => handleStatusChange(record, 'isActive')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              status={!record.isDeleted ? "success" : "error"}
              text={record.isDeleted ? "Deleted" : "Not Delete"}
            />
            <Switch
              size="small"
              className="ml-2!"
              checked={record.isDeleted}
              onChange={() => handleStatusChange(record, 'isDeleted')}
            />
          </div>
          {/* {record.isDeleted && (
            <Tag color="red" className="text-xs">Deleted</Tag>
          )} */}
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Joined
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format('DD-MM-YYYY hh:mm A'),
      sorter: (a: User, b: User) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: User) => (
        <div className="flex flex-row items-center space-x-2">
          {/* <Button
            type="link"
            size="small"
            onClick={() => handleViewDetails(record)}
            className="p-0"
          >
            View
          </Button> */}
          <FaEdit
            className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={() => handleEditRedirect(record)}
            title="Edit"
          />
          {/* <AiFillDelete
            className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => showDeleteConfirmation(record._id)}
            title="Delete"
          /> */}
        </div>
      ),
    },
  ];

  const filteredUsers = getFilteredUsers();

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Users */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Users</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by name, email or mobile..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add user btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
              <Link to={"/admin/user/add"}>
                <button className="flex items-center justify-center py-3 btn-brand w-full">
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add User</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Row */}
      <Row className="m-2 mt-4" gutter={16}>
        {/* <Col xs={24} sm={8} md={6} xl={6} xxl={6}>
          <Select
            className="w-full"
            size="large"
            placeholder="Filter by Role"
            value={roleFilter}
            onChange={setRoleFilter}
            // allowClear
          >
            <Option value="all">All Roles</Option>
            <Option value="1">Admin</Option>
            <Option value="2">User</Option>
          </Select>
        </Col> */}

        <Col xs={24} sm={8} md={6} xl={6} xxl={6}>
          <Select
            className="w-full"
            size="large"
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={setStatusFilter}
          // allowClear
          >
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Col>
      </Row>

      <Row>
        <Card className="container mt-5!">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 1000 }}
                columns={columns}
                dataSource={filteredUsers}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} users`,
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
          <p>Are you sure you want to delete this user?</p>
          <p className="text-gray-500 text-sm mt-2">
            This will mark the user as deleted. This action cannot be undone.
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

export default ManageUsers;