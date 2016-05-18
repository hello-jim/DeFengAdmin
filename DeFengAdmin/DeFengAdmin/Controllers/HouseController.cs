using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Text;
using DeFeng.Model;
using DeFeng.BLL;
using DeFeng.Model.Global;
using DeFeng.Common;

namespace DeFengAdmin.Controllers
{
    public class HouseController : Controller
    {


        House_BLL bll = new House_BLL();
        // GET: House
        public ActionResult Index()
        {
            var house = HttpContext.Request.Form.Count == 0 ? "" : HttpContext.Request.Form["house"];
            ViewBag.House = house;
            return View();
        }

        public string Search()
        {
            var result = "";
            try
            {
                var house = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<House>(HttpContext.Request.Form["house"]) : null;
                if (house != null)
                {
                    var list = bll.Search(house);
                    if (list.Count > 0)
                    {
                        list[0].PageIndex = house.PageIndex;
                    }
                    result = JsonConvert.SerializeObject(list);
                }
                else
                {
                    result = "-1";
                }
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

        public string AddHouse()
        {
            var result = "";
            try
            {
                var house = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<House>(HttpContext.Request.Form["house"]) : null;
                result = bll.AddHouse(house) == true ? "1" : "0";
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string UpdateHouse()
        {
            var result = "";
            try
            {
                var house = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<House>(HttpContext.Request.Form["house"]) : null;
                result = bll.UpdateHouse(house) == true ? "1" : "0";
            }
            catch (Exception ex) { }
            return result;
        }

        public bool DeleteHouse()
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
                House_BLL bll = new House_BLL();
                result = bll.DeleteHouse(idArr);
            }
            catch (Exception ex)
            {
                result = true;
            }
            return result;
        }

        public int AddImg()
        {
            var status = 0;
            try
            {
                var request = Request;
                Image_BLL bll = new Image_BLL();
                var houseID = Convert.ToInt32(Request.Form["houseID"]);

                var savePath = CommonClass.GetSysConfig("houseImgSave");
                for (int i = 0; i < request.Files.Count; i++)
                {
                    Image img = new Image();
                    img.HouseID = houseID;
                    img.FileName = request.Files[i].FileName;
                    var imgID = bll.AddImage(img);
                    var id = "imgID_" + imgID + "_";
                    var path = Server.MapPath(string.Format("{0}\\{1}{2}", savePath, id, request.Files[i].FileName));
                    request.Files[i].SaveAs(path);
                }
                status = 1;
            }
            catch (Exception ex)
            {

            }
            return status;
        }

        public string LoadHouseImages()
        {
            var imagesJson = "";
            try
            {
                Image_BLL bll = new Image_BLL();
                var houseID = Convert.ToInt32(Request["houseID"]);
                var images = bll.LoadHouseImages(houseID);
                imagesJson = JsonConvert.SerializeObject(images);
            }
            catch (Exception ex)
            {

            }
            return imagesJson;
        }

        public bool DeleteHouseImage()
        {
            var result = false;
            try
            {
                var imgID = Convert.ToInt32(Request["imgID"]);
                Image_BLL bll = new Image_BLL();
                result = bll.DeleteHouseImage(imgID);
            }
            catch (Exception ex)
            {

            }
            return result;

        }

        public string LoadHouseFollowRecord()
        {
            var result = "";
            try
            {
                var houseID = Convert.ToInt32(Request["id"]);
                HouseFollowRecord_BLL bll = new HouseFollowRecord_BLL();
                var list = bll.LoadHouseFollowRecord(houseID);
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public bool AddHouseFollowRecord()
        {
            var result = false;
            try
            {
                var record = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<HouseFollowRecord>(HttpContext.Request.Form["record"]) : null;
                HouseFollowRecord_BLL bll = new HouseFollowRecord_BLL();
                result = bll.AddHouseFollowRecord(record);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public bool DeleteHouseFollowRecord()
        {
            var result = false;
            try
            {
                var recordID = Convert.ToInt32(Request["recordID"]);
                HouseFollowRecord_BLL bll = new HouseFollowRecord_BLL();
                result = bll.DeleteHouseFollowRecord(recordID);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public bool UpdateHouseFollowRecord()
        {
            var result = false;
            try
            {
                var record = HttpContext.Request.Form != null ? JsonConvert.DeserializeObject<HouseFollowRecord>(HttpContext.Request.Form["house"]) : null;
                HouseFollowRecord_BLL bll = new HouseFollowRecord_BLL();
                result = bll.UpdateHouseFollowRecord(record);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string SameOwnerHouse()
        {
            House_BLL bll = new House_BLL();
            var house = HttpContext.Request.Form.Count != 0 ? JsonConvert.DeserializeObject<House>(HttpContext.Request.Form["house"]) : null;
            var list = bll.SameOwnerHouse(house);
            return JsonConvert.SerializeObject(list);
        }

    }
}