using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.Model.Global;
using DeFeng.Model;
using DeFeng.BLL;
using Newtonsoft.Json;

namespace DeFengAdmin.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public string Search()
        {
            var result = "";
            try
            {
                var list = new List<Customer>();
                var customer = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<Customer>(HttpContext.Request.Form["customer"]) : null;
                Customer_BLL bll = new Customer_BLL();
                list = bll.Search(customer);
                result = JsonConvert.SerializeObject(list);
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

        public int AddCustomer()
        {
            var result = 0;
            try
            {
                var customer = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<Customer>(HttpContext.Request.Form["customer"]) : null;
                Customer_BLL bll = new Customer_BLL();
                result = bll.AddCutomer(customer);
            }
            catch (Exception ex)
            {
                result = -1;
            }
            return result;
        }

        public int UpdateCustomer()
        {
            var result = 0;
            try
            {
                var customer = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<Customer>(HttpContext.Request.Form["customer"]) : null;
                Customer_BLL bll = new Customer_BLL();
                result = bll.UpdateCustomer(customer);
            }
            catch (Exception ex)
            {
                result = -1;
            }
            return result;
        }

        /// <summary>
        ///客配房 
        /// </summary>
        public void CustomerMatchHouse()
        {
            var house = HttpContext.Request.Form.Count != 0 ? HttpContext.Request.Form["house"] : "";
            Response.Redirect("/House/Index?house=" + house);
        }
    }
}