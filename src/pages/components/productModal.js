import { useState, useEffect } from "react";
import { workshopList } from "../../utils";
import bannerImg from "../../images/common/modal_banner.png";

export default function ProductModal({ onClose, selectedTickets, register }) {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Show modal with transition
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const toggleSelect = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // allow transition to complete
  };

  // Filter the list
  const filteredList = workshopList.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {/* Modal box with transition */}
      <div
        className={`bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Header */}
        <div
          className="relative px-6 py-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <h2 className="text-white text-xl font-bold">
            SELECT SOLUTIONS/PRODUCTS
          </h2>
          <button
            type="button"
            className="absolute top-3 right-3 text-white p-2 border-2 rounded-full leading-none font-bold"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Try Product/Service"
            className="w-full border rounded px-4 py-2 focus:outline-none text-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="p-4 font-light">
          <p>
            I am interested in sourcing the following solutions/products?
            (Select Top 5) * Please ensure you have chosen at least one category
            in each section
          </p>
        </div>

        {/* Checkbox List */}
        {/* <div className="max-h-[300px] min-h-[300px] overflow-y-auto p-4 space-y-5">
          {filteredList.length > 0 ? (
            filteredList.map((item, idx) => (
              <label key={idx} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-[15px] h-[15px]"
                  checked={selected.includes(item)}
                  onChange={() => toggleSelect(item)}
                />
                <span>{item}</span>
              </label>
            ))
          ) : (
            <div className="text-gray-500">No matching items found.</div>
          )}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 max-h-[300px] min-h-[300px] overflow-y-auto p-4">
          {selectedTickets.map((item, idx) => (
            <>
              <label
                key={idx}
                className="flex items-center gap-2 font-normal text-md"
              >
                {/* <input
                                type="checkbox"
                                value={item?.title}
                                {...register(`services_${idx}`)}
                                className="w-[15px] h-[15px]"
                                // disabled={
                                //   selectedWorkshops.length >= 6 &&
                                //   !selectedWorkshops.includes(item)
                                // }
                              /> */}
                {item?.title}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item?.features?.length > 0 ? (
                  item?.features?.map((feature, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={item?.title}
                        {...register(`services_${idx}_${i}`)}
                        className="w-[15px] h-[15px]"
                        // disabled={
                        //   selectedWorkshops.length >= 6 &&
                        //   !selectedWorkshops.includes(item)
                        // }
                      />
                      {feature?.name}
                    </label>
                  ))
                ) : (
                  <label>No Service Found</label>
                )}
              </div>
            </>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t">
          <button
            type="button"
            className="border border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-footer-gradient text-white rounded-lg"
            onClick={() => {
              console.log("Selected items:", selected);
              handleClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
