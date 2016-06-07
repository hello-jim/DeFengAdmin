using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DeFengAdmin.Controllers
{
    public class ProcessCenterController : Controller
    {
        // GET: ProcessCenter
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult WritingPaper()
        {
            return View();
        }
        public ActionResult PostManagement()
        {
            return View();
        }
    }
}