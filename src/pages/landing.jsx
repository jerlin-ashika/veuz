import { useEffect, useState } from "react";
import { tickets } from "../utils";
import bannerImg from "../images/common/banner.png";
import { TicketCard } from "./components/ticketCard";
import { useNavigate } from "react-router-dom";

export default function TicketGrid() {
  const [mounted, setMounted] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  const handleQuantityChange = (qty, title, price,features) => {
    const updated = {
      qty,
      price,
      features
    };

    setQuantities((prev) => {
      const newQuantities = {
        ...prev,
        [title]: updated,
      };
      const filteredQuantities = Object.fromEntries(
        Object.entries(newQuantities).filter(([_, value]) => value.qty > 0)
      );
      localStorage.setItem(
        "ticketQuantities",
        JSON.stringify(filteredQuantities)
      );

      return newQuantities;
    });
  };

  const calculateTotal = () => {
    return Object.values(quantities).reduce((total, item) => {
      return total + item.qty * parseFloat(item.price);
    }, 0);
  };

  const total = calculateTotal().toFixed(2);

  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center w-full h-[40px] md:h-[63px] lg:h-[125px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />

      <div
        className={`transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        } space-y-6 p-2 md:p-12 lg:p-20`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              {...ticket}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>

      <div
        className="bg-cover bg-center w-full h-[40px] md:h-[63px] lg:h-[125px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />

      <div
        style={{ zIndex: 2000 }}
        className="flex justify-end items-center bg-footer-gradient p-2 md:p-5 px-2 md:px-12 lg:px-20 text-white tracking-wider sticky bottom-0"
      >
        <div className="mr-4 text-sm md:text-md lg:text-lg font-normal">
          Total:{" "}
          <span className="text-md md:text-lg lg:text-3xl font-bold">
            EUR {total}
          </span>{" "}
          <span className="text-sm md:text-md lg:text-lg font-normal">
            Incl. 20% VAT
          </span>
          <br />
          <button
            type="button"
            className="text-xs md:text-sm opacity-70 bg-transparent border-none p-0 cursor-pointer"
          >
            View Ticket summary
          </button>
        </div>
        <button
          onClick={() => navigate("/registration")}
          className="text-sm md:text-md lg:text-xl bg-white text-green font-bold px-2 md:px-6 py-2 rounded-lg transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
