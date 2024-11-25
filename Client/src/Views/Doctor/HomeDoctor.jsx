import React from 'react'
import {DoctorDashboard} from "../../Components/HomeDoctorComponents/HomeDoctor.jsx"
import { NavBarDoctor } from '../../Components/HomeDoctorComponents/NavBarDoctor'
export const HomeDoctor = () => {
  return (
    <>
        <NavBarDoctor/>
        <DoctorDashboard/>
    </>
  )
}
