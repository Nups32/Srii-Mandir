import { Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="bg-[#FFF6EE] min-h-screen py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl font-semibold text-[#7A1E00]">Contact Us</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-3" />
        </div>

        {/* Address Card */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 max-w-2xl text-center">
            <h2 className="text-lg font-semibold text-[#7A1E00] mb-4">
              Srii Mandir Office Address
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed">
              <br />
              {/* Intellect Application, <br /> */}
              {/* 305-306 - 3rd floor, Tower A, */}
              #305-306 - 3rd floor, Tower A, Spazedge - Sector 46, Sohna Road,
              <br />
              Gurgaon, Haryana 122018
              <br />
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        {/* <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10"> */}
        <div className="max-w-lg gap-8  mx-auto mb-10">
          {/* Email */}
          <div className="bg-[#FFF1E6] rounded-xl shadow-md border border-[#FFF1E6] p-8 text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-orange-100 mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>

            <h3 className="font-semibold text-[#7A1E00] mb-2">Email Us</h3>
            <a
              href="mailto: info.sriimandir@gmail.com"
              className="text-orange-600 text-sm"
            >
              info.sriimandir@gmail.com
            </a>
          </div>

          {/* Call */}
          {/* <div className="bg-[#FFF1E6] rounded-xl shadow-md border border-[#FFF1E6] p-8 text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-orange-100 mb-4">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>

            <h3 className="font-semibold text-[#7A1E00] mb-2">Call Us</h3>
            <p className="text-orange-600 text-sm">99999999999</p>
            <p className="text-xs text-gray-600 mt-1">10:30 - 07:30 (IST)</p>
          </div> */}
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-700 max-w-3xl mx-auto">
          For any queries related to pujas, chadhava, or technical assistance,
          feel free to reach out to us - our team is here to help you.
        </p>
      </div>
    </section>
  );
}
