export const LoadingComp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-100"></div>
        <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-200"></div>
      </div>
    </div>
  );
};