using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.Model;
using DeFeng.BLL;

namespace DeFengAdmin.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

       public ActionResult Register()
        {
            var request = Request;
            var name = request["name"] != null ? Convert.ToString(request["name"]) : "";
            var password = request["passWord"] != null ? Convert.ToString(request["passWord"]) : "";
            var idCard = request["idCard"] != null ? Convert.ToString(request["idCard"]) : "";
            var phone = request["phone"] != null ? Convert.ToString(request["phone"]) : "";
            Staff staff = new Staff()
            {
                Name = name,
                Password = password,
                IdCard = idCard,
                Phone = phone        
            };
            Staff_BLL bll = new Staff_BLL();
            bll.Register(staff);
  
            return View();
        }

        public ActionResult Information()
        {
            return View();
        }

    }
}