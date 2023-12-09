"use client";
import Divider from "@/components/Divider";
import { useState } from "react";
import { handleSearch } from "./billing/util";

export default function RequestTest() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  return (
    <Divider>
      <div style={{width:'80%'}}>
        <input type="text"
          value={query}
          onChange={(e) =>  setQuery(e.target.value)}
          placeholder="search using patient name or mobile number or email address or your unique id" className="prime-input" />
        <button onClick={ (ev) =>  {handleSearch(query,setResults)}}type="button" className="btn-orange mx-1">
          search
        </button>
      </div>
      
      <div style={{marginTop:'20px !important'}}>
      {results.length > 0 ? (
        <div className="list-group">
          {
            results.map((item, index) => {
              return (
                <div className="list-group-item front-filtering-client " key={index}>
                  <p>{item?.firstname} {item?.middlename} {item?.lastname} ({item?.gender}) ({item?.age} { item?.ageType})</p>
                  <p>Email: {item?.email}</p>
                  <p>DOB: {new Date(item?.dob).toLocaleDateString() || ""}</p>
                  <p>Marital Status: {item?.marital_status}</p>
                  <p>Mobile Number: {item?.mobile_number}</p>
                </div>
              )
            })
          }
        </div>
      ) : (
        <div className="list-group">
          <div className="list-group-item d-flex justify-content-between">
            <p>No Data Available</p>
          </div>
        </div>
      )}
    </div>
   </Divider>
  )
}