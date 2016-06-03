using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.BLL;
using DeFeng.Model;
using DeFeng.Model.Global;
using Newtonsoft.Json;
namespace DeFengAdmin.Controllers
{
    public class OrganizationController : Controller
    {
        // GET: Organization
        public ActionResult Index()
        {
            return View();
        }

        public string LoadDepartment()
        {
            var json = "";
            Department_BLL bll = new Department_BLL();
            try
            {
                List<Department> departmentList = new List<Department>();
                departmentList = bll.LoadDepartment();
                json = JsonConvert.SerializeObject(departmentList);
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
            return json;
        }

        public bool AddDepartment()
        {
            var result = false;
            Department_BLL bll = new Department_BLL();
            try
            {
                var staff = Session["staff"] != null ? (Staff)Session["staff"] : null;
                //if (staff != null)
                //{
                var department = Request["department"] != null ? JsonConvert.DeserializeObject<Department>(Request["department"]) : null;
                //department.LastUpdateStaff = new Staff
                //{
                //    ID = staff.ID
                //};
                //department.CreateStaff = new Staff
                //{
                //    ID = staff.ID
                //};
                if (department != null)
                {
                    result = bll.AddDepartment(department);
                }
                //  }              
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
                var staff = Session["staff"] != null ? (Staff)Session["staff"] : null;
                //if (staff != null)
                //{
                var department = Request["department"] != null ? JsonConvert.DeserializeObject<Department>(Request["department"]) : null;
                //department.LastUpdateStaff = new Staff
                //{
                //    ID = staff.ID
                //};
                //department.CreateStaff = new Staff
                //{
                //    ID = staff.ID
                //};
                if (department != null)
                {
                    result = bll.UpdateDepartment(department);
                }
                //  }              
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
                var idStrArr = Request.Form.Count != 0 ? Request.Form[0].Split(',') : null;
                if (idStrArr != null)
                {
                    List<int> idArr = new List<int>();
                    for (int i = 0; i < idStrArr.Count(); i++)
                    {
                        idArr.Add(Convert.ToInt32(idStrArr[i]));
                    }
                    result = bll.DeleteDepartment(idArr);
                    bll = null;
                }
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }

        public List<Post> GetPostByDepartment()
        {
            var list = new List<Post>();
            Post_BLL bll = new Post_BLL();
            try
            {
                var departmentID = Request["departmentID"] != null ? Convert.ToInt32(Request["departmentID"]) : 0;
                list = bll.GetPostByDepartment(departmentID);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return list;
        }

        public string GetPost()
        {
            var result = "";
            Post_BLL bll = new Post_BLL();
            try
            {
                var list = bll.GetPost();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            { }
            return result;
        }

        public bool AddPost()
        {
            Post_BLL bll = new Post_BLL();
            var result = false;
            try
            {
                var post = Request["post"] != null ? JsonConvert.DeserializeObject<Post>(Request["post"]) : null;
                result = bll.AddPost(post);
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
                var idStrArr = Request.Form.Count != 0 ? Request.Form[0].Split(',') : null;
                if (idStrArr != null)
                {
                    List<int> idArr = new List<int>();
                    for (int i = 0; i < idStrArr.Count(); i++)
                    {
                        idArr.Add(Convert.ToInt32(idStrArr[i]));
                    }
                    result = bll.DeletePost(idArr);
                    bll = null;
                }
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return result;
        }

        public string GetStaffByDepartment()
        {
            var list = new List<Staff>();
            var json = "";
            Staff_BLL bll = new Staff_BLL();
            try
            {
                var departmentID = Request["departmentID"] != null ? Convert.ToInt32(Request["departmentID"]) : 0;
                list = bll.GetStaffByDepartment(departmentID);
                json = JsonConvert.SerializeObject(list);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;

            }
            return json;
        }

        public string GetStaff()
        {
            var json = "";
            try
            {
                Staff_BLL bll = new Staff_BLL();
                var list = bll.GetStaff();
                json = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return json;
        }

        public bool DeleteStaff()
        {
            var result = false;
            Staff_BLL bll = new Staff_BLL();
            try
            {
                var idStrArr = Request.Form.Count != 0 ? Request.Form[0].Split(',') : null;
                if (idStrArr != null)
                {
                    List<int> idArr = new List<int>();
                    for (int i = 0; i < idStrArr.Count(); i++)
                    {
                        idArr.Add(Convert.ToInt32(idStrArr[i]));
                    }
                    result = bll.DeleteStaff(idArr);
                    bll = null;
                }
            }
            catch (Exception ex)
            {
                
            }
            return result;
        }

        public ActionResult DepTreeview()
        {
            return View("DepTreeview");
        }

        public ActionResult DepTreeview2()
        {
            return View("DepTreeview2");
        }

        public ActionResult TestView()
        {
            return View("TestView");
        }

    }
}