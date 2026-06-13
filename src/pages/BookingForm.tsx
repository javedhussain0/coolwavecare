import type { Service } from "../utils/constant";
import React, { useState, useCallback, useEffect, useRef } from "react";

interface BookingFormProps {
  isOpen: boolean;
  selectedService: Service | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const BookingForm = ({
  isOpen,
  selectedService,
  onClose,
  onSuccess,
}: BookingFormProps) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    acType: "Split AC",
    preferredDate: "",
    preferredTimeSlot: "", // NAYA: Time slot ka state
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const successTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    return () => {
      if (successTimeout.current) clearTimeout(successTimeout.current);
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.currentTarget;

      if (name === "phone") {
        const regex = /^[0-9]*$/; 
        if (value === "" || regex.test(value)) {
          if (value.length <= 10) {
            setFormData((prev) => ({ ...prev, [name]: value }));
          }
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const resetForm = () => {
    setFormData({
      customerName: "",
      phone: "",
      address: "",
      acType: "Split AC",
      preferredDate: "",
      preferredTimeSlot: "", // NAYA: form reset pe time bhi clear hoga
      notes: "",
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formData.phone || !formData.address) {
        alert("Phone Number and Address are strictly required.");
        return;
      }

      if (formData.phone.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      setLoading(true);

      const submitData = {
        date: formData.preferredDate || todayDate,
        timeSlot: formData.preferredTimeSlot || "Any Time", // NAYA: Time slot google sheet ke liye
        name: formData.customerName || "Customer",
        phone: formData.phone,
        service: selectedService!.name,
        status: "Pending",
        address: formData.address,
        acType: formData.acType,
        price: selectedService!.price,
        notes: formData.notes,
        timestamp: new Date().toLocaleString(),
      };

      const scriptURL =
        import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbw6c06ScpCjvjCptuTXwV9pxSJtf00kN62fiqTHCKP2czu8RjNZLluodVi7y7oJe5zv/exec";

      try {
        await fetch(scriptURL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(submitData),
          headers: { "Content-Type": "text/plain;charset=utf-8" },
        });

        setIsSuccess(true);
        successTimeout.current = setTimeout(() => {
          setIsSuccess(false);
          resetForm();
          onClose();
          onSuccess?.();
        }, 3000);
      } catch (error) {
        console.error("Booking failed:", error);
        alert("Booking failed. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, todayDate, selectedService, onClose, onSuccess]
  );

  if (!isOpen || !selectedService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-auto relative animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 sm:p-6 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Book Your Service</h2>
          <p className="text-blue-100 text-sm">
            Fill details and our technician will reach out.
          </p>
        </div>

        {/* Selected service info */}
        <div className="bg-blue-50 border-b border-blue-100 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="font-semibold text-slate-800">{selectedService.name}</div>
          <div className="text-blue-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm w-fit border border-blue-100">
            {selectedService.price}
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-slate-500">
              Your details have been saved. We will contact you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto"
          >
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="House No, Street, Landmark, City"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* AC Type (Moved to take full width or adjust based on layout) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                AC Type
              </label>
              <select
                name="acType"
                value={formData.acType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="Split AC">Split AC</option>
                <option value="Window AC">Window AC</option>
                <option value="Cassette AC">Cassette AC</option>
                <option value="Ducted AC">Ducted AC</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            {/* Preferred Date & NAYA: Preferred Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={todayDate}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Time Slot (Optional)
                </label>
                <select
                  name="preferredTimeSlot"
                  value={formData.preferredTimeSlot}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                >
                  <option value="">Select a time</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                  <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                  <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any specific issue? e.g. Water leaking, Not cooling properly..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center justify-center min-w-[140px] transition disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;