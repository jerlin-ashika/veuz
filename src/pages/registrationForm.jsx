import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { workshopList } from "../utils";
import bannerImg from "../images/common/banner.png";
import subBannerImg from "../images/common/sub_banner.png";
import bannerLogos from "../images/common/banner_sponser.png";
import bodyBg from "../images/common/body_bg.png";
import Stepper from "./components/stepper";
import ProductModal from "./components/productModal";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  country: yup.string().required("Required"),
  region: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email")], "Emails must match")
    .required("Required"),
  nationality: yup.string().required("Required"),
  mobile: yup
    .string()
    .required("Required")
    .matches(/^[0-9]+$/, "Only numbers (0–9) are allowed"),
  company: yup.string().required("Required"),
  jobTitle: yup.string().required("Required"),
  companyType: yup.string().required("Required"),
  industry: yup.string().required("Required"),
  workshops: yup
    .array()
    .of(yup.string())
    .max(6, "Select up to 6 workshops")
    .min(1, "Please select at least one workshop"),
});

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isTop, setIsTop] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      workshops: [],
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isTop]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = methods;

  const selectedWorkshops = watch("workshops") || [];
  const watchFirstName =
    watch("firstName") || watch("lastName")
      ? `${watch("firstName")} ${watch("lastName")}`
      : "Full Name";
  const watchCompanyName = watch("company") ? watch("company") : "Company Name";
  const watchJobTitle = watch("jobTitle") ? watch("jobTitle") : "Job Title";
  const watchCountry = watch("country")
    ? watch("country")
    : "Country of Residence";
  const watchComapnyType = watch("companyType")
    ? watch("companyType")
    : "Visitor";

  const onSubmit = (data) => {
    console.log("Final Submitted Data:", data);
    navigate("/registration-success");
    localStorage.removeItem("ticketQuantities");
  };

  const handleNext = async () => {
    const valid = await trigger();
    if (valid) {
      setStep((s) => s + 1);
      setIsTop(isTop + 1);
    }
  };
  const [selectedTickets, setSelectedTickets] = useState([]);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ticketQuantities")) || {};
    const selected = Object.entries(stored).map(([title, data]) => ({
      title,
      qty: data.qty,
      price: data.price,
    }));
    setSelectedTickets(selected);
  }, []);

  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center w-full h-[40px] md:h-[63px] lg:h-[125px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />
      <div style={{ backgroundImage: `url(${bodyBg})` }}>
        <div className="flex justify-center">
          <Stepper
            steps={["Step 1", "Step 2", "Step 3", "Step 4"]}
            currentStep={step - 1}
          />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row border border-green max-w-7xl mx-auto bg-cus_gray rounded-lg">
              <div
                className={`${
                  step !== 4 ? "basis-3/4 w-full he-fill" : "w-full he-fill"
                }  `}
              >
                {" "}
                <div className="m-2 md:m-6  bg-white shadow rounded transition-all duration-500 ease-in-out animate-fade-in rounded-lg">
                  {step === 1 && (
                    <>
                      <div className="flex flex-col md:flex-row gap-2 items-center justify-between  bg-footer-gradient text-white  p-5  rounded-t-lg ">
                        <h2 className="text-md md:text-xl lg:text-3xl font-normal">
                          Registration Infomation 1
                        </h2>
                        {selectedTickets.length > 0 && (
                          <div className="text-gray-200 font-light cus_text_gray px-2 py-1 bg-white bg-opacity-10 border border-white/10 rounded-md text-sm md:text-md lg:text-md">
                            <span>
                              {selectedTickets[0]?.title}
                              {selectedTickets.length > 1 &&
                                ` + ${selectedTickets.length - 1} more`}
                            </span>
                          </div>
                        )}{" "}
                        {/* PREMIUM TICKET - FREE incl. 19% VAT */}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 ms:p-6">
                        <div className="flex flex-col">
                          <label className="required">First Name</label>
                          <input
                            {...register("firstName")}
                            placeholder=""
                            className="input"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="required">Last Name</label>
                          <input
                            {...register("lastName")}
                            placeholder=""
                            className="input"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">
                            Country of residence
                          </label>
                          <select {...register("country")} className="input">
                            <option value="">Country of residence *</option>
                            <option value="India">India</option>
                            <option value="UAE">UAE</option>
                          </select>
                          {errors.country && (
                            <p className="text-red-500 text-sm">
                              {errors.country.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Region</label>
                          <select {...register("region")} className="input">
                            <option value="">Region *</option>
                            <option value="South">South</option>
                            <option value="North">North</option>
                          </select>
                          {errors.region && (
                            <p className="text-red-500 text-sm">
                              {errors.region.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Email</label>
                          <input
                            {...register("email")}
                            placeholder=""
                            className="input"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Confirm Email</label>
                          <input
                            {...register("confirmEmail")}
                            placeholder=""
                            className="input"
                          />
                          {errors.confirmEmail && (
                            <p className="text-red-500 text-sm">
                              {errors.confirmEmail.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Nationality</label>
                          <select
                            {...register("nationality")}
                            className="input"
                          >
                            <option value="">Nationality *</option>
                            <option value="Indian">Indian</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.nationality && (
                            <p className="text-red-500 text-sm">
                              {errors.nationality.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Mobile</label>
                          <input
                            {...register("mobile")}
                            placeholder="Mobile number *"
                            className="input"
                            type="number"
                          />
                          {errors.mobile && (
                            <p className="text-red-500 text-sm">
                              {errors.mobile.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Company</label>
                          <input
                            {...register("company")}
                            placeholder="Company name *"
                            className="input"
                          />
                          {errors.company && (
                            <p className="text-red-500 text-sm">
                              {errors.company.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Job Title</label>
                          <input
                            {...register("jobTitle")}
                            placeholder="Job title *"
                            className="input"
                          />
                          {errors.jobTitle && (
                            <p className="text-red-500 text-sm">
                              {errors.jobTitle.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Company Type</label>
                          <select
                            {...register("companyType")}
                            className="input"
                          >
                            <option value="">Company type *</option>
                            <option value="Startup">Startup</option>
                            <option value="Enterprise">Enterprise</option>
                          </select>
                          {errors.companyType && (
                            <p className="text-red-500 text-sm">
                              {errors.companyType.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Industry</label>
                          <select {...register("industry")} className="input">
                            <option value="">Select Industry</option>
                            <option value="Tech">Tech</option>
                            <option value="Healthcare">Healthcare</option>
                          </select>
                          {errors.industry && (
                            <p className="text-red-500 text-sm">
                              {errors.industry.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 w-full p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                          <label className=" block mb-2">
                            What products & services are you interested in? *
                          </label>
                          <div
                            onClick={() => setShowModal(true)}
                            className="bg-button-gradient cursur-pointer  rounded-md px-4  py-2 text-white text-sm"
                          >
                            <span className="font-light ">SELECT </span>
                            <span className="font-semibold">
                              SOLUTIONS/PRODUCTS
                            </span>
                          </div>
                        </div>
                        <label className=" block mb-4 font-normal text-md">
                          Select WorkShop
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {workshopList.map((item, idx) => (
                            <label
                              key={idx}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                value={item}
                                {...register("workshops")}
                                className="w-[15px] h-[15px]"
                                disabled={
                                  selectedWorkshops.length >= 6 &&
                                  !selectedWorkshops.includes(item)
                                }
                              />
                              {item}
                            </label>
                          ))}
                        </div>
                        {errors.workshops && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.workshops.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="flex flex-col md:flex-row gap-2 items-center justify-between  bg-footer-gradient text-white  p-5  rounded-t-lg ">
                        <h2 className="text-md md:text-xl lg:text-3xl font-normal">
                          Registration Infomation 2
                        </h2>
                        {selectedTickets.length > 0 && (
                          <div className="text-gray-200 font-light cus_text_gray px-2 py-1 bg-white bg-opacity-10 border border-white/10 rounded-md text-sm md:text-md lg:text-md">
                            <span>
                              {selectedTickets[0]?.title}
                              {selectedTickets.length > 1 &&
                                ` + ${selectedTickets.length - 1} more`}
                            </span>
                          </div>
                        )}{" "}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 ms:p-6">
                        <div className="flex flex-col">
                          <label className="required">First Name</label>
                          <input
                            {...register("firstName")}
                            placeholder=""
                            className="input"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="required">Last Name</label>
                          <input
                            {...register("lastName")}
                            placeholder=""
                            className="input"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Email</label>
                          <input
                            {...register("email")}
                            placeholder=""
                            className="input"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Confirm Email</label>
                          <input
                            {...register("confirmEmail")}
                            placeholder=""
                            className="input"
                          />
                          {errors.confirmEmail && (
                            <p className="text-red-500 text-sm">
                              {errors.confirmEmail.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Job Title</label>
                          <input
                            {...register("jobTitle")}
                            placeholder="Job title *"
                            className="input"
                          />
                          {errors.jobTitle && (
                            <p className="text-red-500 text-sm">
                              {errors.jobTitle.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="flex flex-col md:flex-row gap-2 items-center justify-between  bg-footer-gradient text-white  p-5  rounded-t-lg ">
                        <h2 className="text-md md:text-xl lg:text-3xl font-normal">
                          Registration Infomation 3
                        </h2>
                        {selectedTickets.length > 0 && (
                          <div className="text-gray-200 font-light cus_text_gray px-2 py-1 bg-white bg-opacity-10 border border-white/10 rounded-md text-sm md:text-md lg:text-md">
                            <span>
                              {selectedTickets[0]?.title}
                              {selectedTickets.length > 1 &&
                                ` + ${selectedTickets.length - 1} more`}
                            </span>
                          </div>
                        )}{" "}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 ms:p-6">
                        <div className="flex flex-col">
                          <label className="required">First Name</label>
                          <input
                            {...register("firstName")}
                            placeholder=""
                            className="input"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="required">Last Name</label>
                          <input
                            {...register("lastName")}
                            placeholder=""
                            className="input"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Email</label>
                          <input
                            {...register("email")}
                            placeholder=""
                            className="input"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Confirm Email</label>
                          <input
                            {...register("confirmEmail")}
                            placeholder=""
                            className="input"
                          />
                          {errors.confirmEmail && (
                            <p className="text-red-500 text-sm">
                              {errors.confirmEmail.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Mobile</label>
                          <input
                            {...register("mobile")}
                            placeholder="Mobile number *"
                            className="input"
                          />
                          {errors.mobile && (
                            <p className="text-red-500 text-sm">
                              {errors.mobile.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Company</label>
                          <input
                            {...register("company")}
                            placeholder="Company name *"
                            className="input"
                          />
                          {errors.company && (
                            <p className="text-red-500 text-sm">
                              {errors.company.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="required">Job Title</label>
                          <input
                            {...register("jobTitle")}
                            placeholder="Job title *"
                            className="input"
                          />
                          {errors.jobTitle && (
                            <p className="text-red-500 text-sm">
                              {errors.jobTitle.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div className="w-full p-3 md:p-6 bg-white rounded-xl shadow-md border">
                        <div className="bg-footer-gradient text-white p-4 rounded-t-md">
                          <h2 className="text-xl font-bold">
                            Registration Summary
                          </h2>
                        </div>

                        <div className="p-4 space-y-3 ">
                          {selectedTickets.length > 0 ? (
                            selectedTickets.map((ticket, index) => (
                              <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold">
                                  {ticket?.title} x {ticket?.qty}
                                </span>
                                <span className="font-medium">
                                  EUR {ticket?.price * ticket?.qty}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div></div>
                          )}
                          {/* <div className="flex flex-col md:flex-row justify-between border-b pb-2">
                            <span className="font-semibold">
                              Student Ticket Access On Day 3 Only
                            </span>
                            <span className="text-black">
                              EUR 50.40 SUBJECT TO APPROVAL Incl. 19%
                            </span>
                          </div> */}
                        </div>

                        {/* Promo Code */}
                        <div className="p-4 border border-liteGreen bg-greenWithOp rounded-lg">
                          <label className="block text-md text-green font-semibold mb-2">
                            Have a promo code?
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter Promo code"
                              className="w-full border rounded-lg px-3 py-2 outline-none text-sm font-light"
                            />
                            <button
                              type="button"
                              className="px-6 py-2 bg-button-gradient text-white rounded-lg"
                            >
                              APPLY
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-end items-center p-4">
                          <span className="font-semibold text-lg">
                            Total:&nbsp;
                          </span>
                          <span className="text-lg font-bold">
                            EUR{" "}
                            {selectedTickets?.reduce(
                              (a, b) => b?.price * b?.qty + a,
                              0
                            )}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            Incl. 20% VAT
                          </span>
                        </div>

                        {/* Terms and Consent */}
                        <div className="space-y-4 p-4 text-sm text-gray-500 font-light">
                          <div className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            <p>
                              I have read and accept the{" "}
                              <a href="#" className="text-red-600 underline">
                                terms and conditions
                              </a>
                              ,{" "}
                              <a href="#" className="text-red-600 underline">
                                Privacy Policy
                              </a>
                              , and consent that attendees under the age of 21
                              will not be admitted, and admission to the
                              exhibition is restricted to trade and business
                              professionals only, and students above 16 and
                              below 18 can attend only if accompanied by school
                              or faculty member{" "}
                              <span className="text-red-600">*</span>
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            <p>
                              I hereby consent the use of my data by the
                              organiser, exhibitors and sponsors of DWTC & KAOUN
                              International to delivering services and for
                              marketing purposes. I am aware that I can object
                              to the sending of newsletters at any time{" "}
                              <span className="text-red-600">*</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {step !== 4 ? (
                <div className="basis-1/4 ">
                  <div className=" mt-6 mr-3 ml-3 md:ml-0 md:mr-6 sticky top-0">
                    <div className=" w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md font-sans text-center">
                      <div
                        className="relative  px-6 py-4 rounded-t-lg bg-no-repeat bg-center bg-cover"
                        style={{ backgroundImage: `url(${subBannerImg})` }}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <img src={bannerLogos} alt=" Logo" className="h-10" />
                        </div>
                      </div>
                      <span className=" bg-footer-gradient text-white text-sm md:text-md px-5 py-3 rounded-md font-medium ">
                        Registration Information 1
                      </span>

                      <div className="pt-8 pb-6 space-y-2  text-cus_text_gray text-md font-semibold ">
                        <p className="uppercase   text-lg font-bold mt-1">
                          {watchFirstName}
                        </p>
                        <p className="font-light ">{watchJobTitle}</p>
                        <p className="font-light ">{watchCompanyName}</p>
                        <p className="font-light ">{watchCountry}</p>
                      </div>

                      <div className="bg-gray-50 py-4 rounded-b-lg shadow-[0px_4.81px_33.7px_0px_#0000001F]">
                        <p className="text-gray-400 font-semibold text-md uppercase tracking-wide">
                          Badge Category
                        </p>
                        {selectedTickets?.map((dt) => (
                          <p className="uppercase text-md font-bold  tracking-wide text-black">
                            {dt?.title}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
            <div className="flex justify-center my-6 max-w-7xl mx-auto gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep((prev) => prev - 1);
                  }}
                  className="px-6 py-2 bg-button-gradient text-white rounded-lg"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className="px-6 py-2 bg-footer-gradient text-white rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-footer-gradient text-white rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
      <div
        className="bg-cover bg-center w-full h-[40px] md:h-[63px] lg:h-[125px] "
        style={{ backgroundImage: `url(${bannerImg})` }}
      />
      {showModal && <ProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
