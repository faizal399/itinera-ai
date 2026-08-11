"use client";

const DownloadPDF = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="rounded-lg w-full bg-black px-4 py-2 text-white cursor-pointer"
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;