import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiFolderPlus, FiDownload } from "react-icons/fi";

export default function ExtensionSetup() {
  const navigate = useNavigate();

  const stepsWithImages = [
    {
      id: 2,
      stepNumber: "02",
      title: "Navigate to chrome://extensions",
      description:
        "Open Google Chrome, type chrome://extensions in the URL search bar, and press Enter.",
      image: "/guide/step1.png",
    },
    {
      id: 3,
      stepNumber: "03",
      title: "Enable Developer Mode",
      description:
        "In the top-right corner of the Extensions page, switch the 'Developer mode' toggle to ON.",
      image: "/guide/step2.png",
    },
    {
      id: 4,
      stepNumber: "04",
      title: "Click 'Load Unpacked'",
      description:
        "Click the 'Load unpacked' button located at the top-left menu bar.",
      image: "/guide/step3.png",
    },
    {
      id: 5,
      stepNumber: "05",
      title: "Select Folder & Confirm Selection",
      description:
        "Choose the extracted 'extension' folder (not the .rar/.zip file) and click 'Select Folder' to finish.",
      image: "/guide/step4.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Navigation / Go Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-gray-900 border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-xl transition-all hover:text-white shadow-sm cursor-pointer"
          >
            <FiArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Header & Download CTA */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider">
            Installation Guide
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            How to Install the Extension
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Download the extension package below, extract it, and follow the setup steps.
          </p>

          {/* Download Button */}
          <div className="pt-2">
            <a
              href="/DevStreak-Extension.rar"
              download
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all text-sm"
            >
              <FiDownload size={18} />
              <span>Download Extension (.rar)</span>
            </a>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Step 1: Text-only (Download & Extract) */}
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 transition-all hover:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-black flex items-center justify-center text-base shrink-0 shadow-lg">
                01
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Extract (Unzip) the Downloaded File
                </h3>
                <p className="text-sm text-gray-400">
                  After clicking download above, locate <code className="text-orange-400 bg-gray-950 px-1.5 py-0.5 rounded border border-gray-800">DevStreak-Extension.rar</code> in your downloads folder. Right-click and choose <strong className="text-gray-200">Extract Here</strong> or <strong className="text-gray-200">Extract to Folder</strong> so you get an uncompressed folder named <code className="text-orange-400 bg-gray-950 px-1.5 py-0.5 rounded border border-gray-800">extension</code>.
                </p>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center gap-3 text-sm text-orange-300">
              <FiFolderPlus size={22} className="shrink-0 text-orange-400" />
              <span>
                <strong>Important:</strong> Chrome cannot load <code className="bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-200">.rar</code> archives directly. Make sure you extract it to a standard folder first!
              </span>
            </div>
          </div>

          {/* Steps 2-5 with Annotated Images */}
          {stepsWithImages.map((step) => (
            <div
              key={step.id}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5 transition-all hover:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-black flex items-center justify-center text-base shrink-0 shadow-lg">
                  {step.stepNumber}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>

              {/* Smaller Image Container */}
              <div className="overflow-hidden rounded-xl border border-gray-800 bg-black/50 p-3 max-w-xl mx-auto flex justify-center">
                <img
                  src={step.image}
                  alt={`Step ${step.id}: ${step.title}`}
                  className="max-h-[300px] w-auto object-contain rounded-lg shadow-md block"
                />
              </div>
            </div>
          ))}

        </div>

        {/* Completion Card */}
        <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-6 text-center space-y-2 shadow-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
            <FiCheckCircle size={26} />
          </div>
          <h4 className="text-lg font-bold text-white">You're All Set!</h4>
          <p className="text-sm text-gray-300">
            Pin DevStreak to your browser toolbar to start tracking your daily progress automatically.
          </p>
        </div>

      </div>
    </div>
  );
}