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
    public class OrganizationController : BaseController
    {
        PermissionType_BLL permissionTypeBll = new PermissionType_BLL();
        StaffPermission_BLL staffPermissionBll = new StaffPermission_BLL();

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

        public string GetPostByDepartment()
        {
            var json = "";
            Post_BLL bll = new Post_BLL();
            try
            {
                var departmentID = Request["depID"] != null ? Convert.ToInt32(Request["depID"]) : 0;
                var pageIndex = Request["pageIndex"] != null ? Convert.ToInt32(Request["pageIndex"]) : 1;
                var list = bll.GetPostByDepartment(departmentID, pageIndex);
                json = JsonConvert.SerializeObject(list);
                bll = null;
            }
            catch (Exception ex)
            {
                bll = null;
            }
            return json;
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

        public bool UpdateStaff()
        {
            var result = false;
            Staff_BLL bll = new Staff_BLL();
            try
            {
                var staff = JsonConvert.DeserializeObject<Staff>(Request["staff"]);
                result = bll.UpdateStaff(staff);
            }
            catch (Exception ex)
            {

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
                var depID = Request["depID"] != null ? Convert.ToInt32(Request["depID"]) : 0;
                var pageIndex = Request["pageIndex"] != null ? Convert.ToInt32(Request["pageIndex"]) : 1;
                list = bll.GetStaffByDepartment(depID, pageIndex);
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
                var pageIndex = Request["pageIndex"] != null ? Convert.ToInt32(Request["pageIndex"]) : 1;
                var list = bll.GetStaff(pageIndex);
                json = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return json;
        }

        public string GetStaffByID()
        {
            var json = "";
            try
            {
                Staff_BLL bll = new Staff_BLL();
                var staffID = Convert.ToInt32(Request["staffID"]);
                var obj = bll.GetStaffByID(staffID);
                json = JsonConvert.SerializeObject(obj);
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

        public string GetPermission()
        {
            var json = "";
            try
            {
                Permission_BLL bll = new Permission_BLL();
                var list = bll.GetPermission();
                json = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return json;
        }

        public string GetPermissionType()
        {
            var json = "";
            try
            {
                var list = permissionTypeBll.GetPermissionType();
                json = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex) { }
            return json;
        }

        public bool AddStaffPermission()
        {
            var result = false;
            try
            {

                var staffID = Convert.ToInt32(Request["staffID"]);
                var permissionIDList = Convert.ToString(Request.Form[1]).Split(',').ToList().ConvertAll<int>(x => Convert.ToInt32(x));
                var staff = (Staff)Session["staffInfo"];
                result = staffPermissionBll.AddStaffPermission(staffID, staff.ID, permissionIDList);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string GetPermissionByStaff()
        {
            var json = "";
            try
            {
                var staffID = Convert.ToInt32(Request["staffID"]);
                var list = staffPermissionBll.GetPermissionByStaff(staffID);
                json = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return json;
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