import { useSearchParams } from "next/navigation"
import ChemistryReport from "../../../../components/reports/chemistryReport";

export default function PatientTrendz() {
    const patientid = useSearchParams().get('patientid');
    return (
        <div>
            <h6>{patientid}</h6>
            <ChemistryReport billingid={384} testname="liver_function_test" />
        </div>
    )
}