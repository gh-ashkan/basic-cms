import React from "react";
import "./sidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import {Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-link">
        <li>
          <Link to="/Products">
            <AiOutlineHome className="icon" />
            صفحه اصلی
          </Link>
        </li>
        <li className="active">
          <Link to="/Products">
            <MdOutlineProductionQuantityLimits className="icon" />
            محصولات
          </Link>
        </li>
        <li>
          <Link to="Comments">
            <BiCommentDetail className="icon" />
            کامنت ها
          </Link>
        </li>
        <li>
          <Link to="Users">
            <LuUsers className="icon" />
            کاربران
          </Link>
        </li>
        <li>
          <Link to="/Orders">
            <IoBagCheckOutline className="icon" />
            سفارشات
          </Link>
        </li>
        <li>
          <Link to="Offs">
            <BsCurrencyDollar className="icon" />
            تخفیفات
          </Link>
        </li>
      </ul>
    </div>
  );
}
