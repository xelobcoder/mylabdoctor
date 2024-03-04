import { useState, useEffect } from "react"
import TableDisplay from "../accessories/TableDisplay"
import { customFetch } from "../request/util"
import Loader from "../accessories/Loader"

export default function ChemistryReport({ testname = "follicle_stimulating_hormone", billingid = 384 }) {
  const [records, setRecords] = useState([])
  const [isloading, setLoading] = useState(true);
  const columns = [
    { Header: "parameter", accessor: "parameter" },
    {
      Header: "value",
      accessor: "value",
      Cell: ({ row, value }) => {
        return (
          <div>
            <span>
              {value} {row.original.unit}{" "}
            </span>
          </div>
        )
      },
    },
    {
      Header: "reference range",
      accessor: "",
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.upper} - {row.original.lower}
          </div>
        )
      },
    },
    {
      Header: "view  trend",
      accessor: "trend",
      Cell: ({ row }) => {
        return <span className="border-bottom border-primary text-primary">view trend</span>
      },
    },
  ]

  useEffect(() => {
    setLoading(true);
    customFetch(`test/result/check?testname=${testname}&billingid=${billingid}`)
      .then((data) => {
        setLoading(false)
        setRecords(data?.records)
      })
      .catch((err) => {
        setLoading(false)
        setRecords([])
      })
  }, [billingid, testname])

  const renderingView = () => {
    if (isloading) {
      return <Loader />
    } else {
      return (
        <section>
          <h5>{testname}</h5>
          <TableDisplay column={columns} data={records} filtering={false} showpage={false} />
        </section>
      )
    }
  }

  return <div>{renderingView()}</div>
}
