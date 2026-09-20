import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CarAssistant from "@/components/assistant/CarAssistant";
function Layout() {
  return <div className="flex min-h-screen flex-col bg-background"><Header /><main className="flex-1"><Outlet /></main><Footer /><CarAssistant /></div>;
}
export {
  Layout as default
};
