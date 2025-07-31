export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto gap-3  my-6 px-3">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex items-center w-full gap-3">
            <div
              className={`relative z-10 text-bold flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                isCompleted
                  ? "bg-green text-white border-green"
                  : isActive
                  ? "bg-green text-white border-green"
                  : "text-gray-500 border-gray-300 bg-white"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center h-[5px] mx-1">
                 <div
                  className={`w-1/2 h-full rounded-l transition-all duration-500 ${
                   isCompleted || steps[index] && index == currentStep
                      ? "bg-green"
                      : "bg-gray-200"
                  }`}
                />
                <div
                  className={`w-1/2 h-full rounded-r transition-all duration-500 ${
                    isCompleted ? "bg-green" : "bg-gray-200"
                  }`}
                />
               
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
