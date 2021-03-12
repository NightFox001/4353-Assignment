// import moment from 'moment'
import { useState } from 'react'


export const TableV2 = ({ quote }) => {
  const [showLogs, setShowLogs] = useState(false)

  return (
    <div className="relative bg-white mt-6 rounded-xl p-6 shadow-xl">
      <div className="flex flex-row items-center justify-between">
        <div className="mr-4 flex flex-col items-center">
            <div style={{ fontSize: 12, marginBottom: 5 }}>Address</div>
            <div>{quote.delivery_address}</div>
        </div>
        <div className="mr-4 flex flex-col items-center">
            <div style={{ fontSize: 12, marginBottom: 5 }}>Order Date</div>
            <div>{quote.date_requested}</div>
        </div>
        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontSize: 12, marginBottom: 5 }}>Delivered</div>
          <div>{quote.date_delivered}</div>
        </div>
        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontSize: 12, marginBottom: 5 }}>Gallons</div>
          <div>{quote.gallons}</div>
        </div>
        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontSize: 12, marginBottom: 5 }}>Rate</div>
          <div>{`$${quote.rate}\gal`}</div>
        </div>
        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontSize: 12, marginBottom: 5 }}>Total Cost</div>
          <div>{`$${quote.total_price}`}</div>
        </div>
      </div>
      <button
        onClick={() => setShowLogs(!showLogs)}
        className="flex mx-auto mt-6 text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-secondary rounded text-lg"
      >
        {showLogs ? 'Hide Logs' : 'View Logs'}
      </button>
      {/* {showLogs && (
        <code className="block whitespace-normal bg-gray-900 rounded-md p-6 mt-6 text-white">
          {quote.logs.map((line) => (
            <p className="py-2">{line}</p>
          ))}
        </code>
      )} */}
    </div>
  )
}

export default TableV2
