import React, { ReactNode } from 'react'

interface Props {
  name: string;
  bio: string;
  children: ReactNode;
}

export const Button = ({ name, bio, children }: Props) => {
  return (
    <>
      <h1>{name}</h1>
      <p>{bio}</p>
      <div className="btn btn-success">{children}</div>
    </>
  )
}

export default Button;