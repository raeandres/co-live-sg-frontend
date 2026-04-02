import React, { useState } from "react";
import { ChevronLeft, CheckCircle, User, CreditCard, Briefcase, MapPin, ChevronDown } from "lucide-react";
import { PROPERTIES } from "@/data/properties";

interface InterestFormProps {
  propertyId?: string;
  onBack: () => void;
}

const ID_TYPES = [
  "Singapore NRIC (Blue)",
  "Singapore NRIC (Pink)",
  "Employment Pass (EP)",
  "S Pass",
  "Work Permit",
  "Dependant's Pass (DP)",
  "Long Term Visit Pass (LTVP)",
  "Student Pass",
  "Passport (Tourist)",
  "Permanent Resident (PR)",
];

const INDUSTRIES = [
  "Technology / IT",
  "Finance / Banking",
  "Healthcare / Medical",
  "Education",
  "Hospitality / F&B",
  "Retail / E-commerce",
  "Construction / Engineering",
  "Manufacturing",
  "Government / Public Sector",
  "Logistics / Transport",
  "Media / Creative",
  "Consulting / Professional Services",
  "Other",
];

const JOB_TYPES = [
  "Full-time Employee",
  "Part-time Employee",
  "Contract / Freelance",
  "Intern / Trainee",
  "Business Owner / Entrepreneur",
  "Student",
  "Others",
];

interface FormData {
  fullName: string;
  idType: string;
  idNumber: string;
  industry: string;
  jobType: string;
  workLocation: string;
  propertyId: string;
}

const InterestForm: React.FC<InterestFormProps> = ({ propertyId, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    idType: "",
    idNumber: "",
    industry: "",
    jobType: "",
    workLocation: "",
    propertyId: propertyId || "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedProperty = PROPERTIES.find(p => p.id === formData.propertyId);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.idType) newErrors.idType = "Please select an ID/pass type";
    if (!formData.idNumber.trim()) newErrors.idNumber = "ID/Passport number is required";
    if (!formData.industry) newErrors.industry = "Please select your industry";
    if (!formData.jobType) newErrors.jobType = "Please select your job type";
    if (!formData.workLocation.trim()) newErrors.workLocation = "Work location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const update = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex flex-col items-center justify-center px-5 pb-20">
        <div
          className="w-full max-w-md bg-white rounded-[15px] p-8 text-center"
          style={{ boxShadow: "0 5px 20px rgba(100,80,140,0.1)" }}
        >
          <div className="w-16 h-16 rounded-full bg-[#E63946]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-[#E63946]" />
          </div>
          <h2
            className="text-2xl font-bold text-[#2d2540] mb-2"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            You're on the list!
          </h2>
          <p
            className="text-sm text-[#9e97b0] mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Thanks <span className="font-semibold text-[#2d2540]">{formData.fullName}</span>! We've received your interest for
          </p>
          {selectedProperty && (
            <p
              className="text-sm font-bold text-[#E63946] mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {selectedProperty.name}
            </p>
          )}
          <p
            className="text-xs text-[#9e97b0] mb-8 leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our team will reach out to you within 1–2 business days to discuss availability and arrange a viewing.
          </p>
          <button
            onClick={onBack}
            className="w-full py-3.5 rounded-[10px] text-white font-bold text-sm transition-all duration-200 active:scale-[0.97]"
            style={{
              background: "#E63946",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 5px 20px rgba(230,57,70,0.25)",
            }}
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-24">
      {/* Header */}
      <div
        className="sticky top-0 z-10 bg-white px-5 py-4 flex items-center gap-3"
        style={{ boxShadow: "0 2px 12px rgba(100,80,140,0.08)" }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-[10px] bg-[#faf8ff] flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <ChevronLeft size={18} className="text-[#2d2540]" />
        </button>
        <div>
          <h1
            className="text-lg font-bold text-[#2d2540] leading-tight"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Express Interest
          </h1>
          <p
            className="text-xs text-[#9e97b0]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Fill in your details to secure a viewing
          </p>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Property Selector */}
        <div
          className="bg-white rounded-[10px] p-4 mb-5"
          style={{ boxShadow: "0 5px 20px rgba(100,80,140,0.08)" }}
        >
          <p
            className="text-xs font-semibold text-[#9e97b0] mb-2 uppercase tracking-wide"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Interested In
          </p>
          <SelectField
            value={formData.propertyId}
            onChange={(v) => update("propertyId", v)}
            placeholder="Select a property"
            options={PROPERTIES.map(p => ({ value: p.id, label: p.name }))}
          />
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div
            className="bg-white rounded-[15px] overflow-hidden"
            style={{ boxShadow: "0 5px 20px rgba(100,80,140,0.08)" }}
          >
            {/* Personal Info Section */}
            <div className="px-5 pt-5 pb-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-[7px] bg-[#E63946]/10 flex items-center justify-center">
                  <User size={13} className="text-[#E63946]" />
                </div>
                <h3
                  className="text-sm font-bold text-[#2d2540]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Personal Information
                </h3>
              </div>

              <FormField label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => update("fullName", e.target.value)}
                  placeholder="e.g. Sarah Tan Wei Ling"
                  className={inputClass(!!errors.fullName)}
                />
              </FormField>
            </div>

            <div className="w-full h-px bg-[#f0edf8] mx-5" style={{ width: "calc(100% - 40px)", marginLeft: "20px" }} />

            {/* ID Section */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-[7px] bg-[#2a9d8f]/10 flex items-center justify-center">
                  <CreditCard size={13} className="text-[#2a9d8f]" />
                </div>
                <h3
                  className="text-sm font-bold text-[#2d2540]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Identification
                </h3>
              </div>

              <FormField label="ID / Pass Type" error={errors.idType}>
                <SelectField
                  value={formData.idType}
                  onChange={(v) => update("idType", v)}
                  placeholder="Select ID/pass type"
                  options={ID_TYPES.map(t => ({ value: t, label: t }))}
                  hasError={!!errors.idType}
                />
              </FormField>

              <FormField label="IC / Passport Number" error={errors.idNumber}>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={e => update("idNumber", e.target.value.toUpperCase())}
                  placeholder="e.g. S1234567A"
                  className={inputClass(!!errors.idNumber)}
                />
              </FormField>
            </div>

            <div className="h-px bg-[#f0edf8]" style={{ marginLeft: "20px", marginRight: "20px" }} />

            {/* Work Info Section */}
            <div className="px-5 pt-4 pb-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-[7px] bg-[#f97316]/10 flex items-center justify-center">
                  <Briefcase size={13} className="text-[#f97316]" />
                </div>
                <h3
                  className="text-sm font-bold text-[#2d2540]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Work Information
                </h3>
              </div>

              <FormField label="Industry of Work" error={errors.industry}>
                <SelectField
                  value={formData.industry}
                  onChange={(v) => update("industry", v)}
                  placeholder="Select your industry"
                  options={INDUSTRIES.map(i => ({ value: i, label: i }))}
                  hasError={!!errors.industry}
                />
              </FormField>

              <FormField label="Job Type" error={errors.jobType}>
                <SelectField
                  value={formData.jobType}
                  onChange={(v) => update("jobType", v)}
                  placeholder="Select job type"
                  options={JOB_TYPES.map(j => ({ value: j, label: j }))}
                  hasError={!!errors.jobType}
                />
              </FormField>

              <FormField label="Work Location" error={errors.workLocation}>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e97b0]" />
                  <input
                    type="text"
                    value={formData.workLocation}
                    onChange={e => update("workLocation", e.target.value)}
                    placeholder="e.g. One Raffles Quay, CBD"
                    className={`${inputClass(!!errors.workLocation)} pl-9`}
                  />
                </div>
              </FormField>
            </div>
          </div>

          {/* Privacy note */}
          <p
            className="text-xs text-[#9e97b0] text-center mt-4 mb-6 leading-relaxed px-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            🔒 Your information is kept confidential and used solely to match you with the right co-living space.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-[10px] text-white font-bold text-base transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
            style={{
              background: submitting ? "#E63946aa" : "#E63946",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 5px 20px rgba(230,57,70,0.3)",
            }}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Interest"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper components
const inputClass = (hasError: boolean) =>
  `w-full px-3.5 py-3 rounded-[10px] text-sm outline-none transition-all duration-200 bg-[#faf8ff] border ${
    hasError ? "border-[#E63946]" : "border-[#e8e4f0]"
  } text-[#2d2540] placeholder:text-[#9e97b0] focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/10`;

const FormField: React.FC<{
  label: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => (
  <div className="mb-4">
    <label
      className="block text-xs font-semibold text-[#2d2540] mb-1.5"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {label}
    </label>
    {children}
    {error && (
      <p
        className="mt-1 text-xs text-[#E63946]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {error}
      </p>
    )}
  </div>
);

const SelectField: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  hasError?: boolean;
}> = ({ value, onChange, placeholder, options, hasError }) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-3.5 py-3 rounded-[10px] text-sm outline-none transition-all duration-200 bg-[#faf8ff] border appearance-none pr-9 ${
        hasError ? "border-[#E63946]" : "border-[#e8e4f0]"
      } ${value ? "text-[#2d2540]" : "text-[#9e97b0]"} focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/10`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9e97b0] pointer-events-none" />
  </div>
);

export default InterestForm;
