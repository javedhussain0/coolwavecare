// src/pages/PrivacyPolicy.tsx

import Navbar from "../components/Nav";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
            Privacy Policy
          </h1>

          <p className="text-gray-500 mb-8">
            Effective Date: June 14, 2026
          </p>

          <div className="space-y-8 text-gray-700 leading-8">

            <div>
              <h2 className="text-xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name,
                phone number, email address, location, and service details
                when you book a service or contact us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and manage our services.</li>
                <li>To communicate regarding appointments and support.</li>
                <li>To improve customer experience.</li>
                <li>To send service updates and promotional offers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                3. Sharing of Information
              </h2>
              <p>
                We do not sell, rent, or share your personal information
                with third parties except where required by law or to
                provide our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                4. Data Security
              </h2>
              <p>
                We implement reasonable security measures to protect your
                information from unauthorized access, disclosure, or misuse.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                5. Cookies
              </h2>
              <p>
                Our website may use cookies to enhance user experience and
                analyze website traffic. You can disable cookies through
                your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                6. Third-Party Services
              </h2>
              <p>
                We may use trusted third-party tools and services for
                analytics, payments, or communication. These services have
                their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                7. Your Rights
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal information.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your data where applicable.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                8. Changes to This Policy
              </h2>
              <p>
                We reserve the right to update this Privacy Policy at any
                time. Changes will be posted on this page.
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

              <p>Phone: +91 8279797684</p>

              <p>Website: www.coolwavecare.onrender.com</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}