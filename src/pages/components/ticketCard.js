import { useEffect, useState } from "react";
import cardHeader from "../../images/ticket/header_overlay.png";
import Overlay1 from "../../images/ticket/overlay_1.png";
import Overlay2 from "../../images/ticket/overlay_2.png";
import Overlay3 from "../../images/ticket/overlay_3.png";
import sponser from "../../images/common/sponser.png";
import Allowed from "../../images/icons/Allowed.svg";
import strikeImg from "../../images/icons/strike.svg";

function BadgeRibbon({ text }) {
  return (
    <div className="corner-ribbon">
      <span className="cr-inner">
        {text === "EXCLUSIVE" ? (
          <span className="cr-text"> {text}</span>
        ) : (
          <div>
            <span className="cr-text-new  pt-0 text-md">
              <span className="font-bold">Best</span>
              <br />
              <span className="font-light">Seller</span>
            </span>
          </div>
        )}
      </span>
    </div>
  );
}

function FeatureItem({ children, disabled }) {
  return (
    <li
      className={`flex items-center gap-2  px-2 py-1 bg-white bg-opacity-10 border border-white/10 rounded-full ${
        disabled ? "opacity-30 " : ""
      }`}
    >
      <img src={Allowed} alt="ticket feature" />
      <span className="text-xs md:text-sm text-gray-200 font-thin">
        {children}
      </span>
    </li>
  );
}

export function TicketCard({
  title,
  headerColor,
  badge,
  price,
  description,
  features,
  priceLabel,
  quantity,
  overlayImg,
  handleQuantityChange,
}) {
  const [quantityState, setQuantityState] = useState(quantity || 0);

  useEffect(() => {
    handleQuantityChange(quantityState, title, price);
  }, [quantityState, quantity]);
  return (
    <div className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-xl flex flex-col justify-between w-full  text-white">
      <div className="relative">
        {badge && <BadgeRibbon {...badge} />}
        <div
          className={`${headerColor} relative rounded-t-3xl py-4 ${
            badge && "pl-[49px]"
          }`}
        >
          <img
            src={cardHeader}
            alt="Overlay"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-3xl"
          />

          <div className="relative z-2">
            <div className="text-sm md:text-md lg:text-lg  font-bold uppercase tracking-wide text-start px-5">
              {title}
            </div>
            <button
              type="button"
              className="text-xs md:text-sm  w-full px-5 uppercase text-yellow font-semibold text-start inline-block  bg-transparent border-none p-0 cursor-pointer"
            >
              View Details &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="relative cus-card-body h-full">
        <img
          src={
            overlayImg === "Overlay1"
              ? Overlay1
              : overlayImg === "Overlay2"
              ? Overlay2
              : Overlay3
          }
          alt="Overlay"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-b-3xl"
        />
        <div className="p-6 px-7 relative z-20 h-full flex flex-col">
          <div className="flex-1  flex  items-center ">
            <div>
              <p className="text-xs md:text-sm mb-4 tracking-wider">
                {description.first}
                <span className="text-liteGreen font-semibold">
                  {description.second}
                </span>
                {description.third}
              </p>
              {features?.length ? (
                <ul className="text-xs space-y-2 mb-5 flex  flex-wrap gap-x-1 gap-y-0">
                  {features.map((feature, i) => {
                    return (
                      <FeatureItem key={i} disabled={feature?.isDisabled}>
                        {feature?.name}
                      </FeatureItem>
                    );
                  })}
                </ul>
              ) : (
                <div className="mt-4">
                  {" "}
                  <img src={sponser} alt="sponser Img" className="" />
                </div>
              )}{" "}
            </div>
          </div>
          <div className="relative">
            <div
              className={`absolute top-0 left-0 w-full bg-border-gradient ${
                quantity ? "h-[1.44px]" : "h-[0.74px]"
              }`}
            />

            <div className="flex  items-center justify-between gap-4 text-white mt-4">
              <div className="flex flex-col md:flex-row  gap-2">
                <div>
                  <span className="text-sm md:text-md lg:text-lg justify-center font-bold">
                    USD{" "}
                    <div className="relative inline-block text-gray-400 font-bold pr-2">
                      43
                      <img
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        src={strikeImg}
                        alt="strike"
                      />
                    </div>
                  </span>
                  <span className="text-sm md:text-md text-start font-semibold px-2 py-1 border border-white rounded-md bg-black">
                    {price}
                  </span>
                </div>
                <span className="text-xs font-light opacity-70  flex items-center">
                  Incl. 20% VAT
                </span>
              </div>
              <div className="flex items-center border border-white rounded-md overflow-hidden">
                {quantityState === 0 ? (
                  <button
                    onClick={() => setQuantityState((q) => Math.max(0, q + 1))}
                    className="bg-white text-black text-[11px] lg:text-[13px] font-bold px-3 uppercase py-1 rounded hover:bg-gray-200 transition"
                  >
                    Buy Now
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-black text-white px-3 py-1  text-[11px] lg:text-[13px]"
                      onClick={() =>
                        setQuantityState((q) => Math.max(0, q - 1))
                      }
                    >
                      -
                    </button>
                    <span className="bg-white text-black font-bold px-4 py-1  text-[11px] lg:text-[13px]">
                      {quantityState}
                    </span>
                    <button
                      className="bg-black text-white px-3 py-1  text-[11px] lg:text-[13px]"
                      onClick={() => setQuantityState((q) => q + 1)}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
