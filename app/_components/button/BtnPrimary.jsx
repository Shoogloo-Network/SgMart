import Link from 'next/link'
import React from 'react'

const BtnPrimary = ({btnText,link}) => {
  return (
    <div>
     <Link href={link}><div>{btnText}</div></Link> 
    </div>
  )
}

export default BtnPrimary
