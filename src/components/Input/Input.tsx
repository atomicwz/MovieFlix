import React from "react";
import './Input.module.css'

interface IInput{
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
export const Input = (props:IInput) => {
  return <input placeholder="Pesquise por filmes" type="search" onChange={props.onChange}/>;
};
    