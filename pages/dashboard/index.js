import { AuthContext } from "@/components/AuthenticationContext";
import GeneralSalesChart from "@/components/dashboard/GeneralSalesCharts";
import { useContext } from "react";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  const employeeid = auth?.employeeid;

  return (
    <section>
      <GeneralSalesChart clinicianid={employeeid} />
    </section>
  )
}