import React from 'react'
import styled from './Loading.module.css'
import { ReactComponent as Spinner } from "../../Assets/spinner.svg";

export const Loading = () => {
  return (
    <div className={styled.loading}><Spinner/></div>
  )
}
