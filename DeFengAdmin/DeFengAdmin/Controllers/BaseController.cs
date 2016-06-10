using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.Model;

namespace DeFengAdmin.Controllers
{
    public class BaseController : Controller
    {
        public Staff sessionStaff;
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (Session["staffInfo"] == null)
            {
                Response.Redirect("/Staff/Login");
            }
            else
            {
                sessionStaff = (Staff)Session["staffInfo"];
            }
        }
    }
}