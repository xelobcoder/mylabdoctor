import { useSearchParams } from "next/navigation";
import ReadyTestSummaryAccordion from "@/components/waitinglist/readyTestSummaryAccordion";
import PreviewPatientInformation from "@/components/accessories/PreviewPatientInformation";

export default function ViewReportSummary() {
  const searchparams = useSearchParams();
  const billingid = searchparams.get('billingid');
  const patientid = searchparams.get("patientid");

  return (
    <section>
      <PreviewPatientInformation patientid={patientid}/>
      <ReadyTestSummaryAccordion id={billingid} />
    </section>
  )
}