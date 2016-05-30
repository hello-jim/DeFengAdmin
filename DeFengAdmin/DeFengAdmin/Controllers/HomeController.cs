using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeFeng.Model;
using DeFeng.BLL;
using System.Data.SqlClient;
using DeFeng.Common;

namespace DeFengAdmin.Controllers
{
    public class HomeController : Controller
    {

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
        public ActionResult Information()
        {
            return View();
        }
        public ActionResult index()
        {
            return View();
        }
        public ActionResult Office()
        {
            return View();
        }
        public ActionResult Institutions() {
            return View();
        }
        public ActionResult ProcessCenter() {
            return View();
        }

        //注册 
        public int StaffRegister()
        {
            var request = Request;
            var account = request["account"] != null ? Convert.ToString(request["account"]) : "";
            var password1 = request["passWord"] != null ? Convert.ToString(request["passWord"]) : "";
            var idCard = request["idCard"] != null ? Convert.ToString(request["idCard"]) : "";
            var phone = request["phone"] != null ? Convert.ToString(request["phone"]) : "";
            string password;
            password = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(password1, "MD5");
            Staff staff = new Staff()
            {
                Account = account,
                Password = password,
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
            var request = Request;
            var account = request["account"] != null ? Convert.ToString(request["account"]) : "";
            var password1 = request["password"] != null ? Convert.ToString(request["password"]) : "";
            string password;
            password = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(password1, "MD5");
            Staff staff = new Staff()
            {
                Account = account,
                Password = password,
            };
            Staff_BLL bll = new Staff_BLL();
            bll.UserLogin(staff);
            var result = bll.UserLogin(staff);
            if (result == 0)
            {
                return 0;
            }
            else
            {
                if (result == 1)
                {
                    return 1;
                }
                else
                {
                    //Session["@account"] = account;
                    //Session["@password"] = password;
                    Session["staff"] = staff;
                    return 2;
                }


            }
        }




        //个人信息
        public int StaffInformation()
        {
            var s = (Staff)Session["staff"];

            if (s != null)
            {
                var request = Request;
                var account = s.Account;
                var staffNumber = request["staffNumber"] != null ? Convert.ToString(request["staffNumber"]) : "";
                var staffName = request["staffName"] != null ? Convert.ToString(request["staffName"]) : "";
                var birthdayType = request["birthdayType"] != null ? Convert.ToString(request["birthdayType"]) : "";
                var idCard = request["idCard"] != null ? Convert.ToString(request["idCard"]) : "";
                var dateBirth = request["submitHouseDate"] != null ? Convert.ToDateTime(request["submitHouseDate"]) : new DateTime();
                var sex = request["sex"] != null ? Convert.ToInt32(request["sex"]) : 0;
                var age = request["age"] != null ? Convert.ToInt32(request["age"]) : 0;
                var birthday = request["birthday"] != null ? Convert.ToString(request["birthday"]) : "";
                var marital = request["marital"] != null ? Convert.ToString(request["marital"]) : "";
                var education = request["education"] != null ? Convert.ToString(request["education"]) : "";
                var major = request["major"] != null ? Convert.ToString(request["major"]) : "";
                var bloodType = request["bloodType"] != null ? Convert.ToString(request["bloodType"]) : "";
                var entry_time = request["entry_time"] != null ? Convert.ToDateTime(request["entry_time"]) : new DateTime();
                var entry_status = request["entry_status"] != null ? Convert.ToString(request["entry_status"]) : "";
                var probation = request["probation"] != null ? Convert.ToString(request["probation"]) : "";
                var height = request["height"] != null ? Convert.ToString(request["height"]) : "";
                var probation_salary = request["probation_salary"] != null ? Convert.ToDecimal(request["probation_salary"]) : 0;
                var salary = request["salary"] != null ? Convert.ToDecimal(request["salary"]) : 0;
                var politics = request["politics"] != null ? Convert.ToString(request["politics"]) : "";
                var title = request["title"] != null ? Convert.ToString(request["title"]) : "";
                var nation = request["nation"] != null ? Convert.ToString(request["nation"]) : "";
                var email = request["email"] != null ? Convert.ToString(request["email"]) : "";
                var tel = request["tel"] != null ? Convert.ToString(request["tel"]) : "";
                var officTel = request["officTel"] != null ? Convert.ToString(request["officTel"]) : "";
                var accountType = request["accountType"] != null ? Convert.ToString(request["accountType"]) : "";
                var accountAddress = request["accountAddress"] != null ? Convert.ToString(request["accountAddress"]) : "";
                var place_origin = request["place_origin"] != null ? Convert.ToString(request["place_origin"]) : "";
                var address = request["address"] != null ? Convert.ToString(request["address"]) : "";
                var application_method = request["application_method"] != null ? Convert.ToString(request["application_method"]) : "";
                var family_members = request["family_members"] != null ? Convert.ToString(request["family_members"]) : "";
                var family_relationship = request["family_relationship"] != null ? Convert.ToString(request["family_relationship"]) : "";
                var family_occupation = request["family_occupation"] != null ? Convert.ToString(request["family_occupation"]) : "";
                var landscape = request["landscape"] != null ? Convert.ToString(request["landscape"]) : "";
                var family_company = request["family_company"] != null ? Convert.ToString(request["family_company"]) : "";
                var family_contact = request["family_contact"] != null ? Convert.ToString(request["family_contact"]) : "";
                var entry_unit = request["entry_unit"] != null ? Convert.ToString(request["entry_unit"]) : "";
                var entry_department = request["entry_department"] != null ? Convert.ToString(request["entry_department"]) : "";
                var entry_position = request["entry_position"] != null ? Convert.ToString(request["entry_position"]) : "";
                var leader = request["leader"] != null ? Convert.ToString(request["leader"]) : "";
                var part_time_job = request["part_time_job"] != null ? Convert.ToString(request["part_time_job"]) : "";
                var part_time_position = request["part_time_position"] != null ? Convert.ToString(request["part_time_position"]) : "";
                var branch_manager = request["branch_manager"] != null ? Convert.ToString(request["branch_manager"]) : "";
                var site_manager = request["site_manager"] != null ? Convert.ToString(request["site_manager"]) : "";
                var hr_clerk = request["hr_clerk"] != null ? Convert.ToString(request["hr_clerk"]) : "";
                var hr_manager = request["hr_manager"] != null ? Convert.ToString(request["hr_manager"]) : "";
                var general_manager = request["general_manager"] != null ? Convert.ToString(request["general_manager"]) : "";
                var login_name = request["login_name"] != null ? Convert.ToString(request["login_name"]) : "";
                var access_authority = request["access_authority"] != null ? Convert.ToString(request["access_authority"]) : "";
                Staff staff = new Staff()
                {
                    Account = account,
                    StaffNumber = staffNumber,
                    StaffName = staffName,
                    BirthdayType = birthdayType,
                    IdCard = idCard,
                    DateBirth = dateBirth,
                    Sex = sex,
                    Age = age,
                    Birthday = birthday,
                    Marital = marital,
                    Education = education,
                    Major = major,
                    BloodType = bloodType,
                    Entry_time = entry_time,
                    Entry_status = entry_status,
                    Probation = probation,
                    Height = height,
                    Probation_salary = probation_salary,
                    Salary = salary,
                    Politics = politics,
                    Title = title,
                    Nation = nation,
                    Email = email,
                    Tel = tel,
                    OfficTel = officTel,
                    AccountType = accountType,
                    AccountAddress = accountAddress,
                    Place_origin = place_origin,
                    Address = address,
                    Application_method = application_method,
                    Family_members = family_members,
                    Family_relationship = family_relationship,
                    Family_occupation = family_occupation,
                    Landscape= landscape,
                    Family_company = family_company,
                    Family_contact = family_contact,
                    Entry_unit = entry_unit,
                    Department = new Department { },
                    Post = new Post { },
                    Leader = leader,
                    Part_time_job = part_time_job,
                    Part_time_position = part_time_position,
                    Branch_manager = branch_manager,
                    Site_manager = site_manager,
                    Hr_clerk = hr_clerk,
                    Hr_manager = hr_manager,
                    General_manager = general_manager,
                    Login_name = login_name,
                    Access_authority = access_authority

                };
                Staff_BLL bll = new Staff_BLL();
                var status=bll.Information(staff);
                if (status > 0)
                {
                    return 1;
                }
                else {
                    return 2;
                }
            }
            else {
                return 0;
            }
        }



    }
}