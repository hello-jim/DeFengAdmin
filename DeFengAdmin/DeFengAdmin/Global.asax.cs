using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Threading;
using DeFeng.Model;
using DeFeng.Common;
using DeFeng.Model.Global;
using System.Configuration;
using log4net;
using log4net.Appender;
using System.Reflection;

namespace DeFengAdmin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var sysKeyList = CommonClass.LoadSysConfigKey(Server.MapPath("/App_Data/SysConfKey.xml"));
            if (!CommonClass.LoadSysConfig(sysKeyList))
            {
                //如果系统配置没有加载成功,则......
            }

            ThreadPool.QueueUserWorkItem(o =>
            {
                while (true)
                {
                    Log log = new Log();
                    if (GlobalQueue.LogGlobalQueue.TryDequeue(out log))
                    {
                        WriteLog(log);
                    }
                    else
                    {
                        Thread.Sleep(10);
                    }
                }
            });
        }

        protected void Session_Start()
        {
            //if (Session["staffInfo"] != null)
            //{
            //    return "";
            //}
            //else
            //{
            //    return "请登录";
            //}
            var testcode = "";
             
        }

        protected void Application_BeginRequest()
        {
            var testcode = "";
        }


        public void WriteLog(Log log)
        {
            try
            {
                var datePattern = "\\\\yyyy\\\\yyyyMM\\\\dd\\\\";
                var dateTimeStr = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
                var path = string.Format("{0}/{1}/", CommonClass.GetSysConfig("errorLogPath"), log.Type.ToString());
                var repository = LogManager.GetRepository();
                var appenders = repository.GetAppenders();
                var targetApder = appenders.First(p => p.Name == "RollingLogFileAppender") as RollingFileAppender;
                targetApder.File = path;
                targetApder.DatePattern = datePattern + string.Format("'error.txt'");
                targetApder.ActivateOptions();
                ILog ilog = log4net.LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                ilog.Error(log.Msg);
            }
            catch (Exception ex)
            {
                ILog ilog = log4net.LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
                ilog.Error(ex.Message);
            }
        }
    }
}
