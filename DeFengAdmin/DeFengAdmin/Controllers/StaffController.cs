using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.Model;
using DeFeng.Common;
using DeFeng.BLL;

namespace DeFengAdmin.Controllers
{
    public class StaffController : Controller
    {
        // GET: Staff
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
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

            return View();
        }

        //注册 
        public int StaffRegister()
        {
            var request = Request;
            var account = request["account"] != null ? Convert.ToString(request["account"]) : "";
            var password = request["passWord"] != null ? Convert.ToString(request["passWord"]) : "";
            var idCard = request["idCard"] != null ? Convert.ToString(request["idCard"]) : "";
            var phone = request["phone"] != null ? Convert.ToString(request["phone"]) : "";
            var ciphertext = MD5Encryption.Encryption(password);//密文
            Staff staff = new Staff()
            {
                Account = account,
                Password = ciphertext,
                IdCard = idCard,
                Phone = phone
            };
            Staff_BLL bll = new Staff_BLL();
            var status = bll.Register(staff);

            return status;
        }
        //验证用户名是否已注册
        public int CheckUserName()
        {
            var request = Request;
            var account = request["account"] != null ? Convert.ToString(request["account"]) : "";
            Staff staff = new Staff()
            {
                Account = account,
            };
            Staff_BLL bll = new Staff_BLL();
            bll.CheckUserName(account);
            if ((bll.CheckUserName(account) > 0))
            {
                //已存在用户名
                return 1;
            }
            else
            {
                return 2;
            }
        }

        //登录
        public int UserLogin()
        {
            var status = 0;//状态 -1该账号不存在 -2账号或密码错误 1:登录成功
            var request = Request;
            var account = request["account"] != null ? Convert.ToString(request["account"]) : "";
            var password = request["password"] != null ? Convert.ToString(request["password"]) : "";
            var ciphertext = MD5Encryption.Encryption(password);
            Staff staff = new Staff()
            {
                Account = account,
                Password = ciphertext,
            };
            Staff_BLL bll = new Staff_BLL();

            if (bll.CheckUserName(account) > 0)
            {
                var obj = bll.UserLogin(staff);
                if (obj != null)
                {
                    Permission_BLL permissionBll = new Permission_BLL();
                    obj.Permission = permissionBll.GetPermissionByStaff(obj.ID);
                    Session["staffInfo"] = obj;
                    status = 1;
                }
                else
                {
                    status = -2;
                }
            }
            else
            {
                status = -1;
            }
            return status;
        }
    }
}