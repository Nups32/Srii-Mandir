import { Col, Descriptions, Modal, Row, Timeline } from "antd";
import { Badge, Tag } from "lucide-react";
import { useState } from "react";
import type {BookPuja} from "@/admin/pages/BookPuja/Index"

type Address = {
  pincode: string;
  city: string;
  state: string;
  house: string;
  road: string;
  landmark: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: {
    members: string[];
    gotra: string;
    whatsapp: string;
    callingNumber: string;
    address?: Address | null;
  };
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  data: BookPuja | null;
};

export default function ConfirmDetailsModal({
  open,
  onClose,
  data,
}: Props) {
  // const [selectedRecord, setSelectedRecord] = useState<BookPuja | null>(null);
  //   const [viewModalVisible, setViewModalVisible] = useState(false);

  if (!open) return null;

  // const { members, gotra, whatsapp, callingNumber, address } = data;

   const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* View Details Modal */}
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
                  <h3 className="text-lg font-bold">{selectedRecord.pujaPackage?.packageId?.title}</h3>
                  <p className="text-gray-600">{selectedRecord.pujaId?.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{selectedRecord.amount?.toLocaleString('en-IN')}
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
                <div className="font-medium">{selectedRecord?.userId?.username || 'N/A'}</div>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedRecord.userId?.email || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedRecord.userId?.mobile || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                <code className="text-xs">{selectedRecord.userId?._id}</code>
              </Descriptions.Item>
            </Descriptions>

            {/* Booking Information */}
            <Descriptions title="Booking Information" bordered column={2}>
              <Descriptions.Item label="Order ID">
                {selectedRecord.order_id || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction ID">
                {selectedRecord.transactionId || 'N/A'}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Type">
                {selectedRecord.type || 'N/A'}
              </Descriptions.Item> */}
              <Descriptions.Item label="Puja Package ID">
                <code className="text-xs">{selectedRecord.pujaPackage?.packageId?._id}</code>
              </Descriptions.Item>
              <Descriptions.Item label="Package Details">
                {selectedRecord.pujaPackage?.person || 1} person(s) • ₹{selectedRecord.pujaPackage?.price?.toLocaleString('en-IN') || 0}
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
                <h4 className="text-lg font-bold mb-3">Participant Details</h4>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="WhatsApp Number">
                    {selectedRecord.pujaParticipateMemberDetail.whatsappNumber || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Calling Number">
                    {selectedRecord.pujaParticipateMemberDetail.callingNumber || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gotra">
                    {selectedRecord.pujaParticipateMemberDetail.gotra || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Members" span={3}>
                    {selectedRecord.pujaParticipateMemberDetail.members?.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {selectedRecord.pujaParticipateMemberDetail.members.map((member, index) => (
                          <li key={index}>{member}</li>
                        ))}
                      </ul>
                    ) : 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
                
                {/* Address Details */}
                {selectedRecord.pujaParticipateMemberDetail.address && (
                  <>
                    <h5 className="font-bold mt-4 mb-2">Address</h5>
                    <Descriptions bordered column={2} size="small">
                      <Descriptions.Item label="House">
                        {selectedRecord.pujaParticipateMemberDetail.address.house || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Road">
                        {selectedRecord.pujaParticipateMemberDetail.address.road || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Landmark">
                        {selectedRecord.pujaParticipateMemberDetail.address.landMark || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="City">
                        {selectedRecord.pujaParticipateMemberDetail.address.city || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="State">
                        {selectedRecord.pujaParticipateMemberDetail.address.state || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Pincode">
                        {selectedRecord.pujaParticipateMemberDetail.address.pincode || 'N/A'}
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
                    <div key={index} className="px-4 py-3 border-b last:border-b-0">
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
                          <div>₹{item.price?.toLocaleString('en-IN')}</div>
                        </Col>
                        <Col span={4}>
                          <div>{item.qty}</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
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
                          ₹{selectedRecord.offering.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString('en-IN')}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} className="mt-2">
                      <Col span={16} className="text-right">
                        <div className="font-bold">Package Amount:</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">
                          ₹{selectedRecord.pujaPackage?.price?.toLocaleString('en-IN') || 0}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} className="mt-2 pt-2 border-t">
                      <Col span={16} className="text-right">
                        <div className="font-bold text-lg">Total Amount:</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold text-lg text-green-600">
                          ₹{selectedRecord.amount?.toLocaleString('en-IN')}
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
    </>
  )
  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
  //     <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
  //       {/* Header */}
  //       <div className="flex justify-between items-center mb-4">
  //         <h2 className="text-lg font-semibold">Your details</h2>
  //         <button onClick={onClose} className="text-xl">
  //           ×
  //         </button>
  //       </div>

  //       {/* Members */}
  //       <div className="mb-4">
  //         <h3 className="font-semibold">Members participating in the puja</h3>
  //         <p className="text-sm text-gray-500 mb-2">
  //           Panditji will take these names along with gotra during the puja.
  //         </p>

  //         <ol className="list-decimal pl-5 space-y-1">
  //           {members.map((m, i) => (
  //             <li key={i}>{m}</li>
  //           ))}
  //         </ol>
  //       </div>

  //       <hr className="my-3" />

  //       {/* Details */}
  //       <div className="space-y-2 text-sm">
  //         <div className="flex justify-between">
  //           <span className="text-gray-500">Gotra</span>
  //           <span className="font-medium">{gotra}</span>
  //         </div>

  //         <div className="flex justify-between">
  //           <span className="text-gray-500">Phone Number</span>
  //           <span className="font-medium">{callingNumber}</span>
  //         </div>

  //         <div className="flex justify-between">
  //           <span className="text-gray-500">WhatsApp Number</span>
  //           <span className="font-medium">{whatsapp}</span>
  //         </div>
  //       </div>

  //       {/* Address */}
  //       {address && (
  //         <>
  //           <hr className="my-3" />
  //           <div>
  //             <h3 className="font-semibold mb-1">
  //               Address for Aashirwad Box delivery
  //             </h3>
  //             <p className="text-sm text-gray-700">
  //               {address.house}, {address.road}, {address.landmark},{" "}
  //               {address.city}, {address.state} – {address.pincode}
  //             </p>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
}
