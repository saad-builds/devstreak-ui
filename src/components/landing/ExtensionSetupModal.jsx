import React from "react";
import { FiDownload, FiFolderPlus, FiToggleRight, FiX, FiCheckCircle } from "react-icons/fi";

export default function ExtensionSetupModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <FiDownload size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Install DevStreak Extension</h3>
            <p className="text-xs text-gray-400">Takes less than 1 minute to set up</p>
          </div>
        </div>

        {/* Direct Download Trigger */}
        <div className="mb-6 p-4 rounded-xl bg-gray-900/60 border border-gray-800/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">DevStreak v1.0.0</p>
            <p className="text-xs text-gray-400">Chrome / Edge Extension (.zip)</p>
          </div>
          <a
            href="/extension.rar"
            download="DevStreak-Extension.rar"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20"
          >
            <FiDownload size={16} />
            <span>Download .RAR</span>
          </a>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-4 text-sm text-gray-300">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-gray-400">
            3-Step Installation
          </h4>

          {/* Step 1 */}
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-orange-400 text-xs font-bold shrink-0">
              1
            </div>
            <div>
              <p className="font-medium text-white">Unzip the Downloaded File</p>
              <p className="text-xs text-gray-400">Extract <code className="text-orange-300">DevStreak-Extension.zip</code> onto your computer.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-orange-400 text-xs font-bold shrink-0">
              2
            </div>
            <div>
              <p className="font-medium text-white">Enable Developer Mode in Chrome</p>
              <p className="text-xs text-gray-400">
                Open <code className="text-orange-300">chrome://extensions</code> in a new tab and switch on <strong>Developer Mode</strong> (top right toggle).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-orange-400 text-xs font-bold shrink-0">
              3
            </div>
            <div>
              <p className="font-medium text-white">Load Unpacked Extension</p>
              <p className="text-xs text-gray-400">
                Click <strong>Load unpacked</strong> (top left button) and select your extracted folder.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center gap-2 text-xs text-emerald-400">
          <FiCheckCircle size={16} />
          <span>You're ready! Log in through the extension popup to start syncing streaks.</span>
        </div>

      </div>
    </div>
  );
}