using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.BLL;
using DeFeng.Model;
using DeFeng.Model.Global;
namespace DeFengAdmin.Controllers
{
    public class OrganizationController : Controller
    {
        // GET: Organization
        public ActionResult Index()
        {
            return View();
        }

        public List<Department> LoadDepartment()
        {
            List<Department> departmentList = new List<Department>();
            Department_BLL bll = new Department_BLL();
            try
            {
                departmentList = bll.LoadDepartment();
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
                Log log = new Log();
                log.Msg = ex.StackTrace;
                log.Type = LogType.Error;
                GlobalQueue.LogGlobalQueue.Enqueue(log);
            }
            return departmentList;
        }

        public bool AddDepartment()
        {
            var result = false;
            Department_BLL bll = new Department_BLL();
            try
            {
                result = bll.AddDepartment(null);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
                Log log = new Log();
                log.Msg = ex.StackTrace;
                log.Type = LogType.Error;
                GlobalQueue.LogGlobalQueue.Enqueue(log);
            }
            return result;
        }

        public bool UpdateDepartment()
        {
            var result = false;
            Department_BLL bll = new Department_BLL();
            try
            {
                result = bll.UpdateDepartment(null);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }

        public bool DeleteDepartment()
        {
            var result = false;
            Department_BLL bll = new Department_BLL();
            try
            {
                var id = Request["ID"] != null ? Convert.ToInt32(Request["ID"]) : 0;
                result = bll.DeleteDepartment(id);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }

        public List<Post> GetPost()
        {
            var list = new List<Post>();
            Post_BLL bll = new Post_BLL();
            try
            {
                var departmentID = Request["departmentID"] != null ? Convert.ToInt32(Request["departmentID"]) : 0;
                list = bll.GetPost(departmentID);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return list;
        }

        public bool AddPost()
        {
            Post_BLL bll = new Post_BLL();
            var result = false;
            try
            {
                result = bll.AddPost(null);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }

        public bool UpdatePost()
        {
            var result = false;
            Post_BLL bll = new Post_BLL();
            try
            {
                result = bll.UpdatePost(null);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }

        public bool DeletePost()
        {
            var result = false;
            Post_BLL bll = new Post_BLL();
            try
            {
                var id = Request["ID"] != null ? Convert.ToInt32(Request["ID"]) : 0;
                result = bll.DeletePost(id);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }
    }
}