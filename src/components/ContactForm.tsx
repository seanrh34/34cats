import React, { useState } from "react";

export default function ContactForm() {
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);


    // Validation for compulsory fields
    const requiredFields = ["name", "last_name", "email", "message"];
    const missingFields = requiredFields.filter(
      (field) => !formData.get(field)?.toString().trim()
    );

    if (missingFields.length > 0) {
      setResult("Please fill out all required fields.");
      setTimeout(() => setResult(null), 5000);
      return;
    }

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    setResult("Please wait...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (response.ok) {
        setResult("Message sent successfully!");
        form.reset();
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setResult("An error occurred. Please try again.");
    }

    setTimeout(() => setResult(null), 5000);
  };

  return (
    <div className="xl:w-1/3 max-w-xl mx-auto my-10 bg-gradient-to-r from-secondary via-background to-secondary p-5 rounded-[10px] shadow-[0_0px_10px_rgba(var(--color-primary-rgb))]">
      <div className="text-center">
        <h1 className="my-3 text-3xl font-semibold text-text">
          Let's Get in Touch!
        </h1>
        <p className="text-text">
          Fill up the form below to send me a message.
        </p>
      </div>

      <form 
        onSubmit={onSubmit} 
        className="space-y-6 mt-6"
        method="POST">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full text-text text-md">
            <label className="block mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-600 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              required
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-600 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-600 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1">
              Phone (Optional)
            </label>
            <input
              type="text"
              name="phone"
              placeholder="+65 1234 5678"
              className="w-full px-3 py-2 border border-gray-600 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Write your message here..."
            className="w-full px-3 py-2 border border-gray-600 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          ></textarea>
        </div>

        <div className="h-captcha justify-center" data-theme="dark" data-sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}></div>
        <div className="flex justify-center ">
          <button
            type="submit"
            className="relative group flex items-center gap-1 px-10 py-4 border-[4px] border-transparent font-semibold text-[16px] bg-inherit rounded-full text-text shadow-[0_0_0_2px] shadow-accent cursor-pointer overflow-hidden transition-all duration-[50ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 hover:rounded-[12px] hover:shadow-[0_0_0_12px_transparent]"
          >
            <svg
              viewBox="0 0 24 24"
              className="arr-2 absolute left-[-25%] w-6 fill-accent z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-secondary"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>

            <span className="circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-accent rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100"></span>

            <span className="relative z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] -translate-x-3 group-hover:translate-x-3 group-hover:text-secondary">
              Submit
            </span>

            <svg
              viewBox="0 0 24 24"
              className="arr-1 absolute right-4 w-6 fill-accent z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-secondary"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </div>

        {result && (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
            {result}
          </p>
        )}
      </form>
    </div>
  );
};
