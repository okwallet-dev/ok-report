using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OneMFS.SharedResources;
using OneMFS.SharedResources.Utility;

namespace ClientReport.ReportApiServer.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[Produces("application/json")]
	[ApiController]
	public class DistributorPortal : ControllerBase
	{
		[HttpPost]
		[Route("GetAgentDsrListByPmphone")]
		public async Task<object> GetAgentDsrListByPmphone(ReportModel reportModel)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/DistributorPortal/GetAgentDsrListByPmphone", reportModel))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status400BadRequest, ex.ToString());
			}
		}
		[HttpGet]
		[Route("GetBalanceInformation")]
		public async Task<object> GetBalanceInformation(string mphone, string filterId)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.GetAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/DistributorPortal/GetBalanceInformation?mphone=" + mphone + "&filterId=" + filterId))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status400BadRequest, ex.ToString());
			}
		}
		[HttpGet]
		[Route("GetFilteringListForDdl")]
		public object GetFilteringListForDdl()
		{
			List<CustomDropDownModel> customDropDownModels = new List<CustomDropDownModel>
			{
				new CustomDropDownModel {label="All",value="All"},
				new CustomDropDownModel {label="Agent",value="A"},
				new CustomDropDownModel {label="DSR",value="R"}
			};
			return customDropDownModels;
		}


		[HttpGet]
		[Route("GetDistPortalInfo")]
		public async Task<object> GetDistPortalInfo(string mphone)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.GetAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/DistributorPortal/GetDistPortalInfo?mphone=" + mphone))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status400BadRequest, ex.ToString());
			}
		}
		[HttpPost]
		[Route("CustomerRegistration")]
		public async Task<object> CustomerRegistration(ReportModel reportModel)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/DistributorPortal/CustomerRegistration", reportModel))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status400BadRequest, ex.ToString());
			}
		}

	}
}
