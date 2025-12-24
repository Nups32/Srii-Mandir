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
  Select,
  Badge,
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { deleteHeroSection, getAllHeroSection, updateHeroSectionStatus } from "@/utils/API";
// import { format } from "date-fns";

const { Option } = Select;

interface HeroSection {
  _id: string;
  title: string;
  description: string;
  btnText: string;
  btnRedirect: string;
  type: 'home' | 'about';
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const HeroSectionTable = () => {
  const [datasource, setDatasource] = useState<HeroSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const navigate = useNavigate();

  const fetchHeroSections = async () => {
    setLoading(true);
    try {
      const response = await getAllHeroSection();
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
    fetchHeroSections();
  }, []);

  // Filter hero sections based on search and filters
  const getFilteredHeroSections = () => {
    let filtered = datasource;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.btnText?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    return filtered;
  };

  const handleEditRedirect = (record: HeroSection) => {
    navigate(`/admin/hero-section/${record._id}/edit`);
  };

  const showDeleteConfirmation = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteHeroSection(deleteId);
        message.success("Hero section deleted successfully");
        fetchHeroSections();
      } catch (error) {
        message.error("Failed to delete hero section");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: HeroSection) => {
    try {
      await updateHeroSectionStatus(record._id, {
        isActive: !record.isActive
      });
      message.success(`Hero section ${record.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchHeroSections();
    } catch (error) {
      message.error("Failed to update hero section status");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

//   const formatDate = (dateString: string) => {
//     try {
//       return format(new Date(dateString), "dd/MM/yyyy HH:mm");
//     } catch {
//       return dateString;
//     }
//   };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'home': return 'blue';
      case 'puja': return 'green';
      default: return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'home': return 'Home';
      case 'puja': return 'Puja';
      default: return type;
    }
  };

  const getRedirectType = (redirect: string) => {
    if (redirect.includes('/puja')) return 'Pooja';
    if (redirect.includes('/chadhava')) return 'Chadhava';
    return 'Other';
  };

  const getRedirectColor = (redirect: string) => {
    if (redirect.includes('/puja')) return 'purple';
    if (redirect.includes('/chadhava')) return 'orange';
    return 'default';
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Title
        </div>
      ),
      dataIndex: "title",
      key: "title",
      render: (text: string, record: HeroSection) => (
        <div>
          <div className="font-medium">{text || "No Title"}</div>
          <div className="text-xs text-gray-500 truncate max-w-[200px]">
            {record.description}
          </div>
        </div>
      ),
      sorter: (a: HeroSection, b: HeroSection) => a.title.localeCompare(b.title),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Button
        </div>
      ),
      key: "button",
      render: (record: HeroSection) => (
        <div>
          <div className="text-sm font-medium">{record.btnText || "-"}</div>
          <div className="text-xs">
            <Tag color={getRedirectColor(record.btnRedirect)}>
              {getRedirectType(record.btnRedirect)}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Type & Order
        </div>
      ),
      key: "type",
      render: (record: HeroSection) => (
        <div className="space-y-1">
          <Tag color={getTypeColor(record.type)}>
            {getTypeText(record.type)}
          </Tag>
          <div className="text-xs text-gray-500">
            Order: {record.orderIndex || 0}
          </div>
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
      render: (record: HeroSection) => (
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
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Created
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (text),
      sorter: (a: HeroSection, b: HeroSection) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: HeroSection) => (
        <div className="flex flex-row items-center space-x-2">
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

  const filteredHeroSections = getFilteredHeroSections();

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Hero Sections */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Hero Sections</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by title, description or button text..."
                // allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add hero section btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
              <Link to={"/admin/hero-section/add"}>
                <button className="flex items-center justify-center py-3 btn-brand w-full">
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add Hero Section</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col xs={24} sm={8} md={6} xl={6} xxl={6}>
          <Select
            className="w-full"
            size="large"
            placeholder="Filter by Type"
            value={typeFilter}
            onChange={setTypeFilter}
            allowClear
          >
            <Option value="all">All Types</Option>
            <Option value="home">Home</Option>
            <Option value="puja">Puja</Option>
          </Select>
        </Col>
      </Row>

      <Row>
        <Card className="container !mt-5">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 800 }}
                columns={columns}
                dataSource={filteredHeroSections}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} hero sections`,
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
          <p>Are you sure you want to delete this hero section?</p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone.
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

export default HeroSectionTable;