import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardComp from "../dashboard/DashboardComp";
import UserTable from "../components/UserTable";


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      <div>
        {/* Sidebar */}
        <DashboardComp />
      </div>
      {tab === "onwers" && <UserTable />}
 
      
    </div>
  );
}
