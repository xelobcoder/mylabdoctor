"use client"
import { useEffect, useState, useCallback } from "react"
import { BarChart, CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import Loader from "../accessories/Loader"
import { customFetch } from "../request/util"

export default function PerformanceChartGeneral({ target, upCallReceiver, type, show, title, subtarget, upcall, clinicianid }) {
  const [data, setData] = useState([])
  const [isloading, setLoading] = useState(true)

  const getAndTransform = useCallback(async () => {
    if (target && clinicianid) {
      setLoading(true)
      customFetch(`sales/summary/general?target=${target}&&branch=all&&clinicianid=${clinicianid}`)
        .then((data) => {
          const { result } = data
          setLoading(false)
          if (result) {
            setData((prev) => {
              if (result.length > 0) {
                return result
              } else {
                return prev
              }
            })
            upcall && upCallReceiver(result)
          } else setData([])
        })
        .catch((err) => {
          setLoading(false)
          setData([])
        })
    }
  }, [target, clinicianid])

  useEffect(() => {
    getAndTransform()
  }, [getAndTransform])

  const renderer = () => {
    if (isloading) return <Loader />
    else {
      if (data.length <= 0) {
        return <div className="alert alert-info opacity-75 mt-2">No Data Available to display chart</div>
      } else {
        return (
          <>
            <h6 className="text-secondary">{title}</h6>
            {type === "Bar" ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={subtarget} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={show} barSize={30} fill={show == "salesAmount" ? "#198cf0" : "#82ca9d"} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={subtarget} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={show} stroke={show == "salesAmount" ? "#8884d8" : "#82ca9d"} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </>
        )
      }
    }
  }

  return <section className="bg-white px-2">{renderer()}</section>
}
