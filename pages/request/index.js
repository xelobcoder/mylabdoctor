"use client";
import { useState } from "react";
import { handleSearch } from "../../lib/billingUtil";
import { useRouter } from "next/navigation";

export default function RequestTest() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();
  return (
    <>
      <div style={{ width: '80%' }}>
        <input type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search using patient name or mobile number or email address or your unique id" className="prime-input" />
        <button onClick={(ev) => { handleSearch(query, setResults, setLoading) }} type="button" className="btn-orange mx-1">
          search
        </button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && (
        <div style={{ marginTop: '30px' }}>
          {results.length > 0 ? (
            <div className="list-group">
              {
                results.map((item, index) => {
                  return (
                    <div className="list-group-item front-filtering-client " key={index}>
                      <p>{item?.firstname} {item?.middlename} {item?.lastname} ({item?.gender}) ({item?.age} {item?.ageType})</p>
                      <p>Email: {item?.email}</p>
                      <p>DOB: {new Date(item?.dob).toLocaleDateString() || ""}</p>
                      <p>Marital Status: {item?.marital_status}</p>
                      <p>Mobile Number: {item?.mobile_number}</p>
                      <p>
                        <button onClick={(ev) => { router.push(`/request/billing?patientid=${item?.patientid}`) }} className="btn-success p-1 mx-1" style={{ marginTop: '-10px' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>{" "}request test
                        </button>
                      </p>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div className="list-group mt-1">
              <div className="list-group-item d-flex justify-content-between">
                <p className="fw-bold">No Data Available</p>
                <button className="btn btn-success p-2" onClick={(ev) => { router.push('/request/new') }}>
                  register new client
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}