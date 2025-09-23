import { EmergencyPanel } from "./emergency-panel";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Emergency | DigiSaarthi",
};

export default function EmergencyPage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <EmergencyPanel />
        </div>
    );
}
