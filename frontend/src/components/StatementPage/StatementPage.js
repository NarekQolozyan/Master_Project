import React from 'react'
import { useSelector } from 'react-redux'


export default function StatementPage() {
    const selector = useSelector((state) => state.statement)
  return (
    <div>{selector.company}</div>
  )
}
