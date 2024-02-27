import { useCallback, useEffect, useState } from "react"
import Loader from "../accessories/Loader"
import { useRouter } from "next/navigation"
import { customFetch, customPost } from "../request/util"
import { calculateTimeUsed, printResultNavigator } from "../accessories/useFetch"

export default function  ReadyTestSummaryAccordion({ id }) {
  const navigate = useRouter()
  const [results, setResults] = useState([])
  const [isloading, setLoading] = useState(true)

  const getTest = useCallback(async () => {
    if (id) {
      customFetch(`result/ready/:${id}`)
        .then((data) => {
          setLoading(false)
          setResults(data)
        })
        .catch((err) => {
          setLoading(false)
          setResults([])
        })
    }
  }, [id])

  useEffect(() => {
    getTest()
  }, [getTest])

  const updatePrintCount = async (item, index) => {
    const { printcount, id } = item
    const count = printcount == null ? 1 : parseInt(printcount) + 1
    const pushResponse = await customPost("result/ready/updateprint/count", "POST", { count, id })
    if (pushResponse.status == "success") {
      const newArray = [...results]
      const prev = newArray[index]["printcount"]
      newArray[index]["printcount"] = prev == null ? 1 : 1 + parseInt(prev)
      setResults(newArray)
    }
  }


  const ReadyComp = (item) => {
    const { ready, ready_date, processing, collection, collection_date, processing_date } = item

    if (ready === "true") {
      return (
        <div className="d-flex justify-content-between text-capitalize">
          <span>
            {" "}
            {/* <CheckRounded color="success" /> */}
            ready on {new Date(ready_date).toLocaleDateString()} at {new Date(ready_date).toLocaleTimeString()}
          </span>
          <span className="border-bottom border-2 border-dark">{calculateTimeUsed(item)}</span>
        </div>
      )
    } else {
      if (processing == "true") {
        return (
          <div className="alert alert-warning bg-opacity-50">
            In processing stage, started at {new Date(processing_date).toLocaleDateString()}
            {"  "}
            {new Date(processing_date).toLocaleTimeString()}
          </div>
        )
      } else if (collection === "true") {
        return (
          <div className="alert alert-secondary bg-opacity-50">
            sample collected on {new Date(collection_date).toLocaleDateString()} at {new Date(collection_date).toLocaleTimeString()}{" "}
            awaiting processing
          </div>
        )
      } else {
        return <div className="alert alert-danger">waiting on sample collection</div>
      }
    }
  }

  const approved = (item) => {
    const { approvalstatus } = item

    if (approvalstatus === 1) {
      return (
        <span className="mt-2 mb-2">
          {/* <CheckRounded color="success" /> */}
          result approved
        </span>
      )
    } else {
      return (
        <span>
          {/* <QuestionAnswer /> */}
          awaiting approval
        </span>
      )
    }
  }

  const buttonsGroup = (item, index) => {
    const { printcount } = item
    return (
      <span>
        <button
          onClick={(e) => {
            updatePrintCount(item, index)
            printResultNavigator(navigate, id, item, true)
          }}
          className="btn btn-primary btn-sm mx-2">
          print count({printcount ? printcount : 0})
        </button>
        <button className="btn btn-secondary btn-sm mx-2">preview count(10)</button>
      </span>
    )
  }
  const rendering = () => {
    if (isloading) {
      return <Loader />
    } else {
      return (
        <div className="mt-4 accordion mx-2" defaultActiveKey={"0"}>
          <div className="accordion-item" eventKey="0">
            <div className="m-0 p-0 accordion-body">
              {results.map((item, index) => {
                const { ready } = item
                return (
                  <ul key={index} className={`m-0 p-0 ${ready === "true" && " border-3 border-start border-success"}`}>
                    <li className={`grid-100 px-3 py-2 ${index != results.length - 1 && "border-bottom"} py-2`}>
                      <div>
                        <span className="fw-bold text-capitalize">{item.name}</span>
                      </div>
                      <div className="grid-100">
                        {ReadyComp(item)}
                        {ready === "true" && (
                          <>
                            {approved(item)}
                            {buttonsGroup(item, index)}
                          </>
                        )}
                      </div>
                    </li>
                  </ul>
                )
              })}
            </div>
          </div>
        </div>
      )
    }
  }
  return <>{rendering()}</>
}
