import { getBookedPuja } from "@/utils/API";
import { Col, Descriptions, Modal, Row, message } from "antd";
import { useEffect, useState } from "react";
import type { BookPuja } from "@/admin/pages/BookPuja/Index";

export default function PujaTable({
  onReview,
}: {
  onReview: (b: BookPuja) => void;
  onView: (b: BookPuja) => void;
}) {
  const [booking, setBooking] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState<BookPuja | null>(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
  
  const fetchBookedPooja = async () => {
    try {
      const response: any = await getBookedPuja();
      console.log("res from fetchBookedPooja", response.data.data);
      if (response?.data?.status) {
        setBooking(response.data.data);
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    }
  };

  useEffect(() => {
    fetchBookedPooja();
  }, []);

    const handleViewDetails = (record: BookPuja) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  console.log("booking from table", selectedRecord);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              #
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Puja Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Selected Package
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {booking.map((b: any, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition">
              {/* Index */}
              <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>

              {/* Puja Name */}
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {b.pujaId.name}
              </td>

              {/* Date */}
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDate(b.createdAt)}
              </td>

              {/* Package */}
              <td className="px-4 py-3 text-sm text-gray-700">
                {b.pujaPackage.packageId.title} -{" "}
                <span className="font-semibold">₹{b.pujaPackage.price}</span>
              </td>

              {/* Actions */}
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => onReview(b)}
                    className="text-green-600! text-sm font-medium hover:underline cursor-pointer"
                  >
                    Review
                  </button>

                  <button
                    onClick={() => handleViewDetails(b)}
                    className="text-blue-600! text-sm font-medium hover:underline cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
          title="Puja Booking Details"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
          width={900}
          centered
        >
          {selectedRecord && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {/* Header Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">
                      {selectedRecord.pujaPackage?.packageId?.title}
                    </h3>
                    <p className="text-gray-600">
                      {selectedRecord.pujaId?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{selectedRecord.amount?.toLocaleString("en-IN")}
                    </div>
                    {/* <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      status={getPaymentStatusColor(selectedRecord.paymentStatus)} 
                      text={getPaymentStatusText(selectedRecord.paymentStatus)}
                    />
                    <Tag color={getMethodColor(selectedRecord.method)}>
                      {selectedRecord.method || 'Unknown'}
                    </Tag>
                  </div> */}
                  </div>
                </div>
              </div>

              {/* User Information */}
              <Descriptions title="User Information" bordered column={2}>
                <Descriptions.Item label="Name" span={2}>
                  <div className="font-medium">
                    {selectedRecord?.userId?.username || "N/A"}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedRecord.userId?.email || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {selectedRecord.userId?.mobile || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="User ID">
                  <code className="text-xs">{selectedRecord.userId?._id}</code>
                </Descriptions.Item>
              </Descriptions>

              {/* Booking Information */}
              <Descriptions title="Booking Information" bordered column={2}>
                <Descriptions.Item label="Order ID">
                  {selectedRecord.order_id || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Transaction ID">
                  {selectedRecord.transactionId || "N/A"}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Type">
                {selectedRecord.type || 'N/A'}
              </Descriptions.Item> */}
                <Descriptions.Item label="Puja Package ID">
                  <code className="text-xs">
                    {selectedRecord.pujaPackage?.packageId?._id}
                  </code>
                </Descriptions.Item>
                <Descriptions.Item label="Package Details">
                  {selectedRecord.pujaPackage?.person || 1} person(s) • ₹
                  {selectedRecord.pujaPackage?.price?.toLocaleString("en-IN") ||
                    0}
                </Descriptions.Item>
                <Descriptions.Item label="Booking Date">
                  {formatDate(selectedRecord.createdAt)}
                </Descriptions.Item>
                <Descriptions.Item label="Last Updated">
                  {formatDate(selectedRecord.updatedAt)}
                </Descriptions.Item>
              </Descriptions>

              {/* Participant Details */}
              {selectedRecord.pujaParticipateMemberDetail && (
                <div>
                  <h4 className="text-lg font-bold mb-3">
                    Participant Details
                  </h4>
                  <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="WhatsApp Number">
                      {selectedRecord.pujaParticipateMemberDetail
                        .whatsappNumber || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Calling Number">
                      {selectedRecord.pujaParticipateMemberDetail
                        .callingNumber || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gotra">
                      {selectedRecord.pujaParticipateMemberDetail.gotra ||
                        "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Members" span={3}>
                      {selectedRecord.pujaParticipateMemberDetail.members
                        ?.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {selectedRecord.pujaParticipateMemberDetail.members.map(
                            (member, index) => (
                              <li key={index}>{member}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </Descriptions.Item>
                  </Descriptions>

                  {/* Address Details */}
                  {selectedRecord.pujaParticipateMemberDetail.address && (
                    <>
                      <h5 className="font-bold mt-4 mb-2">Address</h5>
                      <Descriptions bordered column={2} size="small">
                        <Descriptions.Item label="House">
                          {selectedRecord.pujaParticipateMemberDetail.address
                            .house || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Road">
                          {selectedRecord.pujaParticipateMemberDetail.address
                            .road || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Landmark">
                          {selectedRecord.pujaParticipateMemberDetail.address
                            .landMark || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="City">
                          {selectedRecord.pujaParticipateMemberDetail.address
                            .city || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="State">
                          {selectedRecord.pujaParticipateMemberDetail.address
                            .state || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pincode">
                          {selectedRecord.pujaParticipateMemberDetail.address
                            .pincode || "N/A"}
                        </Descriptions.Item>
                      </Descriptions>
                    </>
                  )}
                </div>
              )}

              {/* Offerings Section */}
              {selectedRecord.offering?.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold mb-3">Offerings</h4>
                  <div className="border rounded">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <Row gutter={16}>
                        <Col span={12}>
                          <div className="font-bold">Item</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">Price</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">Qty</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">Total</div>
                        </Col>
                      </Row>
                    </div>
                    {selectedRecord.offering.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 border-b last:border-b-0"
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <div className="font-medium">{item.name}</div>
                            {item.offeringId && (
                              <div className="text-xs text-gray-500">
                                ID: <code>{item.offeringId}</code>
                              </div>
                            )}
                          </Col>
                          <Col span={4}>
                            <div>₹{item.price?.toLocaleString("en-IN")}</div>
                          </Col>
                          <Col span={4}>
                            <div>{item.qty}</div>
                          </Col>
                          <Col span={4}>
                            <div className="font-bold">
                              ₹{(item.price * item.qty).toLocaleString("en-IN")}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <div className="bg-gray-50 px-4 py-3">
                      <Row gutter={16}>
                        <Col span={16} className="text-right">
                          <div className="font-bold">Offerings Subtotal:</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">
                            ₹
                            {selectedRecord.offering
                              .reduce(
                                (sum, item) => sum + item.price * item.qty,
                                0
                              )
                              .toLocaleString("en-IN")}
                          </div>
                        </Col>
                      </Row>
                      <Row gutter={16} className="mt-2">
                        <Col span={16} className="text-right">
                          <div className="font-bold">Package Amount:</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">
                            ₹
                            {selectedRecord.pujaPackage?.price?.toLocaleString(
                              "en-IN"
                            ) || 0}
                          </div>
                        </Col>
                      </Row>
                      <Row gutter={16} className="mt-2 pt-2 border-t">
                        <Col span={16} className="text-right">
                          <div className="font-bold text-lg">Total Amount:</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold text-lg text-green-600">
                            ₹{selectedRecord.amount?.toLocaleString("en-IN")}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
    </div>
  );
}
