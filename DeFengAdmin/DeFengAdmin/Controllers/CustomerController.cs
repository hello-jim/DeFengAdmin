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
            var house = HttpContext.Request.Form.Count == 0 ? "" : HttpContext.Request.Form["house"];
            var customer = "";
            ViewBag.Customer = customer;
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

        public bool DeleteCustomer()
        {
            var result = false;
            try
            {
                var idStrArr = Request.Form[0].Split(',');
                List<int> idArr = new List<int>();
                for (int i = 0; i < idStrArr.Count(); i++)
                {
                    idArr.Add(Convert.ToInt32(idStrArr[i]));
                }
                Customer_BLL bll = new Customer_BLL();
                result = bll.DeleteCustomer(idArr);
            }
            catch (Exception ex)
            {
                result = true;
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

        public string LoadCustomerFollowRecord()
        {
            var result = "";
            try
            {
                var customerID = Convert.ToInt32(Request["id"]);
                CustomerFollowRecord_BLL bll = new CustomerFollowRecord_BLL();
                var list = bll.LoadHouseFollowRecord(customerID);
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public bool AddCustomerFollowRecord()
        {
            var result = false;
            try
            {
                var record = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<CustomerFollowRecord>(HttpContext.Request.Form["record"]) : null;
                CustomerFollowRecord_BLL bll = new CustomerFollowRecord_BLL();
                result = bll.AddCustomerFollowRecord(record);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public bool DeleteCustomerFollowRecord()
        {
            var result = false;
            try
            {
                var recordID = Convert.ToInt32(Request["recordID"]);
                CustomerFollowRecord_BLL bll = new CustomerFollowRecord_BLL();
                result = bll.DeleteCustomerFollowRecord(recordID);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public bool UpdateCustomerFollowRecord()
        {
            var result = false;
            try
            {
                var record = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<CustomerFollowRecord>(HttpContext.Request.Form["house"]) : null;
                CustomerFollowRecord_BLL bll = new CustomerFollowRecord_BLL();
                result = bll.UpdateCustomerFollowRecord(record);
            }
            catch (Exception ex)
            {

            }
            return result;
        }
    }
}