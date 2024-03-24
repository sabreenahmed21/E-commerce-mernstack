import { Typography } from '@mui/material'
import React from 'react'

export default function Review({review}) {
  return (
    <Typography>{review.comment}</Typography>
  )
}
