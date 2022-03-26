import React from "react";
import styled from './ButtonPagination.module.css'

export interface IButtonPagination{
  previous: React.MouseEventHandler<HTMLButtonElement>
  next: React.MouseEventHandler<HTMLButtonElement>
  page: number
}

export const ButtonPagination = (props: IButtonPagination) => {

  return (
    <div className={styled.buttonDiv}>
      <button onClick={props.previous} >{'<'}</button>
      <button className="page">{props.page}</button>
      <button onClick={props.next} >{'>'}</button>
    </div>
  );
};
