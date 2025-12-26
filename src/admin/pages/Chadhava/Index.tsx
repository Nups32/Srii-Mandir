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
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { deleteChadhava, getAllChadhava, updateChadhavaStatus } from "@/utils/API";
import dayjs from "dayjs";
// import { format } from "date-fns";

interface OfferingItem {
  name: string;
  description: string;
  image: string;
  price: number;
  isSpecialCombo: boolean;
  isPrasadForHome: boolean;
  _id?: string;
}

interface DetailItem {
  question: string;
  answer: string;
  _id?: string;
}

interface Chadhava {
  _id: string;
  title: string;
  name: string;
  about: string;
  details: DetailItem[];
  offering: OfferingItem[];
  time: string;
  btnText: string;
  images: string[];
  slug: string;
  isUpcoming: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ChadhavaTable = () => {
  const [datasource, setDatasource] = useState<Chadhava[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchChadhavas = async () => {
    setLoading(true);
    try {
      const response = await getAllChadhava();
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
    fetchChadhavas();
  }, []);

  const handleEditRedirect = (record: Chadhava) => {
    navigate(`/admin/chadhava/${record._id}/edit`);
  };

  // const handleViewDetails = (record: Chadhava) => {
  //   navigate(`/admin/chadhava/${record._id}`);
  // };

  const showDeleteConfirmation = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteChadhava(deleteId);
        message.success("Chadhava deleted successfully");
        fetchChadhavas();
      } catch (error) {
        message.error("Failed to delete chadhava");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: Chadhava, field: 'isActive' | 'isUpcoming') => {
    try {
      await updateChadhavaStatus(record._id, {
        [field]: !record[field]
      });
      message.success(`Chadhava ${field === 'isActive' ? 'status' : 'upcoming status'} updated`);
      fetchChadhavas();
    } catch (error) {
      message.error("Failed to update chadhava status");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    
    if (value.trim() === "") {
      fetchChadhavas();
    } else {
      const filtered = datasource.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.about.toLowerCase().includes(value.toLowerCase())
      );
      setDatasource(filtered);
    }
  };

//   const formatDate = (dateString: string) => {
//     try {
//       return format(new Date(dateString), "dd/MM/yyyy");
//     } catch {
//       return dateString;
//     }
//   };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Chadhava Name
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Chadhava) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.title}</div>
        </div>
      ),
      sorter: (a: Chadhava, b: Chadhava) => a.name.localeCompare(b.name),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Details
        </div>
      ),
      key: "details",
      render: (record: Chadhava) => (
        <div>
          <div className="text-xs">Questions: {record.details?.length || 0}</div>
          <div className="text-xs">Offerings: {record.offering?.length || 0}</div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Time
        </div>
      ),
      dataIndex: "time",
      key: "time",
      render: (text: string) => (
        <div className="max-w-[150px] truncate" title={text}>
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
      render: (record: Chadhava) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs">Active:</span>
            <Switch
              size="small"
              checked={record.isActive}
              onChange={() => handleStatusChange(record, 'isActive')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">Upcoming:</span>
            <Switch
              size="small"
              checked={record.isUpcoming}
              onChange={() => handleStatusChange(record, 'isUpcoming')}
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
    //   render: (text: string) => formatDate(text),
      render: (text: string) => dayjs(text).format('DD-MM-YYYY hh:mm A'),
      sorter: (a: Chadhava, b: Chadhava) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: Chadhava) => (
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
          <AiFillDelete
            className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => showDeleteConfirmation(record._id)}
            title="Delete"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Chadhavas */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Chadhavas</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by name, title or about..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add chadhava btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
              <Link to={"/admin/chadhava/add"}>
                <button className="flex items-center justify-center py-3 btn-brand w-full">
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add Chadhava</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Card className="container mt-5!">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 1000 }}
                columns={columns}
                dataSource={datasource}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
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
          <p>Are you sure you want to delete this Chadhava?</p>
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

export default ChadhavaTable;