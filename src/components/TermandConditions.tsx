
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

export default function TermsConditions() {
  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 mb-8">
            Effective Date: June 14, 2026
          </p>

          <div className="space-y-8 text-gray-700 leading-8">

            <div>
              <h2 className="text-xl font-semibold mb-3">
                1. Services
              </h2>
              <p>
                CoolWave Care provides AC installation, repair, maintenance,
                gas charging, and related cooling solutions. Services are
                subject to availability and location.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                2. Booking and Appointments
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Customers must provide accurate booking details.</li>
                <li>Appointment timings depend on technician availability.</li>
                <li>CoolWave Care may reschedule appointments if required.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                3. Pricing
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service charges are informed before work begins.</li>
                <li>Extra charges may apply for spare parts.</li>
                <li>Prices may change without prior notice.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                4. Warranty
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Warranty is applicable only to services and spare parts
                  mentioned in the invoice.
                </li>
                <li>
                  Damage caused by misuse or unauthorized repairs is not
                  covered.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                5. Customer Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide safe access to the service location.</li>
                <li>Ensure electricity and required facilities are available.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                6. Cancellation Policy
              </h2>
              <p>
                Customers may cancel or reschedule appointments in advance.
                Cancellation charges may apply in certain situations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                CoolWave Care shall not be liable for indirect or consequential
                damages arising from the use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                8. Intellectual Property
              </h2>
              <p>
                All logos, images, and content on this website are the property
                of CoolWave Care and may not be reproduced without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                9. Privacy
              </h2>
              <p>
                Customer information is used solely for providing services and
                improving user experience. We do not sell personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                10. Changes to Terms
              </h2>
              <p>
                CoolWave Care reserves the right to modify these Terms &
                Conditions at any time.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                Contact Information
              </h2>

              <p>
                <strong>CoolWave Care</strong>
              </p>

              <p>Email: info.coolwavecare@gmail.com</p>

              <p>Website: www.coolwavecare.onrender.com</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}