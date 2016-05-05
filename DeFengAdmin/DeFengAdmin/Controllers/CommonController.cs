using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using DeFeng.Model;
using DeFeng.BLL;
using DeFeng.Common;

namespace DeFengAdmin.Controllers
{
    public class CommonController : Controller
    {
        // GET: Base
        public ActionResult Index()
        {
            return View();
        }

        public string LoadProvince()
        {
            var result = "";
            try
            {
                Province_BLL bll = new Province_BLL();
                var list = bll.LoadProvince();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string LoadCity()
        {
            var result = "";
            try
            {
                City_BLL bll = new City_BLL();
                var proID = Convert.ToInt32(Request["proID"]);
                var list = bll.LoadCity(proID);
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string LoadDistrict()
        {
            var result = "";
            try
            {
                District_BLL bll = new District_BLL();
                var cityID = Convert.ToInt32(Request["cityID"]);
                var list = bll.LoadDistrict(cityID);
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string LoadArea()
        {
            var result = "";
            try
            {
                Area_BLL bll = new Area_BLL();
                var disID = Convert.ToInt32(Request["disID"]);
                var list = bll.LoadArea(disID);
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadResidentialDistrict()
        {
            var result = "";
            try
            {
                ResidentialDistrict_BLL bll = new ResidentialDistrict_BLL();
                var list = bll.LoadResidentialDistrict();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadTransactionType()
        {
            var result = "";
            try
            {
                TransactionType_BLL bll = new TransactionType_BLL();
                var list = bll.LoadTransactionType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHouseUseType()
        {
            var result = "";
            try
            {
                HouseUseType_BLL bll = new HouseUseType_BLL();
                var list = bll.LoadHouseUseType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadOrientation()
        {
            var result = "";
            try
            {
                Orientation_BLL bll = new Orientation_BLL();
                var list = bll.LoadOrientation();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHouseType()
        {
            var result = "";
            try
            {
                HouseType_BLL bll = new HouseType_BLL();
                var list = bll.LoadHouseType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHousingLetter()
        {
            var result = "";
            try
            {
                HousingLetter_BLL bll = new HousingLetter_BLL();
                var list = bll.LoadHousingLetter();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHouseQuality()
        {
            var result = "";
            try
            {
                HouseQuality_BLL bll = new HouseQuality_BLL();
                var list = bll.LoadHouseQuality();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHouseStatus()
        {
            var result = "";
            try
            {
                HouseStatus_BLL bll = new HouseStatus_BLL();
                var list = bll.LoadHouseStatus();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadTaxPayType()
        {
            var result = "";
            try
            {
                TaxPayType_BLL bll = new TaxPayType_BLL();
                var list = bll.LoadTaxPayType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadEntrustType()
        {
            var result = "";
            try
            {
                EntrustType_BLL bll = new EntrustType_BLL();
                var list = bll.LoadEntrustType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadSource()
        {
            var result = "";
            try
            {
                Source_BLL bll = new Source_BLL();
                var typeID = Request["sourceType"] != "" ? Convert.ToInt32(Request["sourceType"]) : 0;
                var list = bll.LoadSource(typeID);
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCurrent()
        {
            var result = "";
            try
            {
                Current_BLL bll = new Current_BLL();
                var list = bll.LoadCurrent();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadPropertyOwn()
        {
            var result = "";
            try
            {
                PropertyOwn_BLL bll = new PropertyOwn_BLL();
                var list = bll.LoadPropertyOwn();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadDecorationType()
        {
            var result = "";
            try
            {
                DecorationType_BLL bll = new DecorationType_BLL();
                var list = bll.LoadDecorationType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHouseDocumentType()
        {
            var result = "";
            try
            {
                HouseDocumentType_BLL bll = new HouseDocumentType_BLL();
                var list = bll.LoadHouseDocumentType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadSupporting()
        {
            var result = "";
            try
            {
                Supporting_BLL bll = new Supporting_BLL();
                var list = bll.LoadSupporting();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCommissionPayType()
        {
            var result = "";
            try
            {
                CommissionPayType_BLL bll = new CommissionPayType_BLL();
                var list = bll.LoadCommissionPayType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadHousePayType()
        {
            var result = "";
            try
            {
                HousePayType_BLL bll = new HousePayType_BLL();
                var list = bll.LoadHousePayType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadFurniture()
        {
            var result = "";
            try
            {
                Furniture_BLL bll = new Furniture_BLL();
                var list = bll.LoadFurniture();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadAppliance()
        {
            var result = "";
            try
            {
                Appliance_BLL bll = new Appliance_BLL();
                var list = bll.LoadAppliance();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadLookHouseType()
        {
            var result = "";
            try
            {
                LookHouseType_BLL bll = new LookHouseType_BLL();
                var list = bll.LoadLookHouseType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string GetSysConf()
        {
            var result = "";
            try
            {
                var key = Request["key"];
                result = CommonClass.GetSysConfig(key);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string LoadHouseTableColChecked()
        {
            var result = "";
            try
            {
                HouseTableColChecked_BLL bll = new HouseTableColChecked_BLL();
                var list = bll.LoadHouseTableColChecked();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public int ChangeHouseTableColStatus()
        {

            var result = 0;
            try
            {
                var id = Convert.ToInt32(Request["ID"]);
                var status = Convert.ToBoolean(Request["status"]);
                var obj = new HouseTableColChecked();
                obj.ID = id;
                obj.CheckedStatus = status;
                HouseTableColChecked_BLL bll = new HouseTableColChecked_BLL();
                result = bll.ChangeHouseTableColStatus(obj);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string LoadCustomerTableColChecked()
        {
            var result = "";
            try
            {
                CustomerTableColChecked_BLL bll = new CustomerTableColChecked_BLL();
                var list = bll.LoadCustomerTableColChecked();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public int ChangeCustomerTableColStatus()
        {

            var result = 0;
            try
            {
                var id = Convert.ToInt32(Request["ID"]);
                var status = Convert.ToBoolean(Request["status"]);
                var obj = new CustomerTableColChecked();
                obj.ID = id;
                obj.CheckedStatus = status;
                CustomerTableColChecked_BLL bll = new CustomerTableColChecked_BLL();
                result = bll.ChangeCustomerTableColStatus(obj);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string LoadFollowType()
        {
            var result = "";
            try
            {
                FollowType_BLL bll = new FollowType_BLL();
                var list = bll.LoadFollowType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCustomerTransactionType()
        {
            var result = "";
            try
            {
                CustomerTransactionType_BLL bll = new CustomerTransactionType_BLL();
                var list = bll.LoadCustomerTransactionType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCustomerStatus()
        {
            var result = "";
            try
            {
                CustomerStatus_BLL bll = new CustomerStatus_BLL();
                var list = bll.LoadCustomerStatus();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCustomerType()
        {
            var result = "";
            try
            {
                CustomerType_BLL bll = new CustomerType_BLL();
                var list = bll.LoadCustomerType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadOfficeLevel()
        {
            var result = "";
            try
            {
                OfficeLevel_BLL bll = new OfficeLevel_BLL();
                var list = bll.LoadOfficeLevel();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadLandType()
        {
            var result = "";
            try
            {
                LandType_BLL bll = new LandType_BLL();
                var list = bll.LoadLandType();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCarPark()
        {
            var result = "";
            try
            {
                CarPark_BLL bll = new CarPark_BLL();
                var list = bll.LoadCarPark();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadGrade()
        {
            var result = "";
            try
            {
                Grade_BLL bll = new Grade_BLL();
                var list = bll.LoadGrade();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadIntention()
        {
            var result = "";
            try
            {
                Intention_BLL bll = new Intention_BLL();
                var list = bll.LoadIntention();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadCountry()
        {
            var result = "";
            try
            {
                Country_BLL bll = new Country_BLL();
                var list = bll.LoadCountry();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadWall()
        {
            var result = "";
            try
            {
                Wall_BLL bll = new Wall_BLL();
                var list = bll.LoadWall();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadLandPlan()
        {
            var result = "";
            try
            {
                LandPlan_BLL bll = new LandPlan_BLL();
                var list = bll.LoadLandPlan();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadShopArea()
        {
            var result = "";
            try
            {
                ShopArea_BLL bll = new ShopArea_BLL();
                var list = bll.LoadShopArea();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public string LoadShopLocation()
        {
            var result = "";
            try
            {
                ShopLocation_BLL bll = new ShopLocation_BLL();
                var list = bll.LoadShopLocation();
                result = JsonConvert.SerializeObject(list);
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        
    }
}