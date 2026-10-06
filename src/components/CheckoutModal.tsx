"use client";

import { X, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type OrderType = "Delivery" | "Pick-Up" | "Car hop";

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [orderType, setOrderType] = useState<OrderType>("Pick-Up");
  const branch = "Fitcore Gym, North Nazimabad";
  const [deliveryArea, setDeliveryArea] = useState("");

  const KARACHI_AREAS = [
    "North Nazimabad", "DHA", "Clifton", "Gulshan-e-Iqbal", 
    "Gulistan-e-Johar", "PECHS", "Malir", "Nazimabad", "Federal B Area"
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = () => {
    if (orderType === "Delivery" && !deliveryArea) {
      alert("Please select a delivery area.");
      return;
    }
    setIsSubmitting(true);
    router.push(`/checkout?type=${orderType}&branch=${encodeURIComponent(branch)}${deliveryArea ? `&area=${encodeURIComponent(deliveryArea)}` : ''}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-node-dark/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header - Navy/Espresso with Logo */}
        <div className="bg-node-light pt-8 pb-12 flex justify-center relative rounded-b-3xl border-b border-node-gray/10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-node-gray hover:text-node-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md transform translate-y-10 border border-node-gray/10">
            <span className="font-serif text-4xl text-node-purple">N.</span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-8 flex flex-col items-center">
          <h2 className="font-sans font-bold text-lg text-node-dark mb-6">Select Your Order Type</h2>
          
          {/* Order Type Tabs */}
          <div className="flex bg-node-light rounded-full p-1 w-full mb-8 border border-node-gray/10">
            {(["Delivery", "Pick-Up", "Car hop"] as OrderType[]).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition-all ${
                  orderType === type 
                    ? "bg-node-purple text-white shadow-md" 
                    : "text-node-gray hover:text-node-dark"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <p className="font-sans text-sm text-node-gray mb-4">
            How would you like to receive your order?
          </p>

          <button className="flex items-center gap-2 px-6 py-2 border border-node-purple text-node-purple rounded-full text-sm font-bold hover:bg-node-purple/10 transition-colors mb-6">
            <Navigation className="w-4 h-4" />
            Getting Location...
          </button>

          {/* Delivery Area Selection (Only for Delivery) */}
          {orderType === "Delivery" && (
            <div className="w-full flex flex-col gap-2 mb-6">
              <label className="text-xs font-bold text-node-gray">Select Delivery Area</label>
              <select 
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                className="w-full p-3 border border-node-gray/20 rounded-lg bg-white text-node-dark text-sm focus:outline-none focus:border-node-purple cursor-pointer"
              >
                <option value="" disabled>Choose an area in Karachi</option>
                {KARACHI_AREAS.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          )}

          {/* Location Info Box */}
          <div className="w-full bg-node-light border border-node-gray/10 rounded-lg p-4 flex gap-4 mb-8">
            <div className="mt-1">
              <MapPin className="w-5 h-5 text-node-purple" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-node-dark">Node Coffee</span>
              <span className="text-xs text-node-gray mt-1 leading-relaxed">
                Plot D-9 first floor Block A, North Nazimabad, Inside Fitcore Gym
              </span>
            </div>
          </div>

          {/* Select Button */}
          <button 
            onClick={handleSelect}
            disabled={isSubmitting}
            className="w-full py-4 bg-node-purple text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-node-dark transition-colors rounded-lg shadow-xl disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Select"}
          </button>

        </div>
      </div>
    </div>
  );
}
