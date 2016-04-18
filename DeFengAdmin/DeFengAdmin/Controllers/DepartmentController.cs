using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using DeFeng.BLL;
using DeFeng.Model.Global;
using DeFeng.Model;

namespace DeFengAdmin.Controllers
{
    public class DepartmentController : Controller
    {
        // GET: Group
        public ActionResult Index()
        {
            return View();
        }
        public string LoadGroup()
        {
            var result = "";
            try
            {
                Department_BLL bll = new Department_BLL();
                var departmentList = bll.LoadDepartment();
                result = JsonConvert.SerializeObject(departmentList);
            }
            catch (Exception ex)
            {
                Log log = new Log();
                log.Msg = ex.StackTrace;
                log.Type = LogType.Error;
                GlobalQueue.LogGlobalQueue.Enqueue(log);
            }
            return result;
        }

        public string AddGroup()
        {
            try
            {
            }
            catch (Exception ex)
            {
                Log log = new Log();
                log.Msg = ex.StackTrace;
                log.Type = LogType.Error;
                GlobalQueue.LogGlobalQueue.Enqueue(log);
            }
            return "";
        }
    }
}