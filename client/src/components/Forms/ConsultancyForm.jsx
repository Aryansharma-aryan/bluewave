import { motion } from "framer-motion";

export default function ConsultationForm() {
  return (
    <section className="bg-gray-50 min-h-screen pt-28 pb-16 px-4">
      
      {/* Container */}
      <div className="max-w-3xl mx-auto">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
         <h1 className="text-3xl md:text-4xl font-semibold tracking-tight 
bg-gradient-to-r from-blue-600 to-cyan-500 
bg-clip-text text-transparent">
  Book Your Consultation
</h1>

          <p className="mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
            Get expert guidance tailored to your visa journey. Our specialists will
            review your profile and guide you with the best possible options.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8"
        >
          
          <form className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone *
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Country *
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select country</option>
                <option>India</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>UK</option>
              </select>
            </div>

            {/* Visa Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Visa Type *
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select visa type</option>
                <option>Study Visa</option>
                <option>Work Visa</option>
                <option>PR</option>
                <option>Visitor Visa</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows="3"
                placeholder="Tell us about your requirement..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg 
                hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[1px] 
                transition-all duration-300"
              >
                Submit Request
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
}