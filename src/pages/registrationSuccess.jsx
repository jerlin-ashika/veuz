import { useNavigate } from "react-router-dom";
import bannerImg from "../images/common/banner.png";
import bodyBg from "../images/common/body_bg.png";
import { useEffect } from "react";

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center w-full h-[40px] md:h-[63px] lg:h-[125px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />
      <div style={{ backgroundImage: `url(${bodyBg})` }} className="py-[150px]">
        <div
          className={`relative z-10 max-w-3xl m-auto  w-full bg-green rounded-2xl shadow-xl px-0 pt-2 text-center transform transition-all duration-700 ${"opacity-100 scale-100"}`}
        >
          <div
            className={`relative z-10 max-w-3xl m-auto  w-full bg-white rounded-2xl shadow-xl px-8 py-12 text-center transform transition-all duration-700 ${"opacity-100 scale-100"}`}
          >
            <h1 className="text-3xl font-bold text-green-700 mb-4 uppercase">
              Thank You!
            </h1>
            <p className="text-xl font-light  mb-4">
              Your registration has been submitted successfully.
            </p>
            <p className="text-md font-light">
              A confirmation email with your event details will be sent to you
              shortly. Please check your inbox (and spam folder).
            </p>

            <button
              type="button"
              className="px-6 py-2 text-md mt-12 bg-footer-gradient text-white rounded-lg"
              onClick={() => navigate("/")}
            >
              Return To Homepage
            </button>
          </div>
        </div>
      </div>
      <div
        className="bg-cover bg-center w-full h-[40px] md:h-[63px] lg:h-[125px] "
        style={{ backgroundImage: `url(${bannerImg})` }}
      />
    </div>
  );
}
