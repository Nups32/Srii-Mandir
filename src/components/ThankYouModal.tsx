import { useState, useEffect } from 'react';
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ThankYouModal({ transactionId, isModalVisible, setIsModalVisible }: any) {
  const [isAnimating, setIsAnimating] = useState(false);
//   const transactionId = "TXN123456789";
  const navigate = useNavigate();
  useEffect(() => {
    if (isModalVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimating(true);
    }
  }, [isModalVisible]);
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsModalVisible(false), 200);
    navigate("/")
  };
  return (
    // <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
    <div>
      {/* <button
        onClick={() => setIsModalVisible(true)}
        className="px-6 py-3 bg-linear-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Show Thank You Modal
      </button> */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
          />
          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className={`relative w-full max-w-md transition-all duration-300 ${
                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-orange-600 via-amber-600 to-orange-700 shadow-2xl">
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 24%, transparent 25%),
                                     radial-gradient(circle at 80% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 24%, transparent 25%)`,
                    backgroundSize: '60px 60px'
                  }} />
                </div>
                {/* Golden glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="text-center">
                    {/* Success Icon */}
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 animate-ping">
                        <CheckCircle className="w-16 h-16 text-yellow-300/40 mx-auto" />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                        <CheckCircle className="w-16 h-16 text-white mx-auto relative z-10 drop-shadow-2xl" />
                      </div>
                    </div>
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
                      धन्यवाद!
                    </h1>
                    <p className="text-xl text-orange-50 mb-8">
                      Thank You!
                    </p>
                    {/* Transaction Box */}
                    <div className="mb-8 p-6 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                      <h2 className="text-orange-50 text-sm mb-3 font-medium">
                        Your Transaction ID:
                      </h2>
                      <div className="text-xl md:text-2xl font-bold text-white tracking-wider font-mono">
                        {transactionId}
                      </div>
                    </div>
                    {/* Message */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-center gap-3 text-orange-50">
                        <Heart className="w-5 h-5 text-red-300 fill-red-200" />
                        <p className="text-base">
                          We appreciate your faith and trust in us
                        </p>
                      </div>
                    </div>
                    {/* Back Button */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
                      <button
                        onClick={handleClose}
                        className="relative flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-orange-600 hover:text-orange-700 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                      </button>
                    </div>
                    {/* Footer Message */}
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-orange-50 text-sm leading-relaxed">
                        May divine blessings be with you always.
                        <br />
                        We look forward to serving you again! :pray:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}